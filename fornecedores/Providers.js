import Sequelize from 'sequelize';
import connect from '../db/db.js';

const Provider = connect.define('fornecedores', {
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
    },
    cnpj:{
        type: Sequelize.STRING,
        allowNull: false
    },
    TipoProvider:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


//Provider.sync({force: true})

export default Provider;