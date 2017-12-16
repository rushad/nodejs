require('dotenv').config();
import Importer from './importer';
import { User, Product, Review, initMongoose } from './mongoose';

(async function () {
    const importer = new Importer({ path: './data' });
    const data = importer.importSync();
    const users = data['users.csv'];
    const products = data['products.csv'];
    const reviews = data['reviews.csv'];

    await initMongoose();

    await User.remove({});
    await User.insertMany(users.map(user => ({
        firstName: user.firstname,
        lastName: user.lastname,
        gender: user.gender === 'M'
    })));

    await Product.remove({});
    await Product.insertMany(products.map(product => ({
        manufacturer: product.manufacturer,
        model: product.model,
        reviews: reviews.filter(review => review.productId === product.id).map(review => review.review)
    })));

    process.exit(0);
})();