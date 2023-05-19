import { randomBetweenTwoIntegers } from "./mathUtils.js";

const MAX_SPEED = 2;
const MAX_RADIUS = 5;

class Particle {
  constructor(ctx) {
    this.ctx = ctx;

    this.radius = MAX_RADIUS;
    this.x_position = Math.floor(
      randomBetweenTwoIntegers(this.radius, this.ctx.width - this.radius)
    );
    this.y_position = Math.floor(
      randomBetweenTwoIntegers(this.radius, this.ctx.height - this.radius)
    );

    this.possibleDirections = this.getPossibleDirections();
    this.x_direction = this.getNewDirection();
    this.y_direction = this.getNewDirection();

    this.x_speed = Math.floor(randomBetweenTwoIntegers(1, MAX_SPEED));
    this.y_speed = Math.floor(randomBetweenTwoIntegers(1, MAX_SPEED));
  }

  getXPosition() {
    return this.x_position;
  }

  getYPosition() {
    return this.y_position;
  }

  getPossibleDirections() {
    const directions = [];
    for (let i = -1; i <= 1; i += 0.25) {
      //Do not insert a 0. That means no movement
      if (i === 0) continue;
      directions.push(i);
    }
    return directions;
  }

  getNewDirection() {
    return this.possibleDirections[
      Math.floor(Math.random() * this.possibleDirections.length)
    ];
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
    this.x_position += this.x_direction * this.x_speed;
    this.y_position += this.y_direction * this.y_speed;

    this.x_direction *= this.updateDirection(this.x_position, this.ctx.width);
    this.y_direction *= this.updateDirection(this.y_position, this.ctx.height);
  }

  updateDirection(position, maxSize) {
    const minBound = position <= this.radius;
    const maxBound = maxSize <= position + this.radius;
    return minBound || maxBound ? -1 : 1;
  }
}

export default Particle;
