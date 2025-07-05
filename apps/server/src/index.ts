import express, { Response, Request } from "express";
import { config } from "dotenv";
config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "STATUS: OK",
  });
});

app.listen(PORT, () => {
  console.log(`Port is running on : http://localhost:${PORT}`);
});
