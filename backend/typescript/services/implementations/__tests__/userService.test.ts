import { snakeCase } from "lodash";

import User from "../../../models/user.model";
import UserService from "../userService";

import { UserDTO } from "../../../types";

import testSql from "../../../testUtils/testDb";

const testUsers = [
  {
    firstName: "Peter",
    lastName: "Pan",
    id: "123",
    authId: "123",
    roleType: "Admin",
  },
  {
    firstName: "Wendy",
    lastName: "Darling",
    id: "321",
    authId: "321",
    roleType: "Subscriber",
  },
  {
    firstName: "Tinker",
    lastName: "Bell",
    id: "111",
    authId: "111",
    roleType: "Author",
  },
];

const testId = "123";

jest.mock("firebase-admin", () => {
  const auth = jest.fn().mockReturnValue({
    getUser: jest.fn().mockReturnValue({ email: "test@test.com" }),
    createUser: jest.fn().mockReturnValue({
      authId: "",
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      roleType: "Admin", 
      active: true,
    }),
    deleteUser: jest.fn().mockReturnValue({
      authId: "",
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      roleType: "Admin", 
      active: true,
    }),
  });
  return { auth };
});

describe("pg userService", () => {
  let userService: UserService;

  beforeEach(async () => {
    await testSql.sync({ force: true });
    userService = new UserService();
  });

  afterAll(async () => {
    await testSql.sync({ force: true });
    await testSql.close();
  });

  it("createUser", async () => {
    const res = await userService.createUser({
      authId: "",
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      roleType: "Admin", 
      active: true,
      password: "randomPassword",
    });

    expect(res.firstName).toEqual("firstName");
    expect(res.lastName).toEqual("lastName");
    expect(res.roleType).toEqual("Admin");
  });

  it("deleteUserById", async () => {
    const users = testUsers.map((user) => {
      const userSnakeCase: Record<string, string> = {};
      Object.entries(user).forEach(([key, value]) => {
        userSnakeCase[snakeCase(key)] = value;
      });
      return userSnakeCase;
    });

    await User.bulkCreate(users);

    await userService.deleteUserById(testId);
    await expect(userService.getUserById(testId))
    .rejects
    .toThrow(`userId ${testId} not found.`);
  });

  it("getUserById", async () => {
    const users = testUsers.map((user) => {
      const userSnakeCase: Record<string, string> = {};
      Object.entries(user).forEach(([key, value]) => {
        userSnakeCase[snakeCase(key)] = value;
      });
      return userSnakeCase;
    });

    await User.bulkCreate(users);

    const res = await userService.getUserById(testId);

    expect(res.firstName).toEqual(testUsers[0].firstName);
    expect(res.lastName).toEqual(testUsers[0].lastName);
    expect(res.roleType).toEqual(testUsers[0].roleType);
  });

  it("getUsers", async () => {
    const users = testUsers.map((user) => {
      const userSnakeCase: Record<string, string> = {};
      Object.entries(user).forEach(([key, value]) => {
        userSnakeCase[snakeCase(key)] = value;
      });
      return userSnakeCase;
    });

    await User.bulkCreate(users);

    const res = await userService.getUsers();

    res.forEach((user: UserDTO, i) => {
      expect(user.firstName).toEqual(testUsers[i].firstName);
      expect(user.lastName).toEqual(testUsers[i].lastName);
      expect(user.roleType).toEqual(testUsers[i].roleType);
    });
  });
});
