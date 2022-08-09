import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import Product from './products/product.js';
import User from './user/User.js';

import clientController from './client/clientController.js';
import UsersController from './user/UsersController.js';
import providerController from './fornecedores/providerController.js';
import productController from './products/productController.js';


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
    secret: "qualquercoisa",
    cookie: {maxAge: 30000000000}   
}))

app.use("/", UsersController);
app.use("/", clientController);
app.use("/", providerController);
app.use("/", productController);

app.get('/', (req, res) => {
    User.findAll().then(users => {
        res.render('index', { users });
    }).catch(err => {
        res.send(err);
    })
})


//PRODUTOS


app.listen(8008, () =>{})