import express from 'express';
import passport from 'passport';

const router = express.Router();

router.use(express.json());

router.get(
    '/',
    passport.authenticate('facebook')
);

router.get(
    '/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        res.send(`Authorized as ${req.user.username}`);
    }
);

module.exports = router;