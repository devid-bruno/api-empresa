import express from 'express';
import User from './User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get("/", (req, res) => {
    res.render("func");
})



router.get("/user", (req, res) => {
    User.findAll().then(users => {
        res.render("usuario/index", { users });
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
})

router.post("/user", (req, res) => {
    var { nome, email, telefone, password, isAdmin } = req.body;
    
    User.findOne({
        where: 
        {
            nome: nome,
            email: email,
            telefone: telefone,
            password: password,
            isAdmin: isAdmin
        }
    }).then( user => {
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
            nome: nome,
            email: email,
            telefone: telefone,
            password: hash,
            isAdmin: isAdmin
            }).then(() => {
                res.json("Usuário criado com sucesso");
            }).catch((err) => {
                res.json("Usuário já existe");
            });
        }
    });
})


router.post("/userDelete/:id", (req, res) => {
    var  id  = req.params.id;
    User.destroy({
        where: {
            id: id
        }
    }).then(users =>{
        res.statusCode = 200;
        res.json("Usuário deletado com sucesso");
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
})

router.post("/userEdit/:id", (req, res) => {
    var  id  = req.params.id;
    var { nome, email, telefone, senha, level } = req.body;
    User.update({
        nome: nome,
        email: email,
        telefone: telefone,
        senha: senha,
        level: level
    },{
        where: {
            id: id
        }
    }).then(users => {
        res.statusCode = 200;
        res.json(users);
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
});


export default router;