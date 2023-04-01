import { hash } from "bcrypt";
import USER from "../models/USER";
import { UserDTO } from "../dto/user.dto";

export async function findAllUser() {
  const data = await USER.findAll();
  return data;
}

async function checkIfEmailExists(email: string) {
  const user = await USER.findOne({ where: { email } });
  return !!user;
}

export async function createUser(body: UserDTO) {
  const { name, email, password, phone, avatar } = body;

  const emailExists = await checkIfEmailExists(email);
  if (emailExists) {
    throw new Error("El correo ya está en uso");
  }

  const hashedPassword = await hash(password, 10);
  const user = await USER.create({ name, email, password: hashedPassword, phone, avatar });
  return user;
}


export async function getUserById(id: number) {
  const data = await USER.findOne({ where: { id } });
  return data;
}

export async function getUserByEmail(email: UserDTO) {
  const data = await USER.findOne({ where: { email } });
  return data;
}

export async function deleteUser(id: number) {
  const user = await USER.findByPk(id);
  if (!user) {
    return null
  }
  await user.destroy();
  return true;
}