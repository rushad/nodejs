require('dotenv').config();
import express from 'express';
import session from 'express-session';
import passport from 'passport';

import { Strategy as LocalStrategy } from 'passport-local';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import Importer from './importer';

import authJWT from './middlewares/auth-jwt';
import authPassport from './middlewares/auth-passport';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';

import auth from './routes/auth';
import api from './routes/api';

export const DB = {
    products: [],
    users: [],
    reviews: []
};

const ALLOWED_USERS = {
    rushad: {
        email: 'qwe@asd.zxc',
        password: 'password'
    }
};

const importer = new Importer({
    path: './data',
    callback: (json) => {
        DB.products = json['products.csv'];
        DB.users = json['users.csv'];
        DB.reviews = json['reviews.csv'];
    }
});

export function authenticateUser(username, password) {
    const user = ALLOWED_USERS[username] || {};
    return user.password === password
        ? { username: username, email: user.email }
        : null;
}

const app = express();
app.set('x-powered-by', false);
app.use(cookieParser, queryParser);

// --- configure passport -----------------------
passport.use(new LocalStrategy((username, password, done) => {
    const user = authenticateUser(username, password);
    return done(null, user ? user : false);
}));

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_API_KEY,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: 'http://localhost:8080/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        done(null, { username: profile.displayName, email: profile.emails[0].value });
    }
));

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_API_KEY,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: 'http://localhost:8080/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        done(null, { username: profile.displayName });
    }
));

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// ----------------------------------------------

app.use('/auth', auth);
app.use(
    '/api',
//    authJWT,
    authPassport,
    api
);
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head />
            <body>
                <div>
                    <a href="/auth/google">Sign In with Google</a>
                </div>
                <div>
                    <a href="/auth/facebook">Sign In with Facebook</a>
                </div>
            </body>
        </html>
    `);
});

export default app;