var mongoose = require('mongoose');
var City;
var User;
var Product;

var TITLE_CASE_VALIDATOR = {
    validator: val => /[A-Z][a-z]*/.test(val)
};

var SCHEMAS = {
    City: {
        name: { type: String, required: true, validate: TITLE_CASE_VALIDATOR },
        country: { type: String, required: true, validate: TITLE_CASE_VALIDATOR },
        capital: { type: Boolean, required: true },
        location: {
            lat: { type: Number, min: -90, max: 90 },
            long: { type: Number, min: -180, max: 180 }
        }
    },
    User: {
        firstName: { type: String, required: true, validate: TITLE_CASE_VALIDATOR },
        lastName: { type: String, required: true, validate: TITLE_CASE_VALIDATOR },
        gender: { type: Boolean, required: true }
    },
    Product: {
        manufacturer: { type: String, required: true },
        model: { type: String, required: true },
        reviews: [String]
    }
};

function initMongoose() {
    return new Promise(function (resolve, reject) {
        mongoose.Promise = global.Promise;
        mongoose.createConnection(process.env.MONGOOSE_URI, { useMongoClient: true })
            .then(function(db) {
                var options = { 
                    timestamps: { 
                        createdAt: null,
                        updatedAt: 'lastModifiedDate'
                    }
                };

                City = db.model('City', mongoose.Schema(SCHEMAS.City, options));
                User = db.model('User', mongoose.Schema(SCHEMAS.User, options));
                Product = db.model('Product', mongoose.Schema(SCHEMAS.Product, options));
                resolve();
            })
            .catch(function(error) {
                reject(error);
            });
    });
}

module.exports = {
    initMongoose: initMongoose,
    City: () => City,
    User: () => User,
    Product: () => Product
};