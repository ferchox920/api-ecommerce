import expressApp from "./express";
import { createServer } from "http";

const httpServer = createServer(expressApp);

export default httpServer;