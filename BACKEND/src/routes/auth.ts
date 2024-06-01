//LOGIN API

import express, {Request, Response} from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import verifyToken from "../middleware/auth";

const router = express.Router();


// /api/auth/login 
router.post("/login",
[ 
    check("email","Email is required").isEmail(),
    check("password","password with 6 or more charcters is required").isLength({min:6,}),

], async(req: Request, res: Response)=>{
    const errors =validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array() })
    }

    //destructuring and extracting specific properties from an object
    const{email, password} = req.body;

    try {
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({message: " Invalid Credentials" });  //json method sets the Content-Type header to application/json automatically
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
        return res.status(400).json({message: " Invalid Credentials" });
        }

        // to verify the identity of the user
        const token = jwt.sign({userId: user.id}, 
            process.env.JWT_SECRET_KEY as string, {
            expiresIn: "30d",
        });

        //to store the JWT on the client-side
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 2592000000,
        });
        res.status(200).json({userId: user._id}) //from mongodb 

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
});

router.get("/validate-token", verifyToken , (req: Request, res: Response) => { //verifytoken will check the http cookie
    res.status(200).send({userId: req.userId})
});

router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.send();
});

export default router;