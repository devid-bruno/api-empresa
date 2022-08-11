import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import cors from 'cors';
import clientController from './client/clientController.js';
import UsersController from './user/userController.js';
import providerController from './fornecedores/providerController.js';
import productController from './products/productController.js';
import adminController from './admin/adminController.js';

const app = express();
app.use(cors())
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
    name : 'codeil',
    secret : 'something',
    resave :false,
    saveUninitialized: true,
    cookie : {
            maxAge:(1000 * 60 * 100)
    }      
}));

app.use("/", UsersController);
app.use("/", clientController);
app.use("/", providerController);
app.use("/", productController);
app.use("/", adminController);



app.listen(8008, () =>{})