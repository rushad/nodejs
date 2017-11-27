import express from 'express';
import { DB } from '../../app';

const router = express.Router();

router.get('/', function(req, res) {
    res.send(DB.users);
});

module.exports = router;