class Particle {
  constructor(x_position, y_position, ctx) {
    this.x_position = x_position;
    this.y_position = y_position;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    this.ctx.arc(this.x_position, this.y_position, 10, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }
}

export default Particle;
