const config = require('./config');
const models = require('./models');

console.log(config.appName);

const user = new models.User();
const product = new models.Product();