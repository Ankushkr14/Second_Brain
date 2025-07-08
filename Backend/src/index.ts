import express from 'express';
import dotenv from 'dotenv';
import indexRoute from './routes/indexRoutes';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
const DB  = process.env.DB;


app.use('/',indexRoute);

mongoose.connect(`${DB}`)
    .then(()=>{
        console.log("DB is connected");
        app.listen(port, ()=>{
            console.log(`Server is running on port: ${port}`);
        })
    })
    .catch((error)=>{
        console.log("DB error: ",error);
        process.exit(1);
    })