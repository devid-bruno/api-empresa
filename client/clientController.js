import express from 'express';
import Client from './Client.js';
const router = express.Router();

router.get("/cliente", (req, res) => {
    res.statusCode = 200;
    Client.findAll().then(client => {
        res.render("cliente/clientes", { client });
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
})

router.post("/client", (req, res) => {
    var { nome, email, telefone, nasci, cpf, endereco, bairro, quantPedidos } = req.body;
    Client.create({
        nome: nome,
        email: email,
        telefone: telefone,
        nasci: nasci,
        cpf: cpf,
        endereco: endereco,
        bairro: bairro,
        quantPedidos: quantPedidos
    }).then(Client =>{
        res.statusCode = 200;
        res.render("cliete/cadasCliente", { Client });
    }).catch(err => {
        if (err.name === "SequelizeUniqueConstraintError") {
            res.statusCode = 400;
            res.json({ error: "Este cliente já existe" });
        } else {
            res.statusCode = 500;
            res.json({ error: err });
        }
    });
})


router.post("/clientDelete/:id", (req, res) => {
    var  id  = req.params.id;
    Client.destroy({
        where: {
            id: id
        }
    }).then(clientes =>{
        res.statusCode = 200;
        res.json("Cliente deletado com sucesso");
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
})


router.post("/clientEdit/:id", (req, res) => {
    var  id  = req.params.id;
    var { nome, email, telefone, nasci, cpf, endereco, bairro, quantPedidos } = req.body;
    Client.update({
        nome: nome,
        email: email,
        telefone: telefone,
        nasci: nasci,
        cpf: cpf,
        endereco: endereco,
        bairro: bairro,
        quantPedidos: quantPedidos
    },{
        where: {
            id: id
        }
    }).then(clients => {
        res.statusCode = 200;
        res.json(clients);
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
});

export default router;