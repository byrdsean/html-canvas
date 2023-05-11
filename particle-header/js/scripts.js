import Particle from "./particle.js";
import { getCanvas2DContext } from "./canvasUtils.js";

//Get the canvas data
const { ctx, width, height } = getCanvas2DContext("headerCanvas");

const MAX_PARTICLE = 50;
const allParticles = [];

function animate(timestamp) {
  ctx.clearRect(0, 0, width, height);

  if (allParticles.length < MAX_PARTICLE) {
    const particle = new Particle(ctx);
    allParticles.push(particle);
  }

  allParticles.forEach((particle) => {
    particle.draw();
    particle.update();
  });

  // console.log(timestamp);
  requestAnimationFrame(animate);
}
animate(0);
