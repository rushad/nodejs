require('http').createServer((req, res) => {
    req.pipe(res);
}).listen(3000);