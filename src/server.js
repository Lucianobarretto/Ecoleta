const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

// Configurar pasta pública
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))



// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

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
    return res.render("index.html", { title: "Um título"})
})




server.get("/create-point", (req, res) => {

    // req.query: Query Strings da nossa url
    // req.query

    // console.log(req.query)  // ====> comando para teste!!


    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req:body: O corpo do nosso formulário
    // console.log(req.body)  // ====> comando para teste!!

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.send("ok")
    }

    db.run(query, values, afterInsertData)

})



server.get("/search", (req, res) => {

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do BANCO DE DADOS
        return res.render("search-results.html", { places: rows, total: total})
    })
})

// "ligar o servidor"
server.listen(3000)