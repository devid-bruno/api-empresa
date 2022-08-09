import express from 'express';
import User from './User.js';
import bcrypt from 'bcrypt';

const app = express();


app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/auth", (req, res) => {
    var { email, senha } = req.body;
    if (!email || !senha) {
        res.statusCode = 400;
        res.json({ error: "Preencha todos os campos" });
        return;
    }
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (!user) {
            res.statusCode = 400;
            res.json({ error: "Usuário não encontrado" });
            return;
        }
        if (bcrypt.compareSync(senha, user.senha)) {
            req.session.user = user;
            res.statusCode = 200;
            res.json(user);
        } else {
            res.statusCode = 400;
            res.json({ error: "Senha incorreta" });
        }
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
});

app.get("/user", (req, res) => {
    res.statusCode = 200;
    User.findAll().then(users => {
        res.json(users);
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
})

app.post("/user", (req, res) => {
    var { nome, email, telefone, senha, level } = req.body;
    
    User.findOne({
        where: 
        {
            nome: nome,
            telefone: telefone,
            senha: senha,
            email: email,
            level: level
        }
    }).then( user => {
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(senha, salt);

            User.create({
                nome: nome,
                telefone: telefone,
                senha: hash,
                email: email,
                level: level
            }).then(() => {
                res.json("Usuário criado com sucesso");
            }).catch((err) => {
                res.json("Não foi possível criar o usuário");
            });
        }
    });
})


app.post("/userDelete/:id", (req, res) => {
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

app.post("/userEdit/:id", (req, res) => {
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

