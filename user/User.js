import Sequelize from 'sequelize';
import connect from '../db/db.js';

const User = connect.define('user', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


//User.sync({force: true});

export default User;
