import app from './app';
import { initSequelize } from './sequelize';

(async () => {
    try {
        await initSequelize();
        const port = process.env.PORT || 8080;
        app.listen(port, () => console.log(`App listening on port ${port}!`));
    } catch(error) {
        console.log('ERROR:', error);
    }
})();
