import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";


const app = express();

dotenv.config();

const connect = async () => {
    await mongoose.connect(process.env.MONGODB).then(() => {
        console.log("Connected to DB");
    }).catch((err) => {
        throw err;
    }) 
}

app.listen(process.env.PORT,() => {console.log("App working ...."), connect()})
