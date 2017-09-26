require('babel-register')();

const config = require('./config');
const models = require('./models');

console.log(config.appName);

const user = new models.User();
const product = new models.Product();

const Importer = require('./importer.js');
const importer = new Importer({ path: './data', delay: 1000 });

console.log('Sync:');
try {
    console.log(importer.importSync('./data'));
} catch(error) {
    console.log(error.message);
}

console.log('Async:');
importer.import('./data')
    .then((json) => {
        console.log(json);
    })
    .catch((error) => {
        console.log(error.message);
    });    

