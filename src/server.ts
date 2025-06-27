import dotenv from "dotenv";
import express from "express";
import path from "path";
import { cwd } from "process";
import routes from "./routes/public.js";
dotenv.config()

const app = express();
app.use(express.json());
app.use(routes);
app.use("/public", express.static(path.join(cwd(), "public")));

console.log("DIRECTORIO: "+path.join(cwd(), "/public"));

const PORTA: any | bigint | undefined = process.env.PORTA | 5000;








app.listen(PORTA, "0.0.0.0", () => {
    console.log("servidor rodando em http://localhost:" + PORTA)
})