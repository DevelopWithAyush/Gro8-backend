import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { errorMiddleware } from "./utility/utility.js";
import { connectDB } from "./utility/features.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import passport from "passport";
import session from "express-session";
import authRouter from "./routers/authRouter.js";
import { swaggerDocs } from './swagger/swagger.js';
import linkedinRouter from "./routers/linkedinRouter.js";
import mentorRouter from "./routers/mentorRouter.js";


const app = express();
connectDB(process.env.MONGO_URI);

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', process.env.FRONTEND_URL, process.env.BASE_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

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
