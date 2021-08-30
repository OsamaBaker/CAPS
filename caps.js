'use strict';

const events=require('./events');

require('./delivery/driver/driver'),
require('./delivery/vendor/vendor');

const port = 3000;
const io = require('socket.io')(port);

const caps = io.of('/caps');

io.on('connection', (socket) => {

    caps.on('connection',(socket)=>{
        // console.log('connected to caps namespace');
    
        socket.on('pickup',(payload)=>{
            let Event={
                event:'pickup',
                time:new Date(),
                payload:payload,
            };
            console.log('Event', Event);
                caps.emit('pickup', payload);
        })
    
            socket.on('in-transit',(payload)=>{
                let Event={
                    event:'in-transit',
                    time:new Date(),
                    payload:payload,
                };
                console.log('Event', Event);
                caps.emit('in-transit', payload);
            })
    
            socket.on('delivered',(payload)=>{
                
            let Event={
                event:'delivered',
                time:new Date(),
                payload:payload,
            };
            console.log('Event', Event);
            caps.emit('delivered', payload);
           
    
        
        });
    
    })
})


    module.exports=caps;
    