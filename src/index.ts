console.clear();
import httpServer from "./config/http";
import { config } from "dotenv";
import sequelize from "./config/db";
import transporter from "./config/nodemailer";

config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.sync();
    console.log("Database synced successfully.");
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    transporter.verify().then(()=>{
        console.log('Ready for send emails')
    }).catch((err: Error) => console.log(err))
  } catch (err: any) {
    console.error("Error starting server: ", err);
  }
}

startServer();
