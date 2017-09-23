require('babel-register')();

const config = require('./config');
const models = require('./models');

console.log(config.appName);

const user = new models.User();
const product = new models.Product();

const DirWatcher = require('./dirwatcher.js');
const dirWatcher = new DirWatcher();
dirWatcher.watch('./data', 1000);