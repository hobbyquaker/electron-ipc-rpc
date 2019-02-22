# electron-ipc-rpc

[![NPM version](https://badge.fury.io/js/electron-ipc-rpc.svg)](http://badge.fury.io/js/electron-ipc-rpc)
[![dependencies Status](https://david-dm.org/hobbyquaker/electron-ipc-rpc/status.svg)](https://david-dm.org/hobbyquaker/electron-ipc-rpc)
[![Build Status](https://travis-ci.org/hobbyquaker/electron-ipc-rpc.svg?branch=master)](https://travis-ci.org/hobbyquaker/electron-ipc-rpc)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![License][mit-badge]][mit-url]

> Simple and tiny RPC wrapper around electron ipc

#### Why?

I created this module because I wanted a more convenient drop-in replacement for socket.io when porting "classic" web 
apps to electron.


## Usage

#### main

```javascript
const Rpc = require('electron-ipc-rpc');
const rpc = new Rpc(electron.ipcMain, mainWindow.webContents);

rpc.on('method2', (params, callback) => {
    callback(null, 'method2 response!');
});

rpc.send('method1', [], (err, res) => {
    console.log(res); 
});
```

#### renderer

```javascript
const Rpc = require('electron-ipc-rpc');
const rpc = new Rpc(electron.ipcRenderer);

rpc.on('method1', (params, callback) => {
    callback(null, 'method1 response');
});

rpc.send('method2', [], (err, res) => {
    console.log(res); 
});
```

#### Timeout

By default a method call times out after 30s without response. This can be changed by just overwriting `rpc.timeout` 
with the desired millisecond value.

## License

MIT © [Sebastian Raff](https://github.com/hobbyquaker)

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat
[mit-url]: LICENSE
