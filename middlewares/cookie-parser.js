function cookieParser(req, res, next) {
    const cookies = (req.headers.cookie || '').split(';').map(cookie => cookie.trim());
    req.parsedCookies = cookies.reduce((parsedCookies, cookie) => {
        const parsedCookie = cookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
        return parsedCookies;
    }, {});
    next();
}

export default cookieParser;