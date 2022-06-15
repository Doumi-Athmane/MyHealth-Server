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
import frequenceCardiaqueRoutes from './routes/frequanceCardiaque.route.js'
import tensionArterielleRoutes from './routes/tensionArterielle.route.js'
import alerteRoutes from './routes/alerte.route.js'
import hopitalHasSpecialiteRoutes from "./routes/hopitalHasSpecialite.route.js";
import frequanceMakeAlerteRoutes from "./routes/frequanceMakeAlerte.route.js"
import tensionMakeAlerteRoutes from "./routes/tensionArterielle.route.js"
import alertForProcheRoutes from "./routes/alerteForProche.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from "cors"

const app = express();

const PORT = 5000;

client.connect();
db.sequelize.sync();


app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "*")
    next()
})

app.use(cors({
    origin: 'http://localhost:4200'
}))

app.use('/api/users', usersRoutes);
app.use('/api/hopitals', hopitalRoutes);
app.use('/api/specialites', specialiteRoutes);
app.use('/api/medecins', medecinRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/prochesPatient', procheRoutes);
app.use('/api/conseils', conseilRoutes);
app.use('/api/frequanceCardique', frequenceCardiaqueRoutes);
app.use('/api/tensonArterielle', tensionArterielleRoutes);
app.use('/api/alertes', alerteRoutes);
app.use('/api/hopitalHasSpecialite', hopitalHasSpecialiteRoutes)
app.use('/api/frequanceMakeAlerte', frequanceMakeAlerteRoutes);
app.use('/api/tensionMakeAlerte', tensionMakeAlerteRoutes);
app.use('/api/alertForProche', alertForProcheRoutes);
app.use('/api/messages', messageRoutes);

app.use((req, res) => {
    res.send('<h1>Welcome to MyHealth REST API</h1>');
});















app.listen(PORT, () => console.log(`Server running in port : ${PORT}`));