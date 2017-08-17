const events = require('events');
const uuid = require('uuid/v4');

class Rpc extends events.EventEmitter {
    constructor(ipc, client) {
        super();
        this.timeout = 30000;
        this.client = client || ipc;
        this.callbacks = {};
        this.timeouts = {};

        ipc.on('cmd', (event, data) => {
            const [id, cmd, params] = data;
            this.emit(cmd, params, (err, params) => {
                this.client.send('res', [id, params]);
            });
        });

        ipc.on('res', (event, data) => {
            const [id, params] = data;
            if (this.callbacks[id]) {
                clearTimeout(this.timeouts[id]);
                const callback = this.callbacks[id];
                delete this.callbacks[id];
                delete this.timeouts[id];
                callback(null, params);
            }
        });
    }

    send(cmd, params, callback) {
        const id = uuid();

        if (typeof params === 'function') {
            callback = params;
            params = [];
        }

        if (callback) {
            this.callbacks[id] = callback;
            this.timeouts[id] = setTimeout(() => {
                const callback = this.callbacks[id];
                delete this.callbacks[id];
                callback(new Error('timeout'));
            }, this.timeout);
        }

        this.client.send('cmd', [id, cmd, params]);
    }
}

module.exports = Rpc;
