import express from 'express';
import { db } from '../app';

const router = express.Router();

router.get('/', function(req, res) {
    res.send(db.users);
});

module.exports = router;