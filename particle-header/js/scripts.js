import Particle from "./particle.js";
import { getCanvas2DContext } from "./canvasUtils.js";

//Get the canvas data
const { ctx, width, height } = getCanvas2DContext("headerCanvas");

const MAX_PARTICLE = 1;
const allParticles = [];

function animate(timestamp) {
  ctx.clearRect(0, 0, width, height);

  if (allParticles.length < MAX_PARTICLE) {
    //Draw a particle in the center of the canvas
    const particle = new Particle(
      Math.floor(width / 2),
      Math.floor(height / 2),
      ctx
    );
    allParticles.push(particle);
  }

  allParticles.forEach((particle) => particle.draw());

  // console.log(timestamp);
  requestAnimationFrame(animate);
}
animate(0);
