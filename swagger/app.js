require('dotenv').config();
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var initMongoose = require('./mongoose').initMongoose;

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

initMongoose()
  .then(function() {
    SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { throw err; }

      // install middleware
      swaggerExpress.register(app);

      var port = process.env.PORT || 8080;
      app.listen(port);

      if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
      }
    });
  })
  .catch(function(error) {
    console.log(error);
  });
