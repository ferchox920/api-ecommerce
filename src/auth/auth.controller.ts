import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import USER from "../models/USER";

const routerAuth = Router();

routerAuth.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const secret = process.env.JWT_SECRET || "default_secret";

  // Buscamos el usuario en la base de datos
  const user = await USER.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // Comprobamos que la contraseña es correcta
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // Generamos el token JWT
  const token = jwt.sign({ userId: user.id }, secret);

  return res.json({ token });
});

export default routerAuth;
