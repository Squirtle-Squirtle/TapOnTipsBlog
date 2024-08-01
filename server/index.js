import express from 'express';
import dotenv from 'dotenv'


import connection from './database/db.js';

dotenv.config();

const app=express();

const PORT=8080;

app.listen(PORT,()=>console.log(`Server Running on port Hello ${PORT}`));

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
connection(username,password);