import sequelize, { Sequelize } from 'sequelize';

var db = 'empresa'

const connect = new Sequelize(`${db}`, 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

connect.authenticate().then(() => {
    console.log(`Conectado ao banco ${db}`);
}).catch((msgErr) => {
    console.log("Unable to connect to the database:", msgErr);
});

export default connect;