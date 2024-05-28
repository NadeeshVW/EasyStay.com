//created a middleware

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

//used to extend the express request type
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

//middlewe function passes 3 para

const verifyToken = (req: Request, res: Response, next : NextFunction) => {
    const token = req.cookies["auth_token"];  //access object on basis of key thats y []
    if(!token){
        return res.status(401).json({ message: "unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);   //verify he cookie with jwt secret key
        req.userId= (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "unauthorized" });
    }
};

export default verifyToken;