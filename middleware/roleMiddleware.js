import { ErrorHandler } from "../utility/utility.js"


export const isMentor = (req, res, next) => {
    if (req.user.role.includes("MENTOR")) { 
        const role = req.cookies.role
        if (role === "MENTOR") {
            next()
        } else {
            return next(new ErrorHandler("You are not a mentor", 403))
        }
    } else {
        return next(new ErrorHandler("You are not a mentor", 403))
    }
}

export const isFounder = (req, res, next) => {
    if (req.user.role.includes("FOUNDER")) {
        const role = req.cookies.role
        if (role === "FOUNDER") {
            next()
        } else {
            return next(new ErrorHandler("You are not a founder", 403))
        }
    } else {
        return next(new ErrorHandler("You are not a founder", 403))
    }
}


export const isInvestor = (req, res, next) => {
    if (req.user.role.includes("INVESTOR")) {
        const role = req.cookies.role
        if (role === "INVESTOR") {
            next()
        } else {
            return next(new ErrorHandler("You are not an investor", 403))
        }
    } else {
        return next(new ErrorHandler("You are not an investor", 403))
    }
}
