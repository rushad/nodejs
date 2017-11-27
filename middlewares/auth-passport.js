function authPassport(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(404).json({
            code: 404,
            message: 'Not Found',
            data: 'Not authorized'
        });
    }
    next();
}

export default authPassport;
