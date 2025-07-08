import express from 'express';
import { signin, signup } from '../controller/authController';

const authRoute = express.Router();

authRoute.post('/signin', signin);
authRoute.post('/signup', signup);

export default authRoute;