'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const connectionToCapsNameSpace=io.connect(`${host}/caps`);
const handlers=require('./handlers');

connectionToCapsNameSpace.on('pickup',handlers.transitPackage);