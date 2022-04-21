import { Sequelize } from 'sequelize';
import client from '../../config.js';
import hopital from '../models/hopital.model.mjs'
import specialite from '../models/specialite.model.mjs'
import medecin from '../models/medecin.model.mjs'
import patient from '../models/patient.model.mjs'
import admin from '../models/administrateur.model.mjs';
import prochePatient from '../models/prochePatient.model.mjs'
import conseil from '../models/conseil.model.mjs'
import frequanceCardiaque from '../models/frequanceCardiaque.model.mjs'
import tensionArterielle from '../models/tensionArterielle.model.mjs'
import alerte from '../models/alerte.model.mjs'
import hopitalHasSpecialite from './hopitalHasSpecialite.model.mjs';
import frequanceMakeAlerte from './frequanceMakeAlerte.model.mjs';
import tensionMakeAlerte from './tensionMakeAlerte.model.mjs';
import alerteForProche from './alerteForProche.model.mjs';




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
db.medecin = medecin(sequelize, Sequelize);
db.patient = patient(sequelize, Sequelize);
db.admin = admin(sequelize, Sequelize);
db.prochePatient = prochePatient(sequelize, Sequelize)
db.conseil = conseil(sequelize, Sequelize)
db.frequanceCardiaque = frequanceCardiaque(sequelize, Sequelize)
db.tensionArterielle = tensionArterielle(sequelize, Sequelize)
db.alerte = alerte(sequelize, Sequelize)
db.hopitalHasSpecialite = hopitalHasSpecialite(sequelize, Sequelize)
db.frequanceMakeAlerte = frequanceMakeAlerte(sequelize, Sequelize)
db.tensionMakeAlerte = tensionMakeAlerte(sequelize, Sequelize)
db.alerteForProche = alerteForProche(sequelize, Sequelize)


export default db;