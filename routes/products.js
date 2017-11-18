import express from 'express';
import { db } from '../app';

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.json(db.products);
});

router.get('/:id', (req, res) => {
    res.json(db.products.find(product => product.id === req.params.id));
});

router.get('/:id/reviews', (req, res) => {
    res.json(db.reviews.filter(review => review.productId === req.params.id));
});

router.post('/', (req, res) => {
    db.products.push(req.body);
    res.json(req.body);
});

module.exports = router;