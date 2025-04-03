import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routers/authRouter.js";
import linkedinRouter from "./routers/linkedinRouter.js";
import mentorRouter from "./routers/mentorRouter.js";
import { swaggerDocs } from './swagger/swagger.js';
import { connectDB } from "./utility/features.js";
import { errorMiddleware } from "./utility/utility.js";
dotenv.config();


const app = express();
connectDB(process.env.MONGO_URI);

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



app.use("/api/v1/linkedin-auth", linkedinRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/mentor", mentorRouter);




app.use(errorMiddleware)
swaggerDocs(app);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
