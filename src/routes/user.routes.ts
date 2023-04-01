import { Router, Request, Response } from "express";
import { createUser, findAllUser } from "../services/userService";
import { UserDTO } from "../dto/user.dto";

const userRouter = Router();

userRouter.get("/", async(_req: Request, res: Response) => {

  try {
    const allUser= await findAllUser()
    if(!allUser.length)return res.send('No tenemos datos en la base de datos')
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(404).json({error})
  } 
});

userRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const userDTO: UserDTO = req.body;
    const user = await createUser(userDTO);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export { userRouter };
