module.exports = (io) => {
  let players = {};
  let collectible = {x: Math.round(Math.random() * 620), y: (Math.round(Math.random() * 430)) + 30, value: 10, id: Math.round(Math.random() * 100000)};
  let collected = 0;
  let speed = 5;
  let topMargin = 30;

  io.on("connection", (socket) => {
    console.log(`Player connected: ${socket.id}`);
    players[socket.id] = { id: socket.id, x: Math.round(Math.random() * 620), y: Math.round(Math.random() * 430) + topMargin, score: 0 };
    socket.emit("init", {collectible: collectible, players: players, speed: speed});
    socket.broadcast.emit("playerJoined", players[socket.id]);

    socket.on("move", (data) => {
      if (players[data.id]) {
        players[data.id].x = data.x;
        players[data.id].y = data.y;
        players[data.id].score = data.score;
        socket.broadcast.emit("update", { x: data.x, y: data.y, score: data.score, id: data.id })
        if (data.collision) {
          collected += 1;
          speed += (.001 * collected);
          collectible = {x: Math.round(Math.random() * 620), y: (Math.round(Math.random() * 430)) + 30, value: 10, id: Math.round(Math.random() * 100000)};
          io.emit("newItem", collectible);
        }
      }
    });  

    socket.on("disconnect", () => {
      console.log(`Player disconnected: ${socket.id}`);
      delete players[socket.id];
      socket.broadcast.emit("playerLeft", socket.id);
    });
  });
  


}