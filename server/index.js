import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connection from './database/db.js';

import Router from './routes/routes.js';

dotenv.config();

const app=express();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',Router);

const PORT=8080;

app.listen(PORT,()=>console.log(`Server Running on port Hello ${PORT}`));

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
connection(username,password); 