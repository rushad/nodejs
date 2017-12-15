import express from 'express';

import { db } from '../../mongodb';

const router = express.Router();

router.get('/random', function(req, res) {
    db.collection('cities').aggregate([{ $sample: { size: 1 } }]).toArray()
        .then((city) => res.json(city))
        .catch((error) => res.status(404).json(error));
});

module.exports = router;
