import { Request, Response } from "express";
import { signinProfile, signinValidation, signupProfile, signupValidation } from "../middleware/validationMiddleware";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../config/database";
import { ZodError } from "zod";
import { HttpStatus } from "../config/httpStatus";



export const signin = async (req: Request, res: Response): Promise<any>=> {
    try{
        let user: signinProfile = signinValidation.parse(req.body);

        const result = await User.findOne({email: user.email.toLowerCase()});
        if(!result){
            return res.status(HttpStatus.WRONG_CREDENTIALS).json({
                success: false,
                message: "Email not registered"
            })
        }

        const isValid = await bcrypt.compare(user.password, result.password);
        if(!isValid){
            return res.status(HttpStatus.WRONG_CREDENTIALS).json({
                success: false,
                message: "Incorrect Password"
            })
        }
        const token = jwt.sign({id: result._id}, process.env.JWT_SECRET_KEY as string,{
            expiresIn: "7d"
        })


        res.status(HttpStatus.SUCCESS).json({
            success: true,
            message: "Signin Successfully",
            token: token
        })

    }catch(error){
        if(error instanceof ZodError){
            return res.status(HttpStatus.INVALID_INPUT).json({
                success: false,
                message: "Input Invalid",
                error: error.errors
            })
        }

        res.status(HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error"
        })
    }
};

export const signup = async (req:Request, res:Response): Promise<any> => {
    try {
        let user: Omit<signupProfile, "confirmPassword"> = signupValidation.parse(req.body);

        const result = await User.findOne({ email: user.email.toLowerCase() });
        if (result) {
            return res.status(HttpStatus.USER_EXISTS).json({
                success: false,
                message: "User already exists with this email address."
            });
        }

        const hashPassword = await bcrypt.hash(user.password, 12);
        const newUser = await User.create({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email.toLowerCase(),
            password: hashPassword
        })
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "7d"
        })
        res.status(HttpStatus.SUCCESS).json({
            success: true,
            message: "User registered successfully.",
            token: token
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(HttpStatus.INVALID_INPUT).json({
                success: false,
                message: "Input error",
            });
        }
        res.status(HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Server error",
            error: error,
        });
    }
};