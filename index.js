// express setup
let express = require('express');
let app = express();

// http setup
const { createServer } = require('node:http');
let server = createServer(app);

// socket.io setup 
const { Server } = require("socket.io");
const io = new Server(server);

// get request for pages
app.use('/', express.static('public/start'));
app.use('/public/main', express.static('public/main'));

// global variables 
// let persona;

io.on("connection", (socket) => {
    console.log('user connected');
    // let clientID = socket.id;
    // console.log(clientID);

    // socket.on('data', (data) => {
    //     console.log(data);
    //     let personaColor = data.color;
    //     let personaName = data.username;
    //     let clientStartID = data.id;


    //     let persona = {
    //         // "id": clientStartID,
    //         "username": personaName,
    //         "color": personaColor
    //     }

    //     io.emit('data', persona);

    //     // console.log(persona);
    // })



    // emiting message to all users and myself
    socket.on('message', (mssgInfo) => {
        console.log('Message from ' + mssgInfo.username + ': ' + mssgInfo.message);

        io.emit('message', mssgInfo);
    })

    //   socket.on('data', (data) => {
    //     console.log(data);
    //     personaColor = data.color;
    //     personaName = data.name;
    //   })

    //   let persona = {
    //     "username": personaName,
    //     "color": personaColor
    //     }

    //     io.emit('data', persona);

    //   socket.on('test', (data) => console.log(data))

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

// listening on localhost: 3000
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Hi gallery!', port);
})