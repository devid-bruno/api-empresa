import express from 'express';
import Product from './Product.js';
import adminAuth from "../middleware/auth.js";
const router = express.Router();


router.get('/product/:id', (req, res) => {
    res.statusCode = 200;
    Product.findAll({
        where: {
            provider: req.params.id
        }
    }).then(products => {
        res.json(products);
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
});


router.post("/product", (req, res) => {
    var { nome, descricao, preco, quantidade, provider } = req.body;

    Product.create({
        nome: nome,
        descricao: descricao,
        preco: preco,
        quantidade: quantidade,
        provider: provider
    }).then(product =>{
        res.statusCode = 200;
        res.json(product);
    }).catch(err => {
        if (err.name === "SequelizeUniqueConstraintError") {
            res.statusCode = 400;
            res.json({ error: "Este produto já existe" });
        } else {
            res.statusCode = 500;
            res.json({ error: err });
        }
    });
});

router.post("/productDelete/:id", (req, res) => {
    var  id  = req.params.id;
    Product.destroy({
        where: {
            id: id
        }
    }).then(() =>{
        res.statusCode = 200;
        res.json("produto deletado");
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
})


router.post("/productEdit/:id", (req, res) => {
    var  id  = req.params.id;
    var { title, description, price } = req.body;
    Product.update({
        title: title,
        description: description,
        price: price
    },{
        where: {
            id: id
        }
    }).then(products => {
        res.statusCode = 200;
        res.json(products);
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
});

export default router;