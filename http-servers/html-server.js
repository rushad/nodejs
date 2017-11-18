const http = require('http');
const fs = require('fs');
const through = require('through2');
const split = require('split');

const TEMPLATE_FILE_NAME = 'index.html';
const MACROS = {
    message: 'Hello World'
};

function resolveMacros(template, macros) {
    let result = template;
    Object.keys(macros).forEach((key) => {
        result = result.replace(new RegExp(`{ *${key} *}`, 'g'), macros[key]);
    });
    return result;
}

http.createServer((req, res) => {
/*
    const template = fs.readFileSync(TEMPLATE_FILE_NAME).toString();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(resolveMacros(template, MACROS));
*/
    const transformStream = through(function (chunk, encoding, next) {
        this.push(resolveMacros(chunk.toString(), MACROS));
        next();
    });
    fs.createReadStream(TEMPLATE_FILE_NAME)
        .pipe(split())
        .pipe(transformStream)
        .pipe(res);
}).listen(3000);