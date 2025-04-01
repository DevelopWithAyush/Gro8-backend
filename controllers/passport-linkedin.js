import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();


passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "/api/v1/linkedin-auth/linkedin/callback",
    scope: ["r_emailaddress", "r_liteprofile"],
},
    function (accessToken, refreshToken, profile, done) {

        process.nextTick(async () => {
            console.log(profile)
           
            return done(null, profile);
        });
     }
   
));


