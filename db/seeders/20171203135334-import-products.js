require('babel-register');

const Importer = require('../../importer.js');
const importer = new Importer({ path: './data' });

module.exports = {
    up: (queryInterface, Sequelize) => {
        const products = importer.importSync()['products.csv'];
        const now = new Date();
        return queryInterface.bulkInsert('products', products.map(product => ({ 
            ...product,
            id: Number(product.id),
            createdAt: now,
            updatedAt: now
        })), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('products', null, {});
    }
};
