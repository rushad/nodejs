import express from 'express';
import models from '../../db/models';

const router = express.Router();

router.get('/', function(req, res) {
    models.user.findAll()
        .then((users) => res.json(users))
        .catch((error) => res.status(404).json(error));
});

module.exports = router;
