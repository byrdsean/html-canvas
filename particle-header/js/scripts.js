import Particle from "./particle.js";
import UserParticle from "./userParticle.js";
import { getCanvas2DContext } from "./canvasUtils.js";

//Get the canvas data
const { ctx, width, height, canvasBounding } =
  getCanvas2DContext("headerCanvas");

const MAX_PARTICLE = 50;
const MAX_LINE_LENGTH = 100;
const MAX_PARTICLES_DRAW_LINE = 100;
const allParticles = [];
let userParticle = null;

document.addEventListener("mousemove", function (e) {
  const canvasTop = canvasBounding.y;
  const canvasBottom = canvasBounding.y + canvasBounding.height;

  const canvasLeft = canvasBounding.x;
  const canvasRight = canvasBounding.x + canvasBounding.width;

  const mouseOnCanvas =
    canvasTop <= e.clientY &&
    e.clientY <= canvasBottom &&
    canvasLeft <= e.clientX &&
    e.clientX <= canvasRight;

  if (mouseOnCanvas) {
    const particleXCoord = e.clientX - canvasBounding.x;
    const particleYCoord = e.clientY - canvasBounding.y;
    if (userParticle) {
      userParticle.update(particleXCoord, particleYCoord);
    } else {
      userParticle = new UserParticle(ctx, particleXCoord, particleYCoord);
    }
  } else if (userParticle) {
    userParticle = null;
  }
});

function animate(timestamp) {
  ctx.clearRect(0, 0, width, height);

  //Add particles to the array if needed
  while (allParticles.length < MAX_PARTICLE) {
    const particle = new Particle(ctx);
    allParticles.push(particle);
  }

  //Create array of particles to draw lines for. Include the user's particle
  let drawParticleLines = [...allParticles];
  if (userParticle) {
    drawParticleLines.push(userParticle);
    userParticle.draw();
  }

  //Draw the particles
  for (let i = 0; i < allParticles.length; i++) {
    const particle = allParticles[i];
    particle.draw();
    particle.update();

    //Draw a line to every other particle (only if the # of particles doesn't exceed our max limit)
    if (
      MAX_PARTICLES_DRAW_LINE + (userParticle ? 1 : 0) <
      drawParticleLines.length
    )
      continue;
    for (let a = i + 1; a < drawParticleLines.length; a++) {
      const nextParticle = drawParticleLines[a];

      //Calculate length of the line
      const length = Math.floor(
        Math.sqrt(
          Math.pow(
            Math.abs(particle.getXPosition() - nextParticle.getXPosition()),
            2
          ) +
            Math.pow(
              Math.abs(particle.getYPosition() - nextParticle.getYPosition()),
              2
            )
        )
      );

      //Only display line if length is greater than 0 and less than a specific length
      //todo: REFACTOR this code out of the animate() method
      if (0 < length && length <= MAX_LINE_LENGTH) {
        ctx.save();

        //Set the line style and width if drawing lines to the user's particle, or other system particles
        let strokeStyle = `rgba(255, 255, 255, ${
          1 - length / MAX_LINE_LENGTH
        })`;
        if (nextParticle instanceof UserParticle) {
          strokeStyle = "rgba(255, 255, 0, 1)";
          ctx.lineWidth = 2;
        }
        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        // ctx.setLineDash([5, 5]); //Make a dotted line. Arrays contains length of dash, and length of space in between dashses.
        ctx.moveTo(particle.getXPosition(), particle.getYPosition());
        ctx.lineTo(nextParticle.getXPosition(), nextParticle.getYPosition());
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  // console.log(timestamp);
  requestAnimationFrame(animate);
}
animate(0);
