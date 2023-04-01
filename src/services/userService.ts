import { hash } from "bcryptjs";
import { UserDTO } from "../dto/user.dto";
import USER from "../models/USER";


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

export async function getUserByEmail(email: string) {
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

export async function updateUser(id: number, updatedFields: Partial<UserDTO>, userId: number) {
  const user = await getUserById(id);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  if (user.id !== userId) {
    throw new Error("No tienes permiso para actualizar este usuario");
  }
  if (updatedFields.email) {
    const emailExists = await checkIfEmailExists(updatedFields.email);
    if (emailExists) {
      throw new Error("El correo ya está en uso");
    }
  }
  if (updatedFields.password) {
    updatedFields.password = await hash(updatedFields.password, 10);
  }

  await user.update(updatedFields);
  return user;
}



 