import qs from 'qs';

function queryParser(req, res, next) {
    const indexOfQM = req.url.indexOf('?');
    req.parsedQuery = indexOfQM < 0 ? {} : qs.parse(req.url.substr(indexOfQM + 1));
    next();
}

export default queryParser;