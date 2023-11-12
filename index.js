const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
  },
});

let players = [];

// global variables
// let persona;

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  //     console.log(clientID);

  //   Give the newly connected socket
  socket.on("data", (user) => {
    console.log(user)
    players.push(user)
    io.emit("location", players)
  })

  // Messaging
  socket.on("message", (mssgInfo) => {
    console.log("Message from " + mssgInfo.username + ": " + mssgInfo.message);

    io.emit("message", mssgInfo);
  });

  //  Location
  socket.on("location", (user) => {
    // Find the player index instead of using findIndex
  const player = players.find(p => p.username === user.username);

  if (player) {
    // Directly update the player object
    player.x = user.x;
    player.y = user.y; 
    player.z = user.z;
  }

  // Emit the full array instead of just player locations
  io.emit("location", players);
  });

  socket.on("disconnect", (user) => {
    const index = players.findIndex((p) => p.id === socket.id);
    // Remove from the players array
    console.log('Removed player', players[index]);
    
  if(index !== -1) {
    players.splice(index, 1); 
  }
    
//     Update the locations for all players by emitting
    io.emit('location', players)
  });
});

// listening on localhost: 3000
let port = process.env.PORT || 3000;

io.listen(port, () => {
  console.log("server online");
});
