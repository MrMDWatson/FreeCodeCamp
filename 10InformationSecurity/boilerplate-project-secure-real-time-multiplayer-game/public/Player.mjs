class Player {
  constructor({x, y, score, id}) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
  }

  movePlayer(dir, speed) {
    if (dir === "Up") {this.y -= speed};
    if (dir === "Left") {this.x -= speed};
    if (dir === "Down") {this.y += speed};
    if (dir === "Right") {this.x += speed};
  }

  collision(item) {
    return this.x + 20 >= item.x && this.x <= item.x + 20 && this.y + 20 >= item.y && this.y <= item.y + 20;
  }

  calculateRank(arr) {

  }
}

export default Player;
