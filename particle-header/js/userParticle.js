const MAX_RADIUS = 5;

class UserParticle {
  constructor(ctx, x_position, y_position) {
    this.ctx = ctx;

    this.radius = MAX_RADIUS;
    this.x_position = x_position;
    this.y_position = y_position;
  }

  getXPosition() {
    return this.x_position;
  }

  getYPosition() {
    return this.y_position;
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    this.ctx.beginPath();
    this.ctx.arc(this.x_position, this.y_position, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  update(x_position, y_position) {
    this.x_position = x_position;
    this.y_position = y_position;
  }
}

export default UserParticle;
