//file where server starts

// import dotenv from 'dotenv';
// dotenv.config({ path: '.env.e2e' });


import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config"; // loads the environment variables when the app starts
import mongoose from "mongoose"; //lets us connect to mogoDB
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

mongoose //connect to database//string to tackle undefined return thing
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  

const app = express(); //created new express app
app.use(cookieParser());
app.use(express.json()); //helps convert body of api to json
app.use(express.urlencoded({ extended: true })); //parse the URL to create parameters
app.use(
  cors({
    //prevent certain request from certain url(security)
    origin: process.env.FRONTEND_URL, //server is going to accept request from thi file only
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(8000, () => {
  //start the server
  console.log("server is running on server localhost:8000");
});
