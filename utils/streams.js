const through = require('through2');
const fs = require('fs');
const parseArgs = require('minimist');

function printHelpMessage() {
    console.log('Usage: node streams.js --action=<action> | -a <action> [--file=<file> | -f <file>]');
}

function getParams() {
    const argv = parseArgs(process.argv.slice(2));

    const help = argv.help || argv.h;
    const action = argv.action || argv.a;
    const file = argv.file || argv.f;

    if (help || !action) {
        printHelpMessage();
        process.exit(help ? 0 : 1);
    }

    return { action, file };
}

function inputOutput(filePath) {
    fs.createReadStream(filePath).pipe(process.stdout);
}

function transform() {
    const transformStream = through(function (chunk, encoding, next) {
        this.push(chunk.toString().toLowerCase());
        next();
    });
    process.stdin.pipe(transformStream).pipe(process.stdout);
}

const { action, file } = getParams();
switch(action) {
    case 'io':
        inputOutput(file);
        break;
    case 'transform':
        transform();
        break;
    default:
        console.log('Unknown action:', action);
        break;
}

module.exports.inputOutput = inputOutput;
module.exports.transform = transform;