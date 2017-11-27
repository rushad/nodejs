import express from 'express';
import passport from 'passport';

const router = express.Router();

router.use(express.json());

router.post(
    '/',
    passport.authenticate('local'),
    function(req, res) {
        const user = req.user;
        res.json(req.user);
    }
);

module.exports = router;