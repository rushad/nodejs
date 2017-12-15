import express from 'express';

import users from './users';
import products from './products';
import cities from './cities';

const api = express.Router();

api.use('/users', users);
api.use('/products', products);
api.use('/cities', cities);

export default api;
