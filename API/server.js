// import
// const express = require("express")
// after writing tpye: module in package.lson
import express from "express"
import mongoose from "mongoose"
//for access the env files
import dotenv from "dotenv"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import conversationRouter from "./routes/conversation.route.js"
import gigRouter from "./routes/gig.route.js"
import messageRouter from "./routes/message.route.js"
import orderRouter from "./routes/order.route.js"
import reviewRouter from "./routes/review.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();
dotenv.config();
// mongoose.set("strictQuery", true)

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB...")

    } catch (error) {
        console.log(error)
        handleError(error);
    }
};

app.listen(8800, () => {
    connect();
    console.log("Backend Server is Running...")
})

//for cors library we faced this in client side in login
app.use(cors({origin:"http://localhost:3000", credentials: true}))
// if we dont use thunder client will give an error message
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/orders", orderRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);
app.use("/api/reviews", reviewRouter);

//creating another middleware for errors and status codes
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;      //if any err status send that else send 500
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
})


