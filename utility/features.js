import mongoose from "mongoose";

import { v4 as uuid } from "uuid"; // Make sure to install and import uuid
import { v2 as cloudinary } from "cloudinary";
import { getBase64 } from "../lib/helper.js";
import jwt from "jsonwebtoken";




export const connectDB = (url) => {
    mongoose
        .connect(url, { dbName: process.env.NODE_ENV === "development" ? "GRO8_backend" : "GRO8" })
        .then((data) => {
            console.log(`connect to DB : ${data.connection.host}`);
        })
        .catch((err) => {
            console.log(err);
        });
};


export const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.status(code).cookie("authToken", token, cookieOption).json({
        success: true,
        message,
    });
};

export const cookieOption = {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
       // Must be false because localhost is HTTP
   
};


export const setRoleIfOne = (res, user) => {
    return res.status(200).cookie("role", user.role[0], cookieOption).json({
        success: true,
        user: user
    });
}



export const uploadFilesToCloudinary = async (files = []) => {
    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                getBase64(file),
                {
                    resource_type: "auto",
                    public_id: uuid(),
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
        });
    });
    try {
        const results = await Promise.all(uploadPromises);
        const formattedResults = results.map((result) => ({
            public_id: result.public_id,
            url: result.secure_url,
        }));
        return formattedResults;
    } catch (error) {
        throw new Error("error uploading files to cloudinary", error);
    }
};