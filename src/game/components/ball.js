import { random, randomChoice } from '../../base/game-math';

const ballProto = {
  init: function(config) {
    let {
      width, height, wallWidth
    } = config;

    this.radius = random(5, 30);
    this.minX = wallWidth + this.radius;
    this.minY = wallWidth + this.radius;
    this.maxX = width - wallWidth - this.radius;
    this.maxY = height - wallWidth - this.radius;

    this.x = random(this.minX, this.maxX);
    this.y = random(this.minY, this.maxY);
    this.dx = (this.maxX - this.minX) / (random(1, 10) * randomChoice(1, -1));
    this.dy = (this.maxY - this.minY) / (random(1, 10) * randomChoice(1, -1));

    this.color = "rgb(" + Math.round(random(0, 255)) + ", " + Math.round(random(0, 255)) + ", " + Math.round(random(0, 255)) + ")";
  },

  update: function(dt, leftPaddle, rightPaddle) {
    this.x = this.x + (this.dx * dt);
    this.y = this.y + (this.dy * dt);

    if ((this.dx > 0) && (this.x > this.maxX)) {
      this.x = this.maxX;
      this.dx = -this.dx;
    } else if ((this.dx < 0) && (this.x < this.minX)) {
      this.x = this.minX;
      this.dx = -this.dx;
    }

    if ((this.dy > 0) && (this.y > this.maxY)) {
      this.y = this.maxY;
      this.dy = -this.dy;
    } else if ((this.dy < 0) && (this.y < this.minY)) {
      this.y = this.minY;
      this.dy = -this.dy;
    }
  },

  draw: function(ctx) {
    // let w = h = this.radius * 2;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.closePath();
  }
}

export function createBall(config){
  let ball = Object.create(ballProto);
  ball.init(config);
  return ball;
}

export function createBalls(config) {
  let balls = [],
    n = config.balls;
  while (n--) {
    balls.push(createBall(config));
  }
  return balls;
}
