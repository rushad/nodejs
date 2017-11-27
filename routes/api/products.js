import express from 'express';
import { DB } from '../../app';

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.json(DB.products);
});

router.get('/:id', (req, res) => {
    res.json(DB.products.find(product => product.id === req.params.id));
});

router.get('/:id/reviews', (req, res) => {
    res.json(DB.reviews.filter(review => review.productId === req.params.id));
});

router.post('/', (req, res) => {
    DB.products.push(req.body);
    res.json(req.body);
});

module.exports = router;