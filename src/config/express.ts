import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { userRouter } from "../routes/user.routes";



config();

const expressApp = express();

// Middlewares
expressApp.use(cors({
  origin: ['http://localhost:5173'],
  allowedHeaders: ['Content-Type', 'Authorization', 'reset', 'pos', 'confirm'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'], // agregamos los métodos permitidos
}));

expressApp.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
expressApp.use(bodyParser.json({ limit: "50mb" }));
expressApp.use(cookieParser());
expressApp.use(morgan("dev"));

expressApp.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Credentials', '*');
  next();
});

// Routes

expressApp.use('/user',userRouter)

// Error catching endware.
expressApp.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;

  res.status(status).send(message);
});

export default expressApp;
