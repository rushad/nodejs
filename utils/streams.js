const through = require('through2');
const fs = require('fs');
const parseArgs = require('minimist');
const split = require('split');
const request = require('request');

const config = require('../config');

function printHelpMessage() {
    console.log('Usage: node streams.js --action=<action> | -a <action> [--file=<file> | -f <file>]');
}

function getParams() {
    const argv = parseArgs(process.argv.slice(2));

    const help = argv.help || argv.h;
    const action = argv.action || argv.a;
    const file = argv.file || argv.f;
    const path = argv.path || argv.p;

    if (help || !action) {
        printHelpMessage();
        process.exit(help ? 0 : 1);
    }

    return { action, file, path };
}

function inputOutput(filePath) {
    fs.createReadStream(filePath).pipe(process.stdout);
}

function transform() {
    const transformStream = through(function (chunk, encoding, next) {
        this.push(chunk.toString().toLowerCase());
        next();
    });
    process.stdin
        .pipe(transformStream)
        .pipe(process.stdout);
}

function transformFile(inputStream, outputStream) {
    let header;
    let lines = 0;
    const transformStream = through(function (chunk, encoding, next) {
        if (!header) {
            header = chunk.toString().split(/, */);
            this.push(`[${config.lineBreak}`);
        } else {
            lines++;
            if (chunk.length > 0) {
                const json = chunk.toString().split(/, */).reduce((res, field, index) => {
                    res[header[index]] = field;
                    return res;
                }, {});
                if (Object.keys(json).length !== header.length) {
                    throw new Error(`Wrong data on the line ${lines + 1}`);
                }
                if (lines > 1)
                    this.push(`,${config.lineBreak}`);
                this.push(`${' '.repeat(config.tabSize)}${JSON.stringify(json)}`);
            }
        }
        next();
    }, function (done) {
        this.push(`${config.lineBreak}]${config.lineBreak}`);
        done();
    });
    inputStream
        .pipe(split())
        .pipe(transformStream)
        .pipe(outputStream);
}

function cssBundler(path) {
    const bundleFileName = `${path}/bundle.css`;
    fs.closeSync(fs.openSync(bundleFileName, 'w'));

    const fileNames = fs.readdirSync(path);
    let promise = Promise.resolve();
    fileNames.forEach((fileName) => {
        if (fileName !== 'bundle.css') {
            promise = promise.then(() => {
                return new Promise((resolve, reject) => {
                    const outputStream = fs.createWriteStream(bundleFileName, { flags: 'a' });
                    const inputStream = fs.createReadStream(`${path}/${fileName}`);
                    inputStream
                        .pipe(split())
                        .pipe(through(
                            function (chunk, encoding, next) {
                                if (chunk.length > 0)
                                    this.push(`${chunk.toString()}${config.lineBreak}`);
                                next();
                            }))
                        .pipe(outputStream);
                    inputStream.on('end', () => { resolve(); })
                    inputStream.on('error', (error) => { reject(error); });
                })
            })
        }
    });
    promise
        .then(() => {
            const outputStream = fs.createWriteStream(bundleFileName, { flags: 'a' });
            request(config.cssUrl).pipe(outputStream);
        })
        .catch((error) => {
            console.log('ERROR', error);
        });
}

const { action, file, path } = getParams();
switch(action) {
    case 'io':
        inputOutput(file);
        break;
    case 'transform':
        transform();
        break;
    case 'transform-file':
        transformFile(
            fs.createReadStream(file),
            process.stdout
        );
        break;
    case 'transform-file-to-file':
        transformFile(
            fs.createReadStream(file),
            fs.createWriteStream(file.replace(/\.[^\.]+$/, '.json'))
        );
        break;
    case 'bundle-css':
        cssBundler(path);
        break;
    default:
        console.log('Unknown action:', action);
        break;
}

module.exports.inputOutput = inputOutput;
module.exports.transform = transform;
module.exports.transformFile = transformFile;
module.exports.cssBundler = cssBundler;
