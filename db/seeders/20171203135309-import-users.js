require('babel-register');

const Importer = require('../../importer.js');
const importer = new Importer({ path: './data' });

module.exports = {
    up: (queryInterface, Sequelize) => {
        const users = importer.importSync()['users.csv'];
        const now = new Date();
        return queryInterface.bulkInsert('users', users.map(user => ({ 
            ...user,
            gender: user.gender === 'M',
            createdAt: now,
            updatedAt: now
        })), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
