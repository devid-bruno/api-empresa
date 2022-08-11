import Sequelize from 'sequelize';
import connect from '../db/db.js';

const User = connect.define('user', {
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
    isAdmin: {
        type: Sequelize.BOOLEAN,
        required: true,
        allowNull: false,
        unique: true
    }
})


//User.sync({force: true});

export default User;
