import express from 'express';
import passport from 'passport';

const router = express.Router();

router.use(express.json());

router.get(
    '/',
    passport.authenticate('google', { scope: 'openid email' })
);

router.get(
    '/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.send(`Authorized as ${req.user.username} (email: ${req.user.email})`);
    }
);

module.exports = router;