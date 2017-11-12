const http = require('http');
const fs = require('fs');
const through = require('through2');
const split = require('split');

const TEMPLATE_FILE_NAME = 'index.html';
const MESSAGE = 'Hello World';

http.createServer((req, res) => {
/*
    const template = fs.readFileSync(TEMPLATE_FILE_NAME).toString();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(template.replace(/{.*}/, MESSAGE));
*/
    const transformStream = through(function (chunk, encoding, next) {
        this.push(chunk.toString().replace(/{.*}/, MESSAGE));
        next();
    });
    fs.createReadStream(TEMPLATE_FILE_NAME)
        .pipe(split())
        .pipe(transformStream)
        .pipe(res);
}).listen(3000);