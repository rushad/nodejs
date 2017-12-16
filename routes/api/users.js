import express from 'express';
import models from '../../db/models';

import { User } from '../../mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
/*  
    models.user.findAll()
        .then((users) => res.json(users))
        .catch((error) => res.status(404).json(error));
*/
    try {
        res.json(await User.find().exec());
    } catch(error) {
        res.status(404).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true, runValidators: true });
        res.json(user);
    } catch (error) {
        res.status(404).json(error);                
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.remove({ _id: req.params.id });
        res.json({});
    } catch (error) {
        res.status(404).json(error);                
    }
});

module.exports = router;
