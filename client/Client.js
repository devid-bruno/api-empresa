import Sequelize from 'sequelize';
import connect from '../db/db.js';

const Client = connect.define('cliente', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nasci: {
        type: Sequelize.DATE,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantPedidos: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//Client.sync({force: true})

export default Client;