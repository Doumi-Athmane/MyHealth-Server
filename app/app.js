import express from "express";
import bodyParser from "body-parser";
import client from "../config.js";
import usersRoutes from './routes/users.js';

const app = express();

const PORT = 5000;

client.connect();


app.use(bodyParser.json());

app.use('/users', usersRoutes);


app.listen(PORT, () => console.log(`Server running in port : ${PORT}`));