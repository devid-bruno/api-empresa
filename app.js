import express from 'express';
import bodyParser from 'body-parser';
import Product from './products/product.js';
import Provider from './fornecedores/Providers.js';
import User from './user/User.js';
import Client from './client/Client.js';


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    User.findAll().then(users => {
        res.render('index', { users });
    }).catch(err => {
        res.send(err);
    })
})


app.get('/fornecedores', (req, res) => {
    res.statusCode = 200;
    Provider.findAll().then(providers => {
        res.json(providers);
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
});

app.post("/provider", (req, res) => {
    var { nome, email, telefone, cnpj, TipoProvider } = req.body;

    Provider.create({
        nome: nome,
        email: email,
        telefone: telefone,
        cnpj: cnpj,
        TipoProvider: TipoProvider
    }).then(fornecedores =>{
        res.statusCode = 200;
        res.json(fornecedores);
    })
    res.statusCode = 200;
});

app.post("/providerDelete/:id", (req, res) => {
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

app.get('/products', (req, res) => {
    res.statusCode = 200;
    Product.findAll().then(products => {
        res.json(products);
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
});


app.post("/product", (req, res) => {
    var { title, description, price } = req.body;

    Product.create({
        title: title,
        description: description,
        price: price
    }).then(product =>{
        res.statusCode = 200;
        res.json(product);
    })
    res.statusCode = 200;
});


app.get("/users", (req, res) => {
    res.statusCode = 200;
    User.findAll().then(users => {
        res.json(users);
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
})

app.post("/user", (req, res) => {
    var { nome, email, telefone } = req.body;
    User.create({
        nome: nome,
        email: email,
        telefone: telefone
    }).then(User =>{
        res.statusCode = 200;
        res.json(User);
    })
    res.statusCode = 200;
})

app.get("/clients", (req, res) => {
    res.statusCode = 200;
    Client.findAll().then(client => {
        res.json(client);
    }).catch(err => {
        res.statusCode = 500;
        res.json({ error: err });
    });
})

app.post("/client", (req, res) => {
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
        res.json(Client);
    })
    res.statusCode = 200;
})

app.listen(8008, () =>{})