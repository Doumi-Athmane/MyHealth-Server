import express from "express";
import bodyParser from "body-parser";
import client from "../config.js";
import db from './models/index.js';
import usersRoutes from './routes/users.js';
import hopitalRoutes from './routes/hopital.route.js';
import specialiteRoutes from './routes/specialite.route.js';


const app = express();

const PORT = 5000;

client.connect();
db.sequelize.sync();


app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/hopitals', hopitalRoutes);
app.use('/specialites', specialiteRoutes);




app.listen(PORT, () => console.log(`Server running in port : ${PORT}`));