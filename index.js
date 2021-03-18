const express = require("express");
const app = express();

app.get("/", (req, res) =>{
    res.send("Bem vindo ao site de perguntas");
})


app.listen(3000, () =>{
    console.log("Aplicação Iniciada!");
})