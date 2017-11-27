import express from 'express';
import jwt from 'jsonwebtoken';

import { authenticateUser } from '../../app';

const router = express.Router();

router.use(express.json());

router.post('/', function(req, res) {
    const user = authenticateUser(req.body.username, req.body.password);
    if (user) {
        res.json({
            code: 200,
            message: 'OK',
            data: { user },
            token: jwt.sign({ username: req.body.username }, 'secret', { expiresIn: 10 * 60 })
         });
    } else {
        res.status(404).json({
            code: 404,
            message: 'Not Found',
            data: 'Username/password is incorrect'
        });
    }
});

module.exports = router;