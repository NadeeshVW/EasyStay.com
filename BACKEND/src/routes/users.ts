import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();  //new express router

//post function ...register endpoint
// /api/users/register
router.post("/register", 
[
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "password with 6 or more characters is required").isLength({min:6,})
], 
    async (req: Request, res: Response) => {  //express req and res
    const errors = validationResult(req);
    if(!errors.isEmpty()){            //if eror is not empty
        return res.status(400).json({message: errors.array()})  //to frontend
    }
  try {
    let user = await User.findOne({ //check if user exist for the eemail address sent to us
      email: req.body.email, //check the email tht we received in the body of request
    });

    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }

    user = new User(req.body); //it will take the email, firstname, lastname, and password and save it 
    await user.save();

    //token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string, {  //used to encrypt the token 
        expiresIn: "1d"
      }
    );

    res.cookie("auth_token", token,{
        httpOnly: true,                 //http only cookie that can be accessed on web only
        secure: process.env.NODE_ENV === "production",  //conditional
        maxAge: 86400000,      //same as expires in but in miliseconds
    })
    return res.status(200).send({message: "user registered OK"});
  } catch (error) {  //if something goes wrong it will keep it in console and not show to client as it may reveal sensitive information.
    console.log(error);
    res.status(500).send({ messgae: "Something went wrong" });
  }
});
export default router;
