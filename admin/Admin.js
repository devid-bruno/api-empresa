import Sequelize from 'sequelize';
import connect from '../db/db.js';


const Admin = connect.define('admin', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nivel:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Admin.sync({force: true});

export default Admin;