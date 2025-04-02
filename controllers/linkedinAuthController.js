import Linkedin from "../model/linkedin.js";
import User from "../model/user.js";
import { getAccessToken, getUserProfile } from "../services/linkedinServices.js";
import { cookieOption, sendToken } from "../utility/features.js";
import { TryCatch } from "../utility/utility.js";
import jwt from "jsonwebtoken";

export const handleLinkedinCallback = TryCatch(async (req, res, next) => {
    const { code } = req.query;
    console.log(code);
    const accessToken = await getAccessToken(code);
    const userInfo = await getUserProfile(accessToken.access_token);

    try {
        const existingUser = await User.findOne({ email: userInfo?.email });

        if (existingUser) {
            // User exists, check for LinkedIn
            const existingLinkedin = await Linkedin.findOne({ userId: existingUser._id });

            if (existingLinkedin) {
                // Update existing LinkedIn info
                existingLinkedin.linkedinId = userInfo.sub;
                existingLinkedin.location = userInfo.locale?.country;
                existingLinkedin.profilePicture = userInfo.picture;
                existingLinkedin.name = userInfo.name;
                existingLinkedin.accessToken = accessToken.access_token;
                await existingLinkedin.save();
                existingUser.linkedin = existingLinkedin._id;
                await existingUser.save();

                const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET);
                return res.status(200)
                    .cookie("authToken", token, cookieOption)
                    .redirect("http://localhost:5173/profile");
            } else {
                // User exists but no LinkedIn - create LinkedIn for existing user
                const linkedin = await Linkedin.create({
                    userId: existingUser._id,
                    linkedinId: userInfo.sub,
                    location: userInfo.locale?.country,
                    name: userInfo.name ? userInfo.name : `${userInfo.given_name} ${userInfo.family_name}`,
                    email: userInfo.email,
                    profilePicture: userInfo.picture,
                    accessToken: accessToken.access_token
                });

                existingUser.linkedin = linkedin._id;
                await existingUser.save();

                const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET);
                return res.status(200)
                    .cookie("authToken", token, cookieOption)
                    .redirect("http://localhost:5173/profile");
            }
        } else {
            // User doesn't exist - create new user and LinkedIn
            const newUser = await User.create({
                email: userInfo.email,
            });

            const linkedin = await Linkedin.create({
                userId: newUser._id,
                linkedinId: userInfo.sub,
                location: userInfo.locale?.country,
                name: userInfo.name ? userInfo.name : `${userInfo.given_name} ${userInfo.family_name}`,
                email: userInfo.email,
                profilePicture: userInfo.picture,
                accessToken: accessToken.access_token
            });

            newUser.linkedin = linkedin._id;
            await newUser.save();

            const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
            return res.status(200)
                .cookie("authToken", token, cookieOption)
                .redirect("http://localhost:5173/profile");
        }
    } catch (error) {
        next(error);
    }
});