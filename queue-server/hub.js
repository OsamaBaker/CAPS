"use strict";

const port = 3000;
const io = require("socket.io")(port);
const uuid = require('uuid').v4;

const caps = io.of("/caps");

const messagesQueue = {
    orderQueue: {},
}

  caps.on("connection", (socket) => {
    console.log('connected to queue-server');

    socket.on("pickup", (payload) => {
      let Event = {
        event: "pickup",
        time: new Date(),
        payload: payload,
      };
      const id = uuid();
      messagesQueue.orderQueue[id] = payload;
      console.log("Event", Event);
      socket.emit('addedOrderInQueue', payload)
      caps.emit("driverPickup", { id, payload: messagesQueue.orderQueue.id });
    });

    socket.on('getAll', () => {
        console.log('send all orders to driver on connection');
        Object.keys(messagesQueue.orderQueue).forEach(id => {
            socket.emit('driverPickup', { id, payload: messagesQueue.orderQueue[id] })
        })
    })

    socket.on('received', id => {
        delete messagesQueue.orderQueue[id];
    })

    socket.on("in-transit", (payload) => {
      let Event = {
        event: "in-transit",
        time: new Date(),
        payload: payload,
      };
      console.log("Event", Event);
      caps.emit("delivered", payload);
    });

    socket.on("deliveredPackage", (payload) => {
      let Event = {
        event: "deliveredPackage",
        time: new Date(),
        payload: payload,
      };
      console.log("Event", Event);
      caps.emit('ThankYou', payload)
    });
  });


module.exports = caps;
