import sequelize, { Sequelize } from 'sequelize';

var db = 'empresa'

const connect = new Sequelize(`${db}`, 'root', 'rootroot', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
    logging: false
})

connect.authenticate().then(() => {
    console.log(`Conectado ao banco ${db}`);
}).catch((msgErr) => {
    console.log("Unable to connect to the database:", msgErr);
});

export default connect;