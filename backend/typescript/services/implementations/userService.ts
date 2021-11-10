import * as firebaseAdmin from "firebase-admin";
import IUserService from "../interfaces/userService";
import { CreateUserDTO, Role, UpdateUserDTO, UserDTO } from "../../types";
import logger from "../../utilities/logger";
import User from "../../models/user.model";

const Logger = logger(__filename);

class UserService implements IUserService {
  /* eslint-disable class-methods-use-this */

  async getUserById(userId: string): Promise<UserDTO> {
    let user: User | null;
    let firebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      user = await User.findByPk(Number(userId));

      if (!user) {
        throw new Error(`userId ${userId} not found.`);
      }
      firebaseUser = await firebaseAdmin.auth().getUser(user.auth_id);
    } catch (error) {
      Logger.error(`Failed to get user. Reason = ${error.message}`);
      throw error;
    }

    return {
      authId: user.auth_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: firebaseUser.email ?? "",
      roleType: user.role_type,
      active: user.active,
    };
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    let user: User | null;
    let firebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      firebaseUser = await firebaseAdmin.auth().getUserByEmail(email);
      user = await User.findOne({
        where: { auth_id: firebaseUser.uid },
      });

      if (!user) {
        throw new Error(`userId with authID ${firebaseUser.uid} not found.`);
      }
    } catch (error) {
      Logger.error(`Failed to get user. Reason = ${error.message}`);
      throw error;
    }

    return {
      authId: user.auth_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: firebaseUser.email ?? "",
      roleType: user.role_type,
      active: user.active,
    };
  }

  async getUserRoleByAuthId(authId: string): Promise<Role> {
    try {
      const user: User | null = await User.findOne({
        where: { auth_id: authId },
      });
      if (!user) {
        throw new Error(`userId with authId ${authId} not found.`);
      }
      return user.role_type;
    } catch (error) {
      Logger.error(`Failed to get user role. Reason = ${error.message}`);
      throw error;
    }
  }

  async getUserIdByAuthId(authId: string): Promise<string> {
    try {
      const user: User | null = await User.findOne({
        where: { auth_id: authId },
      });
      if (!user) {
        throw new Error(`user with authId ${authId} not found.`);
      }
      return user.auth_id;
    } catch (error) {
      Logger.error(`Failed to get user id. Reason = ${error.message}`);
      throw error;
    }
  }

  async getAuthIdById(userId: string): Promise<string> {
    try {
      const user: User | null = await User.findByPk(Number(userId));
      if (!user) {
        throw new Error(`userId ${userId} not found.`);
      }
      return user.auth_id;
    } catch (error) {
      Logger.error(`Failed to get authId. Reason = ${error.message}`);
      throw error;
    }
  }

  async getUsers(): Promise<Array<UserDTO>> {
    let userDtos: Array<UserDTO> = [];
    try {
      const users: Array<User> = await User.findAll();

      userDtos = await Promise.all(
        users.map(async (user) => {
          let firebaseUser: firebaseAdmin.auth.UserRecord;

          try {
            firebaseUser = await firebaseAdmin.auth().getUser(user.auth_id);
          } catch (error) {
            Logger.error(
              `user with authId ${user.auth_id} could not be fetched from Firebase`,
            );
            throw error;
          }

          return {
            authId: user.auth_id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: firebaseUser.email ?? "",
            roleType: user.role_type,
            active: user.active
          };
        }),
      );
    } catch (error) {
      Logger.error(`Failed to get users. Reason = ${error.message}`);
      throw error;
    }

    return userDtos;
  }

  async createUser(
    user: CreateUserDTO,
    authId?: string,
    signUpMethod = "PASSWORD",
  ): Promise<UserDTO> {
    let newUser: User;
    let firebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      if (signUpMethod === "GOOGLE") {
        if (authId == null) {
          throw Error("Auth ID is null");
        }
        firebaseUser = await firebaseAdmin.auth().getUser(authId);
      } else {
        // signUpMethod === PASSWORD
        firebaseUser = await firebaseAdmin.auth().createUser({
          email: user.email,
          password: user.password,
        });
      }

      try {
        newUser = await User.create({
          first_name: user.firstName,
          last_name: user.lastName,
          auth_id: firebaseUser.uid,
          email: firebaseUser.email,
          role_type: user.roleType,
          active: user.active,
        });
      } catch (postgresError) {
        try {
          await firebaseAdmin.auth().deleteUser(firebaseUser.uid);
        } catch (firebaseError) {
          const errorMessage = [
            "Failed to rollback Firebase user creation after Postgres user creation failure. Reason =",
            firebaseError.message,
            "Orphaned authId (Firebase uid) =",
            firebaseUser.uid,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw postgresError;
      }
    } catch (error) {
      Logger.error(`Failed to create user. Reason = ${error.message}`);
      throw error;
    }

    return {
      authId: newUser.auth_id,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      email: firebaseUser.email ?? "",
      roleType: newUser.role_type,
      active: user.active,
    };
  }

  async updateUserById(userId: string, user: UpdateUserDTO): Promise<UserDTO> {
    let updatedFirebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      const updateResult = await User.update(
        {
          first_name: user.firstName,
          last_name: user.lastName,
          role_type: user.roleType,
        },
        {
          where: { id: userId },
          returning: true,
        },
      );

      // check number of rows affected
      if (updateResult[0] < 1) {
        throw new Error(`userId ${userId} not found.`);
      }

      // the cast to "any" is needed due to a missing property in the Sequelize type definitions
      // https://github.com/sequelize/sequelize/issues/9978#issuecomment-426342219
      /* eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-explicit-any */
      const oldUser: User = (updateResult[1][0] as any)._previousDataValues;

      try {
        updatedFirebaseUser = await firebaseAdmin
          .auth()
          .updateUser(oldUser.auth_id, { email: user.email });
      } catch (error) {
        // rollback Postgres user updates
        try {
          await User.update(
            {
              first_name: oldUser.first_name,
              last_name: oldUser.last_name,
              role_type: oldUser.role_type,
            },
            {
              where: { id: userId },
            },
          );
        } catch (postgresError) {
          const errorMessage = [
            "Failed to rollback Postgres user update after Firebase user update failure. Reason =",
            postgresError.message,
            "Postgres user id with possibly inconsistent data =",
            oldUser.auth_id,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw error;
      }
    } catch (error) {
      Logger.error(`Failed to update user. Reason = ${error.message}`);
      throw error;
    }

    return {
      authId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: updatedFirebaseUser.email ?? "",
      roleType: user.roleType,
      active: user.active,
    };
  }

  async deleteUserById(userId: string): Promise<void> {
    try {
      // Sequelize doesn't provide a way to atomically find, delete, and return deleted row
      const deletedUser: User | null = await User.findByPk(Number(userId));

      if (!deletedUser) {
        throw new Error(`userid ${userId} not found.`);
      }

      const numDestroyed: number = await User.destroy({
        where: { id: userId },
      });

      if (numDestroyed <= 0) {
        throw new Error(`userid ${userId} was not deleted in Postgres.`);
      }

      try {
        await firebaseAdmin.auth().deleteUser(deletedUser.auth_id);
      } catch (error) {
        // rollback user deletion in Postgres
        try {
          await User.create({
            first_name: deletedUser.first_name,
            last_name: deletedUser.last_name,
            auth_id: deletedUser.auth_id,
            email: deletedUser.email,
            role_type: deletedUser.role_type,
            active: deletedUser.active,
          });
        } catch (postgresError) {
          const errorMessage = [
            "Failed to rollback Postgres user deletion after Firebase user deletion failure. Reason =",
            postgresError.message,
            "Firebase uid with non-existent Postgres record =",
            deletedUser.auth_id,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw error;
      }
    } catch (error) {
      Logger.error(`Failed to delete user. Reason = ${error.message}`);
      throw error;
    }
  }

  async deleteUserByEmail(email: string): Promise<void> {
    try {
      const firebaseUser: firebaseAdmin.auth.UserRecord = await firebaseAdmin
        .auth()
        .getUserByEmail(email);
      const deletedUser: User | null = await User.findOne({
        where: { auth_id: firebaseUser.uid },
      });

      if (!deletedUser) {
        throw new Error(`userid ${firebaseUser.uid} not found.`);
      }

      const numDestroyed: number = await User.destroy({
        where: { auth_id: firebaseUser.uid },
      });

      if (numDestroyed <= 0) {
        throw new Error(
          `userid ${firebaseUser.uid} was not deleted in Postgres.`,
        );
      }

      try {
        await firebaseAdmin.auth().deleteUser(deletedUser.auth_id);
      } catch (error) {
        // rollback user deletion in Postgres
        try {
          await User.create({
            first_name: deletedUser.first_name,
            last_name: deletedUser.last_name,
            auth_id: deletedUser.auth_id,
            email: deletedUser.email,
            role_type: deletedUser.role_type,
            active: deletedUser.active,
          });
        } catch (postgresError) {
          const errorMessage = [
            "Failed to rollback Postgres user deletion after Firebase user deletion failure. Reason =",
            postgresError.message,
            "Firebase uid with non-existent Postgres record =",
            deletedUser.auth_id,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw error;
      }
    } catch (error) {
      Logger.error(`Failed to delete user. Reason = ${error.message}`);
      throw error;
    }
  }
}

export default UserService;
