import express from "express";
import { uploadConfig } from "../configMulter.js";
import { filter } from "../functions.js";
const list = [];
const routes = express.Router();
// type data = {
//     filename: string,
//     mimetype: string,
// }
// GET ROUTES
routes.get("/", (req, res) => {
    try {
        res.status(200).json("SERVIDOR FUNCIONANDO");
    }
    catch (error) {
        res.status(500).json({ sms: "OCORREU ALGUM ERRO NO SERVIDOR", error });
    }
});
routes.get("/list", (req, res) => {
    try {
        res.status(200).json(list);
    }
    catch (error) {
        res.status(500).json({ sms: "OCORREU ALGUM ERRO NO SERVIDOR", error });
    }
});
// POST ROUTES
routes.post("/newdata", uploadConfig.fields([{ name: "file", maxCount: 1 }]), (req, res) => {
    // dados obrigatorios "filename, file, mimetype"
    try {
        const data = req.body;
        if (!data.filename) {
            let error = "Não Detetamos Um Nome Neste Ficheiro.";
            console.log(error);
            return res.status(500).json(error);
        }
        ;
        if (!data.mimetype) {
            let error = "Não Foi Detetado um mimetype.";
            console.log(error);
            return res.status(500).json(error);
        }
        let dataSended = {
            id: Math.floor(Math.random() * 100),
            ...data,
            data: new Date(),
            size: data.size,
            sendedBy: req?.socket.remoteAddress,
            src: `http://${req.hostname}:${req.socket.localPort}/public/uploadedFiles/${filter({ mimetype: data.mimetype })}/${encodeURI(data.filename.replaceAll(" ", "_"))}`
        };
        list.push(dataSended);
        console.log(`O endereço ${req?.socket.remoteAddress} enviou o ficheiro: ` + data.filename);
        return res.status(201).json(dataSended);
    }
    catch (error) {
        return res.status(500).json({ sms: "OCORREU ALGUM ERRO NO SERVIDOR.", error });
    }
});
export default routes;
