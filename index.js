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
import linkedinRouter from "./routers/linkdinRouter.js";
import "./controllers/passport-linkedin.js";

const app = express();
connectDB(process.env.MONGO_URI);

app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5500", process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
        httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
    res.send(`<center style="font-size:160%"> <p>This is Home Page </p>
    <p>User is not Logged In</p>
    <img style="cursor:pointer;"  onclick="window.location='/api/v1/linkedin-auth/linkedin'" src="http://www.bkpandey.com/wp-content/uploads/2017/09/linkedinlogin.png"/>
    </center>`);
});

app.use("/api/v1/linkedin-auth", linkedinRouter);
app.use("/api/v1/auth", authRouter);
app.use(errorMiddleware)
swaggerDocs(app);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
