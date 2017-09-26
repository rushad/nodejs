import fs from 'fs';
import EventEmitter from 'events';

class DirWatcher extends EventEmitter {
    static EVENT_CHANGED = 'dirwatcher:changed';

    isChanged = false;
    timer = null;
    fsWatcher = null;

    watch(path, delay) {
        if (this.timer) {
            throw new Error('DirWatcher is already watching');
        }
        this.timer = setInterval(() => {
            if (this.isChanged) {
                this.isChanged = false;
                this.emit(DirWatcher.EVENT_CHANGED);
            }
        }, delay);
        this.fsWatcher = fs.watch(path, (eventType, filename) => {
            this.isChanged = true;
        });
    }

    unwatch() {
        clearInterval(this.timer);
        this.fsWatcher.close();
        this.timer = null;
        this.fsWatcher = null;
    }
}

module.exports = DirWatcher;