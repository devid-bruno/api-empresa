import express from "express";
import Admin from './Admin.js';
import bcrypt from 'bcrypt';
import verify from "../middleware/auth.js";

const router = express.Router();

router.get("/logado", verify, (req, res) => {
    Admin.findAll().then(admin => {
        res.render("admin/index", { admin, nome: req.session.admin.nome});
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



router.get("/createAdmin", verify,(req, res) => {
    res.render("admin/createAdmin", { nome: req.session.admin.nome});
})

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
    var { nome, email, telefone, password} = req.body
    
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

