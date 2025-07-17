import express from 'express';
import dotenv from 'dotenv';
import indexRoute from './routes/indexRoutes';
import mongoose from 'mongoose';
import cors from 'cors';
import { HttpStatus } from './config/httpStatus';

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://second-brain-xi-three.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add preflight handling
app.options('*', cors());

const port = process.env.PORT || 3000;
const DB  = process.env.DB;


app.use('/',indexRoute);
app.get('/health', (req, res)=>{
    try{
        res.status(HttpStatus.SUCCESS).json({
            success: true,
            message: "Server Health Check OK - Second Brain API",
        })
    }catch(error){
        res.status(HttpStatus.INVALID_ACCESS).json({
            success: false,
            message: "Server Health Check Failed - Second Brain API",
        })
    }
})

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