import { hash } from "bcryptjs";
import { CreateUserDTO, UserSchema } from "../dto/user.dto";
import USER from "../models/USER";

export async function findAllUser() {
  const data = await USER.findAll();
  return data;
}

export async function createUser(userData: CreateUserDTO) {
  const { error, value } = UserSchema.validate(userData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const { name, email, password, phone, avatar, address } = value;

  const emailExists = await checkIfEmailExists(email);
  if (emailExists) {
    throw new Error("El correo ya está en uso");
  }

  const hashedPassword = await hash(password, 10);
  const user = await USER.create({
    name,
    email,
    password: hashedPassword,
    phone,
    avatar,
    address
  });
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
    return null;
  }
  await user.destroy();
  return true;
}

export async function updateUser(
  id: number,
  updatedFields: Partial<CreateUserDTO>,
  userId: number
) {
  const { error, value } = UserSchema.validate(updatedFields);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const user = await getUserById(id);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  if (user.id !== userId) {
    throw new Error("No tienes permiso para actualizar este usuario");
  }
  if (value.email) {
    const emailExists = await checkIfEmailExists(value.email);
    if (emailExists) {
      throw new Error("El correo ya está en uso");
    }
  }
  if (value.password) {
    value.password = await hash(value.password, 10);
  }

  const updatedUser = await user.update(value);
  return updatedUser;
}

async function checkIfEmailExists(email: string) {
  const user = await USER.findOne({ where: { email } });
  return !!user;
}
