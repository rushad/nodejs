import app from './app';
import { initSequelize } from './sequelize';
import { initMongoDB } from './mongodb';

(async () => {
    try {
        await initSequelize();
        await initMongoDB();
        const port = process.env.PORT || 8080;
        app.listen(port, () => console.log(`App listening on port ${port}!`));
    } catch(error) {
        console.log('ERROR:', error);
    }
})();
