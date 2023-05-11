import { randomBetweenTwoIntegers } from "./mathUtils.js";

class Particle {
  constructor(ctx) {
    this.ctx = ctx;

    this.radius = 20;
    this.setXYPos();

    this.x_direction = this.getDirection();
    this.y_direction = this.getDirection();
  }

  getDirection() {
    const directions = [-1, -0.75, -0.5, -0.25, 0.25, 0.5, 0.75, 1];
    return directions[Math.floor(Math.random() * directions.length)];
  }

  setXYPos() {
    do {
      this.x_position = Math.floor(Math.random() * this.ctx.width);
    } while (this.x_position <= 0);
    do {
      this.y_position = Math.floor(Math.random() * this.ctx.height);
    } while (this.y_position <= 0);

    const x_rightBound = this.x_position + this.radius;
    if (this.ctx.width < x_rightBound) {
      this.x_position -= x_rightBound - this.ctx.width;
    }

    const y_rightBound = this.y_position + this.radius;
    if (this.ctx.height < y_rightBound) {
      this.y_position -= y_rightBound - this.ctx.height;
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    this.ctx.beginPath();
    this.ctx.arc(this.x_position, this.y_position, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  update() {
    this.x_position += this.x_direction;
    this.y_position += this.y_direction;

    const x_leftBound = this.x_position <= this.radius;
    const x_rightBound = this.ctx.width <= this.x_position + this.radius;
    if (x_leftBound || x_rightBound) this.x_direction *= -1;

    const y_leftBound = this.y_position <= this.radius;
    const y_rightBound = this.ctx.height <= this.y_position + this.radius;
    if (y_leftBound || y_rightBound) this.y_direction *= -1;
  }
}

export default Particle;
