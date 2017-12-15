import { MongoClient } from 'mongodb';

export let db;

export function initMongoDB() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
            if (err) {
                reject(err);
            } else {
                db = database.db('nodejs');
                console.log('MongoDB: connection established', db);
                resolve();
            }
        });
    });
}
