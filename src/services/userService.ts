import { hash } from "bcrypt";
import USER from "../models/USER";
import { UserDTO } from "../dto/user.dto";

export async function findAllUser() {
  const data = await USER.findAll();
  return data;
}

export async function createUser(body: UserDTO) {
  const hashedPassword = await hash(body.password, 10);
  const user = await USER.create({ ...body, password: hashedPassword });
  return user;
}
