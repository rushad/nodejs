import express from 'express';

import { db } from '../../mongodb';
import { City } from '../../mongoose';

const router = express.Router();

router.get('/random', async (req, res) => {
/*    db.collection('cities').aggregate([{ $sample: { size: 1 } }]).toArray()
        .then((city) => res.json(city))
        .catch((error) => res.status(404).json(error));*/
    try {
        const city = await City.aggregate([{ $sample: { size: 1 } }]).exec();
        res.json(city);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const cities = await City.find().exec();
        res.json(cities);
    } catch (error) {
        res.status(404).json(error);        
    }
});

router.post('/', async (req, res) => {
    try {
        const city = await City.create(req.body);
        res.json(city);
    } catch (error) {
        res.status(404).json(error);                
    }
});

router.put('/:id', async (req, res) => {
    try {
        const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true, runValidators: true });
        res.json(city);
    } catch (error) {
        res.status(404).json(error);                
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await City.remove({ _id: req.params.id });
        res.json({});
    } catch (error) {
        res.status(404).json(error);                
    }
});

module.exports = router;
