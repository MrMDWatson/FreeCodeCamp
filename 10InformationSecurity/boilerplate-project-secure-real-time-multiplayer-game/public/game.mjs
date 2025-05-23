import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let players = {};
let collectible;
let speed;

socket.on("init", (data) => {
    speed = data.speed;
    collectible = new Collectible(data.collectible);
    let playerArr = data.players;
    for (let player in playerArr) {
        console.log("Init players " + player);
        players[player] = new Player({
            x: playerArr[player].x,
            y: playerArr[player].y,
            score: playerArr[player].score,
            id: playerArr[player].id
        });
    }
    drawGame();    
});

socket.on("playerJoined", (data) => {
    players[data.id] = new Player({
        x: data.x,
        y: data.y,
        score: data.score,
        id: data.id
    });
    drawGame();
});
            
socket.on("update", (data) => {
    players[data.id].x = data.x;
    players[data.id].y = data.y
    players[data.id].score = data.score;
    drawGame();
});

socket.on("newItem", (data) => {
    collectible = new Collectible(data);
    drawGame();
});

socket.on("playerLeft", (data) => {
    delete players[data];
    drawGame();
});

function drawGame() {
    let playerArr = [];
    for (const player in players) {
        playerArr.push(players[player]);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Arial";
    ctx.fontStyle = "Green";
    ctx.fillText(players[socket.id].calculateRank(playerArr), 40, 30);
    ctx.font = "20px Arial";
    ctx.fontStyle = "Green";
    ctx.fillText(players[socket.id].score, 600, 30);
    ctx.fillStyle = "Red";
    ctx.fillRect(collectible.x, collectible.y, 20, 20);
    ctx.fillStyle = "white";
    playerArr.forEach((player) => ctx.fillRect(player.x, player.y, 20, 20));
}

function updatePlayer(move) {
    console.log("Socket id " + socket.id);
    players[socket.id].movePlayer(move, speed);
    let collision = players[socket.id].collision(collectible);
    if (collision) {players[socket.id].score += collectible.value;}
    socket.emit("move", {
        id: socket.id,
        x: players[socket.id].x,
        y: players[socket.id].y,
        score: players[socket.id].score,
        collision: collision
    });
    drawGame();
}

document.addEventListener("keydown", (event) => {
    let movement
    if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") movement = "Up";
    if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") movement = "Down";
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") movement = "Left";
    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") movement = "Right";
    updatePlayer(movement);
});