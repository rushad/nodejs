import express from 'express';
import models from '../../db/models';

import { Product } from '../../mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
/*
    models.product.findAll()
        .then((result) => res.json(result))
        .catch((error) => res.status(404).json(error));
*/
    try {
        const products = await Product.find().select('-reviews').exec();
        res.json(products);
    } catch (error) {
        res.status(404).json(error);
    };
});

router.get('/:id', async (req, res) => {
/*
    models.product.findOne({
        where: { id: req.params.id }
    })
        .then((result) => res.json(result))
        .catch((error) => res.status(404).json(error));
*/
    try {
        const product = await Product.findOne({ _id: req.params.id }).select('-reviews').exec();
        res.json(product);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.get('/:id/reviews', async (req, res) => {
/*
    models.review.findAll({
        where: { productId: req.params.id }
    })
        .then((result) => res.json(result))
        .catch((error) => res.status(404).json(error));
*/
    try {
        const reviews = await Product.findOne({ _id: req.params.id }).select('reviews').exec();
        res.json(reviews);
    } catch (error) {
        res.status(404).json(error);        
    }
});

router.post('/', async (req, res) => {
/*
    models.product.create({
        manufacturer: req.body.manufacturer,
        model: req.body.model
    })
        .then((result) => res.json(result))
        .catch((error) => res.status(404).json(error));
*/
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (error) {
        res.status(404).json(error);                
    }
});

router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true, runValidators: true });
        res.json(product);
    } catch (error) {
        res.status(404).json(error);                
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Product.remove({ _id: req.params.id });
        res.json({});
    } catch (error) {
        res.status(404).json(error);                
    }
});

module.exports = router;