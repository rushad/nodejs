import app from './app';
import { initSequelize } from './sequelize';
import { initMongoDB } from './mongodb';
import { initMongoose } from './mongoose';

(async () => {
    try {
//        await initSequelize();

//        await initMongoDB();
//        console.log('MongoDB: connection established');

        await initMongoose();
        console.log('Mongoose: connection established');

        const port = process.env.PORT || 8080;
        app.listen(port, () => console.log(`App listening on port ${port}`));
    } catch(error) {
        console.log('ERROR:', error);
    }
})();
