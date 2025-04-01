import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/linkedin", passport.authenticate('linkedin', { state: 'SOME STATE' }) ) // initialize the linkedin login

router.get("/linkedin/callback", passport.authenticate('linkedin', {  // this is the endpoint that linkedin will redirect to
    successRedirect: '/login/success',
    failureRedirect: '/'
}))

router.get("/login/success", (req, res) => {  // this is the endpoint that will be called after the linkedin login is successful

    if(req.user){
        res.json({
            success: true,
            message: "success",
            user: req.user
        })
    }else{
        res.json({  // if the user is not found, return a failure message
            success: false,
            message: "failure"
        })
    }
})

router.get("/", (req, res) => {  // this is the endpoint that will be called if the user is not found
    res.json({
        success: false,
        message: "failure"
    })
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})


export default router;