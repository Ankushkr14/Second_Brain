import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { HttpStatus } from "../config/httpStatus";

export const AuthMiddleware = async(req: Request, res: Response, next: NextFunction): Promise<any>=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(HttpStatus.WRONG_CREDENTIALS).json({
                success: false,
                message: "Token is missing"
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        req.body.userId = decode;
        next();
    }catch(error){
        res.status(HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "User is not registered"
        })
    }
}