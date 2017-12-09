import express from 'express';
import models from '../../db/models';

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    models.product.findAll()
        .then((result) => res.json(result))
        .catch((error) => res.status(404).json(error));
});

router.get('/:id', (req, res) => {
    models.product.findOne({
        where: { id: req.params.id }
    })
        .then((result) => res.json(result))
        .catch((error) => res.status(404).json(error));
});

router.get('/:id/reviews', (req, res) => {
    models.review.findAll({
        where: { productId: req.params.id }
    })
        .then((result) => res.json(result))
        .catch((error) => res.status(404).json(error));
});

router.post('/', (req, res) => {
    models.product.create({
        manufacturer: req.body.manufacturer,
        model: req.body.model
    })
        .then((result) => res.json(result))
        .catch((error) => res.status(404).json(error));
});

module.exports = router;