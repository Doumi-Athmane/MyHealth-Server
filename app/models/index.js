import { Sequelize } from 'sequelize';
import client from '../../config.js';
import hopital from '../models/hopital.model.mjs'
import specialite from '../models/specialite.model.mjs'


const sequelize = new Sequelize(client.database, client.user, client.password, {
    host: client.host,
    port: client.port,
    dialect: 'postgres',
    /*dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    }*/

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//To test the database connection
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

db.hopital = hopital(sequelize, Sequelize);
db.specialite = specialite(sequelize, Sequelize);


export default db;