// Declarando variaveis dos packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const Pergunta = require("./database/Perguntas");
const Resposta = require("./database/Respostas");

// testando banco de dados

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso");
    })
    .catch((error) =>{
        console.log(error);
    })
// setando configuranção do html e pastas
app.set('view engine', 'ejs');
app.use(express.static('public'));

// bodyparser para pegar os resultados dos form
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//rotas
app.get("/", (req, res) =>{
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC']
    ]}).then(values => {
        console.log(values);
        res.render("index",{
            perguntas: values
        });
    })
    
})

app.get("/perguntas",  (req,res) =>{
    res.render("perguntas");
})

app.post("/salvarpergunta", (req,res) =>{
    let titulo = req.body.titulo;
    let pergunta = req.body.pergunta;
    Pergunta.create({
        titulo: titulo,
        descricao: pergunta
    }).then(() =>{
        res.redirect("/");
    })
})

app.get("/perguntas/:id", (req, res) =>{

    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined)
        {
            Resposta.findAll({
                where: {IDpergunta: pergunta.id},
                order: [ 
                    ['id', 'desc']
                ]
            }).then( values =>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: values
                });
            });
          
        }else{
            res.redirect("/");
        }
    });
});


app.post("/responder", (req, res) =>{
    let id = req.body.id;
    let autor = req.body.autor;
    let resposta = req.body.resposta;

    Resposta.create({
        autor: autor,
        corpo: resposta,
        IDpergunta: id

    }).then( ()=>{
        res.redirect("/perguntas/" + id);
    });

});

// iniciando o servidor
app.listen(3000, () =>{
    console.log("Aplicação Iniciada!");
})