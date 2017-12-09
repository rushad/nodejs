import Sequelize from 'sequelize';

let sequelize;

export function initSequelize() {
    return new Promise((resolve, reject) => {
        sequelize = new Sequelize({
            database: 'nodejs',
            username: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            dialect: 'postgres',
            operatorsAliases: false,
            logging: false
        });
        sequelize.authenticate()
            .then(() => {
                console.log('Sequelize: connection established');
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}
