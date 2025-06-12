import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../models/User.js";
import 'dotenv/config';

const router = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {

    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value
    }

    try {
        let user = await User.findOne( { googleId: profile.id } );

        if(user) {
            done(null, user);
        } else {
            user = await User.create(newUser);
            done(null, user);
        }

        console.log("User logged in");
        
    } catch (error) {
        console.log(error)
    }
  }
));

// Google Login route
router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

// Retrieve user data
router.get('/auth/google/callback', 
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    },
    passport.authenticate('google', {
        failureRedirect: '/login-failure',
        session: true,
    }), 
    (req, res) => {
        // Manual redirect after session is safely established
        res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    }
);

// Route if something goes wrong
router.get('/login-failure', (req, res) => {
    res.send('Failed to login');
});

// Destroy user session
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) {
            console.log(error);
            res.send('Error login out')
        } else {
            res.redirect('/');
        }
    })
});



// Persist user data after successful authentication
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Retrieve user data from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (err) {
        console.error("Error deserializing user", err);
        done(err);
    }
});

export default router;