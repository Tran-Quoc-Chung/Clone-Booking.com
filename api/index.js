import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';


import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connect DB successfully");
    } catch (error) {
        console.log("Connect DB failed");
    }
};

connect();

mongoose.connection.on("connection", () => {
    console.log("mongoDB connected");
});
mongoose.connection.on("disconnection", () => {
    console.log("mongoDB disconnected");
});

//middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3010', 'http://localhost:3008'],  
    credentials: true,  
  }));

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);

app.use((error,req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack,
    });
});

app.listen(3008, () => {
    console.log("BookingApp's server start on PORT 3008");
});
