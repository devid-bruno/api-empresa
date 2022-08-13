import express from "express";
import Admin from './Admin.js';
import bcrypt from 'bcrypt';
import verify from "../middleware/auth.js";

const router = express.Router();

router.get("/logado", verify, (req, res) => {
    res.render("admin/index", { nome: req.session.admin.nome });
});

router.get("/adminAuth", (req, res) => {
    res.render("index");
})



router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    Admin.findOne({
        where: {
            email: email
        }
    }).then((admin) => {
       if(admin != undefined){
           var correct = bcrypt.compareSync(password, admin.password);

           if(correct){
            req.session.admin = {
                id: admin.id,
                email: admin.email,
                nome: admin.nome
            }
            res.redirect("/logado")
           }else{
            res.redirect("/adminAuth");
           }
       }else{
        res.redirect("adminAuth");  
       }
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
});


router.get("/admin", (req, res) => {
    Admin.findAll().then(admin => {
        res.send(admin);
    }).catch(err => {
        res.send(err);
    });
});

router.post("/admin", verify,(req, res) => {
    var { nome, email, telefone, password} = req.body;
    
    Admin.findOne({
        where: 
        {
            nome: nome,
            email: email,
            telefone: telefone,
            password: password
        }
    }).then( admin => {
        if(admin == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            Admin.create({
            nome: nome,
            email: email,
            telefone: telefone,
            password: hash
            }).then(() => {
                res.json("Usuário criado com sucesso");
            }).catch((err) => {
                res.json("Usuário já existe");
            });
        }
    });
});


router.put("/admin/:id", verify,(req, res) => {
    var { nome, email, telefone, password} = req.body;
    var { id } = req.params;
    Admin.update({
        nome: nome,
        email: email,
        telefone: telefone,
        password: password
    },{
        where: {
            id: id
        }
    }).then(() => {
        res.json("Usuário editado com sucesso");
    }).catch((err) => {
        res.json("Usuário não existe");
    })
});


router.delete("/admin/:id", verify,(req, res) => {
    var { id } = req.params;
    Admin.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.json("Usuário excluido com sucesso");
    }).catch((err) => {
        res.json("Usuário não existe");
    })
});

export default router;

