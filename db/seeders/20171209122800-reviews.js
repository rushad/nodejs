require('babel-register');

const Importer = require('../../importer.js');
const importer = new Importer({ path: './data' });

module.exports = {
    up: (queryInterface, Sequelize) => {
        const reviews = importer.importSync()['reviews.csv'];
        const now = new Date();
        return queryInterface.bulkInsert('reviews', reviews.map(review => ({ 
            ...review,
            createdAt: now,
            updatedAt: now
        })), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('reviews', null, {});
    }
};
