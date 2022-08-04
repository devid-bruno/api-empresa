import Sequelize from 'sequelize';
import connect from '../db/db.js';

const Product = connect.define('products', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

//Product.sync({force: true})

export default Product;