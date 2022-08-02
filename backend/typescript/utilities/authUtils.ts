import { AuthDTO, UserDTO } from "../types";

const authDtoToToUserDto = (authDTO: AuthDTO): UserDTO => {
  const userDTO: UserDTO = (({
    id,
    firstName,
    lastName,
    email,
    roleType,
    subscriptionExpiresOn,
  }) => ({ id, firstName, lastName, email, roleType, subscriptionExpiresOn }))(
    authDTO,
  );
  return userDTO;
};

export default authDtoToToUserDto;
