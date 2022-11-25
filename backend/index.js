const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const app = express();

const userRoutes = require("./src/routes/users");
const videoRoutes = require("./src/routes/videos");
const commentRoutes = require("./src/routes/comments");
const authRoutes = require("./src/routes/auth");
const cookieParser = require("cookie-parser");

dotenv.config();

const connect = async () => {
    await mongoose.connect(process.env.MONGODB).then(() => {
        console.log("Connected to DB");
    }).catch((err) => {
        throw err;
    }) 
}

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!!";

    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

app.listen(process.env.PORT,() => {console.log(`App working .... http://localhost:${process.env.PORT}`), connect()})
