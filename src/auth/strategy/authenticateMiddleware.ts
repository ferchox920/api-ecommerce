import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  userId: number;
}

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No se ha proporcionado un token de autenticación" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token de autenticación inválido" });
    }
    const jwtPayload = payload as JwtPayload;
    req.userId = jwtPayload.userId;
    next();
    return;
  });
  return;
};
