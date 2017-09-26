import fs from 'fs';
import parseSync from 'csv-parse/lib/sync';
import parse from 'csv-parse';

import DirWatcher from './dirwatcher';

class Importer {
    static PARSE_OPTIONS = {
        columns: true
    };

    constructor(options) {
        this.path = (options || {}).path || './data';
        this.dirWatcher = new DirWatcher();
        this.dirWatcher.watch(this.path, (options || {}).delay || 1000);
        this.dirWatcher.on(DirWatcher.EVENT_CHANGED, () => {
            console.log('Directory changed');
            console.log('Sync:');
            try {
                console.log(this.importSync(this.path));
            } catch(error) {
                console.log(error.message);
            }
            console.log('Async:');
            this.import(this.path)
                .then((json) => {
                    console.log(json);
                })
                .catch((error) => {
                    console.log(error.message);
                });    
        });
    }

    importSync(path) {
        const filenames = fs.readdirSync(path);
        return fs.readdirSync(path).reduce((result, filename) => {
            const json = this._importFileSync(`${path}/${filename}`);
            return {
                ...result,
                [filename]: json
            };
        }, {});
    }

    import(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, filenames) => {
                if (err) {
                    reject(err);
                    return;
                }
                let result = {};
                filenames.reduce((promise, filename) =>
                    promise.then(() => {
                        return this._importFile(`${path}/${filename}`)
                            .then((json) => {
                                result[filename] = json;
                            });
                    }), Promise.resolve()
                )
                    .then(() => { resolve(result); })
                    .catch((error) => { reject(error); });
            });
        });
    }

    _importFileSync(filename) {
        return parseSync(fs.readFileSync(filename), Importer.PARSE_OPTIONS);
    }

    _importFile(filename) {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, (err, csv) => {
                if (err) {
                    reject(err);
                    return;
                }
                parse(csv, Importer.PARSE_OPTIONS, (err, json) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(json);
                });
            });
        });
    }
}

module.exports = Importer;