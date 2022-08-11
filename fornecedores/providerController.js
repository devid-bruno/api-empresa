import express from 'express';
import Provider from './Providers.js';

const router = express.Router();

router.get('/provider', (req, res) => {
    res.statusCode = 200;
    Provider.findAll().then(fornecedores => {
        res.json(fornecedores);
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
});


router.post("/provider", (req, res) => {
    var { fornecedor, nomeProduto, descricao, quantFornecida} = req.body;

    if (!nomeProduto || !descricao || !quantFornecida || !fornecedor) {
        res.statusCode = 400;
        res.json({ error: "Preencha todos os campos" });
        return;
    }
    Provider.create({
        fornecedor,
        nomeProduto,
        descricao,
        quantFornecida
    }).then(provider => {
        res.statusCode = 201;
        res.json(provider);
    }).catch(err => {
        if (err.name === "SequelizeUniqueConstraintError") {
            res.statusCode = 400;
            res.json({ error: "Este fornecedor já existe" });
        } else {
            res.statusCode = 500;
            res.json({ error: err });
        }
    }); 
});

router.post("/providerDelete/:id", (req, res) => {
    var  id  = req.params.id;
    Provider.destroy({
        where: {
            id: id
        }
    }).then(fornecedores =>{
        res.statusCode = 200;
        res.json(fornecedores);
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
})

router.post("/providerEdit/:id", (req, res) => {
    var  id  = req.params.id;
    var { fornecedor, nomeProduto, descricao, quantFornecida} = req.body;
    Provider.update({
        fornecedor: fornecedor,
        nomeProduto: nomeProduto,
        descricao: descricao,
        quantFornecida: quantFornecida
    },{
        where: {
            id: id
        }
    }).then(fornecedores => {
        res.statusCode = 200;
        res.json(fornecedores);
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
});


export default router;