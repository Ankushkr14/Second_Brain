import express from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';
import { AuthMiddleware } from '../middleware/middlleware';
const indexRoute = express.Router();


indexRoute.use('/auth', authRoute);
indexRoute.use('/user', AuthMiddleware, userRoute);

export default indexRoute ;