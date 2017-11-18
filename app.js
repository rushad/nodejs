import express from 'express';

import Importer from './importer';

import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';

import users from './routes/users';
import products from './routes/products';

export const db = {
    products: [],
    users: [],
    reviews: []
};

const importer = new Importer({
    path: './data',
    callback: (json) => {
        db.products = json['products.csv'];
        db.users = json['users.csv'];
        db.reviews = json['reviews.csv'];
    }
});

const app = express();

app.use(cookieParser, queryParser);

app.use('/api/users', users);
app.use('/api/products', products);

export default app;