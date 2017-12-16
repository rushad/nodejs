import mongoose from 'mongoose';

export let City;
export let User;
export let Product;
export let Review;

const TITLE_CASE_VALIDATOR = {
    validator: val => /[A-Z][a-z]*/.test(val)
};

const SCHEMAS = {
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

export async function initMongoose() {
    mongoose.Promise = global.Promise;
    const db = await mongoose.createConnection(process.env.MONGOOSE_URI, { useMongoClient: true });
    const options = { 
        timestamps: { 
            createdAt: null,
            updatedAt: 'lastModifiedDate'
        }
    };

    City = db.model('City', mongoose.Schema(SCHEMAS.City, options));
    User = db.model('User', mongoose.Schema(SCHEMAS.User, options));
    Product = db.model('Product', mongoose.Schema(SCHEMAS.Product, options));
}
