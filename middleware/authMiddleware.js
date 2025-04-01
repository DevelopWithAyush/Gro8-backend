import { ErrorHandler, TryCatch } from "../utility/utility.js"; 
import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const isAuthenticated = TryCatch(async (req, res, next) => {
    const { authToken } = req.cookies;
    if (!authToken) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
});

