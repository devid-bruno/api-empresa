import express from "express";
import Admin from './Admin.js';
import User from '../user/User.js';
import bcrypt from 'bcrypt';
import verify from "../middleware/auth.js";

const router = express.Router();

router.get("/logado", verify, (req, res) => {

    User.findAll().then(user => {
        res.render("admin/index", { user, nome: req.session.admin.nome});
    }).catch(err => {
        res.send(err);
    });
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
        if(admin.nivel == "administrador"){
            if(bcrypt.compareSync(password, admin.password)){
                req.session.admin = admin;
                res.redirect("/logado");
            }else{
                res.redirect("/adminAuth");
            }
        }
        else{
            res.redirect("/adminAuth");
        }
       }else{
        res.redirect("/adminAuth");  
       }
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
});



router.get("/createAdmin", verify,(req, res) => {
    res.render("admin/createAdmin", { nome: req.session.admin.nome});
})

router.post("/admin", verify,(req, res) => {
    var { nome, email, telefone, password, nivel} = req.body;
    
    Admin.findOne({
        where: 
        {
            nome: nome,
            email: email,
            telefone: telefone,
            password: password,
            nivel: nivel
        }
    }).then( admin => {
        if(admin == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            Admin.create({
            nome: nome,
            email: email,
            telefone: telefone,
            password: hash,
            nivel: nivel
            }).then(() => {
                res.redirect("/logado");
            }).catch((err) => {
                res.json("Usuário já existe");
            });
        }
    });
});

router.get("/editAdmin/:id", verify, (req, res) => {
   var id = req.params.id;

    Admin.findByPk(id).then(admin => {
        if(admin != undefined){
            res.render("admin/editAdmin", { admin: admin, nome: req.session.admin.nome});
        }else{
            res.redirect("/logado");
        }
    }).catch(err => {
        res.redirect('/logado');
    })
});

router.post("/adminUpdate", verify,(req, res) => {
    var id  = req.body.id
    var { nome, email, telefone, password, nivel} = req.body
    
    Admin.update({
        nome: nome,
        email: email,
        telefone: telefone,
        password: password,
        nivel: nivel
    },{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/logado");
    }).catch((err) => {
        res.json(err);
    })
});


router.post("/adminDelete", verify,(req, res) => {
    var id  = req.body.id;
    Admin.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/logado");
    }).catch((err) => {
        res.json(err);
    })
});

//destruir sessão
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/adminAuth");
});


export default router;
