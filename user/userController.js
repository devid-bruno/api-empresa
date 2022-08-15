import express from 'express';
import User from './User.js';
import bcrypt from 'bcrypt';
import adminAuth from "../middleware/auth.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.render("func");
})

router.post("/authenticateFunc", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then((users) => {
       if(users != undefined){
        if(users){
            if(bcrypt.compareSync(password, users.password)){
                req.session.users = users;
                res.render("usuario/index");
            }else{
                res.redirect("/func");
            }
        }
        else{
            res.redirect("/func");
        }
       }else{
        res.redirect("/func");  
       }
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
});

router.get("/user", (req, res) => {
    User.findAll().then(users => {
        res.render("usuario/index", { users });
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
})

router.post("/user", (req, res) => {
    var { nome, email, telefone, password} = req.body;
    
    User.findOne({
        where: 
        {
            nome: nome,
            email: email,
            telefone: telefone,
            password: password
        }
    }).then( users => {
        if(users == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
            nome: nome,
            email: email,
            telefone: telefone,
            password: hash
            }).then(() => {
                res.json("/func");
            }).catch((err) => {
                res.json({err}, "Usuário já existe");
            });
        }
    });
});


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