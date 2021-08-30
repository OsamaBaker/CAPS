'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const connectionToCapsNameSpace=io.connect(`${host}/caps`);

connectionToCapsNameSpace.on('driverPickup',transitPackage);

function transitPackage(payload){

    
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.orderID}`);
    
    connectionToCapsNameSpace.emit('in-transit',payload);
   
}, 1500)};

connectionToCapsNameSpace.on('delivered', deliveredPackage)

function deliveredPackage(payload){
    setTimeout(() => {
        console.log(`DRIVER: Delivered Package ${payload.orderID}`)
        connectionToCapsNameSpace.emit('deliveredPackage', payload)
    }, 3000)
}
