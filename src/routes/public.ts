import express from "express";
import { uploadConfig } from "../configMulter.js";
import { filter } from "../functions.js";
// import { list } from "../data/db.js";~
const list: any[] = []

const routes = express.Router();


// GET ROUTES
routes.get("/", (req, res) => {
    try {

        res.status(200).json("SERVIDOR FUNCIONANDO")
    } catch (error) {

        res.status(500).json({ aaa: "OCORREU ALGUM ERRO NO SERVIDOR", error })
    }
});
routes.get("/list", (req, res) => {
    try {
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json({ aaa: "OCORREU ALGUM ERRO NO SERVIDOR", error })
    }
});

// POST ROUTES
routes.post("/newdata", uploadConfig.fields([{ name: "file", maxCount: 1 }]), (req: any, res: any) => {
    // dados obrigatorios "filename, file, mimetype"
    try {
        const data = req.body;

        const inicio = Date.now()
        if (!data) {
            console.log("Sem Algum Corpo Na Requisição.");
            return res.status(500).json("Sem Algum Corpo Na Requisição.");
        };

        if (!data.filename) {
            console.log("Não Detetamos Um Nome Neste Ficheiro.");
            return res.status(500).json("Não Detetamos Um Nome Neste Ficheiro.");
        };

        if (!data.mimetype) {
            console.log("Não Foi Detetado um mimetype.");
            return res.status(500).json("Não Foi Detetado um mimetype.");
        };
        const fim = Date.now();
        let dataSended = {
            id: Math.floor(Math.random() * 100),
            ...data,
            data: new Date(),
            size: data.size,
            duracao: fim - inicio + "s",
            sendedBy: req.socket.remoteLocal,
            src: `http://${req.hostname}:${req.socket.localPort}/public/uploadedFiles/${filter({ mimetype: data.mimetype }) || "null"}/${encodeURI(data.filename)}`
        }
        list.push(dataSended);
        res.status(201).json(dataSended);
        console.log(`O endereço ${req?.socket.remoteAddress} enviou o ficheiro: ` + data.filename);
    } catch (error) {
        res.status(500).json({ aaa: "OCORREU ALGUM ERRO NO SERVIDOR.", error });
    }
})

export default routes;