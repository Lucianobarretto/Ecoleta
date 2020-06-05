const express = require("express")
const server = express()


// Configurar pasta pública
server.use(express.static("public"))

// Configurar caminhos da minha aplicação
// Página inicial
// server.get("/", function(req, res) {
//
// })
//   ==> "transformado em uma arrow function" <==
//server.get("/", (req, res) => { // ===> aqui tem um "req" e um "res", onde:
//    res.send("Hello world")     // o REQ é uma requisição e o RES é uma resposta
//}) =====> isso tudo foi comentado para entender o passo-a-passo... até aqui tudo OK!
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})

server.get("/search-results", (req, res) => {
    res.sendFile(__dirname + "/views/search-results.html")
})

// os termos aqui tem a função de "ligar o servidor"
server.listen(3000)