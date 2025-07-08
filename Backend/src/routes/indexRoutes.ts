import express from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';
import { AuthMiddleware } from '../middleware/middlleware';
import { getPublicBrain } from '../controller/userController';
const indexRoute = express.Router();


indexRoute.use('/auth', authRoute);
indexRoute.use('/user', AuthMiddleware, userRoute);
indexRoute.get('/brain/:userId', getPublicBrain);

export default indexRoute ;