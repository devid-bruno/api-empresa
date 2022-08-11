import express from "express";
import Admin from './Admin.js';
import bcrypt from 'bcrypt';


const router = express.Router();

router.get("/admin/index", (req, res) => {
    //exibir o nome do usuário logado
    res.render("admin/index", {
        user: req.session.user
        });
});

router.get("/adminAuth", (req, res) => {
    res.render("index");
})



router.post("/authAdmin", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    Admin.findOne({
        where: {
            email: email
        }
    }).then((admin) => {
        if (admin != undefined) {
            if (bcrypt.compareSync(password, admin.password)) {
                req.session.admin = {
                    id: admin.id,
                    email: admin.email
                };
                res.redirect("/admin/index");
            } else {
                res.redirect("/index");
            }
        } else {
            res.redirect("/index");
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

router.post("/admin", (req, res) => {
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


router.put("/admin/:id", (req, res) => {
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


router.delete("/admin/:id", (req, res) => {
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

