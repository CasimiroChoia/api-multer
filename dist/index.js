"use strict";
// import express from "express";
// import dotenv from "dotenv";
// import mysql from "mysql";
// // import faker from "faker";
// dotenv.config()
// const app = express()
// app.use(express.json())
// // const PORTA = process.env.PORTA | 5000
// let lista = [];
// app.get("/mysql", (req, res) => {
//     mysql.createConnection({
//     })
// })
// app.post('/', (req, res) => {
//     try {
//         lista.push({
//             ...req.body,
//             userId: Math.floor((Math.random() * 10) + 1),
//             id: Math.floor((Math.random() * 1000) + 1)
//         })
//         res.status(201).json(lista)
//     } catch (error) {
//         res.status(500).send("Erro qualquer assinalado: ", error)
//     }
// })
// //obter
// app.get("/", (req, res) => {
//     try {
//         // let lista = [];
//         // for (let index = 0; index < 100; index++) {
//         //     lista.push({
//         //     })
//         // }
//         res.status(200).json({
//             itens: lista.length,
//             lista
//         })
//     } catch (error) {
//         res.status(500).send("Erro qualquer assinalado: ", error)
//     }
// })
// app.get("/reset", (req, res) => {
//     try {
//         lista = []
//         res.status(200).json(lista)
//     } catch (error) {
//         res.status(500).send("Erro qualquer assinalado: ", error)
//     }
// })
// // app.listen(PORTA, () => {
// //     console.log("servidor rodando em https://localhost:" + PORTA)
// // })
// export { app }
