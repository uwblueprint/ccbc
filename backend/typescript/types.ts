export type Role = "Admin" | "Subscriber" | "Author";

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type UserDTO = {
  id: string;
  roleType: Role;
  firstName: string;
  lastName: string;
  email: string;
  subscriptionExpiresOn: Date | null;
};

export type CreateUserDTO = Omit<UserDTO, "id"> & { password: string };

export type UpdateUserDTO = Omit<UserDTO, "id">;

export type RegisterUserDTO = Omit<CreateUserDTO, "role_type">;

export type AuthDTO = Token & UserDTO;

export type Letters = "A" | "B" | "C" | "D";

export type NodemailerConfig = {
  service: "gmail";
  auth: {
    type: "OAuth2";
    user?: string;
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
  };
};

export type SignUpMethod = "PASSWORD" | "GOOGLE";

export type TagDTO = {
  id: string;
  name: string;
};
