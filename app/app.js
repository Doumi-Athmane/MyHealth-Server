import express from "express";
import bodyParser from "body-parser";
import client from "../config.js";
import db from './models/index.js';
import usersRoutes from './routes/users.js';
import hopitalRoutes from './routes/hopital.route.js';
import specialiteRoutes from './routes/specialite.route.js';
import medecinRoutes from './routes/medecin.route.js';
import patientRoutes from './routes/patient.route.js';
import adminRoutes from './routes/administrateur.route.js'
import procheRoutes from './routes/prochePatient.route.js'
import conseilRoutes from './routes/conseil.route.js'

const app = express();

const PORT = 5000;

client.connect();
db.sequelize.sync();


app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/hopitals', hopitalRoutes);
app.use('/api/specialites', specialiteRoutes);
app.use('/api/medecins', medecinRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/prochePatient', procheRoutes);
app.use('/api/conseils', conseilRoutes);









app.listen(PORT, () => console.log(`Server running in port : ${PORT}`));