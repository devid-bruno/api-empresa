import Sequelize from 'sequelize';
import connect from '../db/db.js';

const Provider = connect.define('providers', { 
    fornecedor:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nomeProduto:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    quantFornecida:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


//Provider.sync({force: true})

export default Provider;