import { Router, Request, Response } from "express";
import { createUser, deleteUser, findAllUser, getUserByEmail, getUserById, updateUser } from "../services/userService";
import { UserDTO } from "../dto/user.dto";
import { authenticateToken } from "../auth/strategy/authenticateMiddleware";


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
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (error:any) {
    if (error.message === "El correo ya está en uso") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).send({ error: error.message });
  }
});


userRouter.get("/id/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getUserById(+id);
    if (!user) return res.status(404).json("no se encontro datos");
    return res.status(200).json(user);
  } catch (error:any) {
    return res.status(500).send({ error: "Error al obtener el usuario por ID", message: error.message });

  }
});


userRouter.get("/email", async (req: Request, res: Response) => {
  const userDTO: UserDTO = req.body;
  try {
    const user = await getUserByEmail(userDTO.email);
    if (!user) return res.status(404).json("no se encontro datos");
    return res.status(200).json(user);
  } catch (error:any) {
    return res.status(500).send({ error: "Error al obtener el usuario por ID", message: error.message });

  }
});

userRouter.delete("/id/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteUser(+id);
    if (!result) return res.status(404).json("no se encontró el usuario");
    return res.status(200).json("Usuario eliminado exitosamente");
  } catch (error) {
    return res.status(500).send({ data: error });
  }
});

userRouter.patch("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone, avatar } = req.body;

  try {
    if (!id) {
      throw new Error("ID de usuario no especificado");
    }
    const updatedUser = await updateUser(Number(id), { name, email, password, phone, avatar },+id);
    res.json(updatedUser);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});



export { userRouter };
