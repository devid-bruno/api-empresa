import Sequelize from 'sequelize';
import connect from '../db/db.js';
const Product = connect.define('products', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    preco:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    quantidade:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

//Product.sync({force: true})

export default Product;
