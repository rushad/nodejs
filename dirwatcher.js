import fs from 'fs';

class DirWatcher {
    watch(path, delay) {
        this.dirStat = this.stat(path);
        this.timer = setInterval(() => {
            const dirStat = this.stat(path);
            if (dirStat !== this.dirStat) {
                console.log('Dir changed', dirStat);
            }
            this.dirStat = dirStat;
        }, delay);
    }

    stat(path) {
        return fs.readdirSync(path).reduce((res, file) => {
            const stat = fs.statSync(`${path}/${file}`);
            return `${res}${file}:${stat.size}:${stat.mtime.getTime()};`;
        }, '');
    }
}

module.exports = DirWatcher;