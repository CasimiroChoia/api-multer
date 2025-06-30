import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import { cwd } from "process";
import routes from "./routes/routes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/public", express.static(path.join(cwd(), "public")));
console.log("DIRECTORIO: " + path.join(cwd(), "/public"));
const PORTA = process.env.PORTA | 6106;
app.listen(PORTA, "0.0.0.0", () => {
    console.log("servidor rodando em http://localhost:" + PORTA);
});
