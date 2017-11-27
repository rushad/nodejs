import express from 'express';

import users from './users';
import products from './products';

const api = express.Router();

api.use('/users', users);
api.use('/products', products);

export default api;
