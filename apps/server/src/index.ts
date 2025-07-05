import express, { Response, Request } from "express";
import { config } from "dotenv";
import errorHandler from "./helper/error";
import router from "./api/v1/routes";
import cors from "cors";
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use("/api/v1", router);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Port is running on : http://localhost:${PORT}`);
});
