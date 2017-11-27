import jwt from 'jsonwebtoken';

function authJWT(req, res, next) {
    const token = req.headers['x-access-token'] || '';
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.status(404).json({
                code: 404,
                message: 'Not Found',
                data: 'Not authorized'
            });
        } else {
            next();
        }
    });
}

export default authJWT;
