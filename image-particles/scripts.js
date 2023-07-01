/** @type {HTMLCanvasElement} */
const CANVAS_HEIGHT = 700;
const CANVAS_WIDTH = 700;
const MAX_PARTICLES = 3000;
const MAX_SPEED = 10;
// const MIN_SPEED = 1;
// const RGBA_ARRAY_LENGTH = 4;

const canvas = document.getElementById("canvas");
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

const ctx = canvas.getContext("2d");

const loadImage = (imagePath) => {
  const image = new Image();
  image.src = imagePath;
  return image;
};

// const image = loadImage('../images/megaman.png');
const image = loadImage("../images/square.png");

const drawImage = () => {
  //Draw image and center in canvas
  const x_position = canvas.width / 2 - image.width / 2;
  const y_position = canvas.height / 2 - image.height / 2;
  // ctx.drawImage(image, x_position, y_position, image.width, image.height)
  ctx.drawImage(image, 0, 0, image.width, image.height);
};

class Particle {
  constructor() {
    this.x_position = Math.floor(Math.random() * CANVAS_WIDTH);
    this.y_position = Math.floor(Math.random() * CANVAS_HEIGHT);
    this.color = "white";
    this.radius = 2;
    this.speed = Math.random() * MAX_SPEED;
  }

  draw() {
    //Save the current context settings
    ctx.save();

    //Set the color for this individual particle
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.5;

    //Draw particle
    ctx.beginPath();
    const startAngle = 0;
    const endAngle = Math.PI * 2; //Math.PI is 180 degrees
    ctx.arc(
      this.x_position,
      this.y_position,
      this.radius,
      startAngle,
      endAngle
    );
    ctx.fill();

    //Restore original context settings so it doesn't interfere with other objects using the ctx object
    ctx.restore();
  }

  update() {
    this.y_position += this.speed;
    if (this.y_position > CANVAS_HEIGHT) {
      this.x_position = Math.floor(Math.random() * CANVAS_WIDTH);
      this.y_position = Math.floor(Math.random() * CANVAS_HEIGHT * -1);
    }
  }
}

image.addEventListener("load", () => {
  const particles = [];
  for (let i = 0; i < MAX_PARTICLES; i++) {
    const particle = new Particle();
    particles.push(particle);
  }

  //   drawImage();
  //   const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //   ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const animate = () => {
    //Clear the canvas, and set the global alpha (opacity)
    //This will give the effect of "trails" on the particles.
    ctx.globalAlpha = 0.05;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    particles.forEach((particle) => {
      particle.draw();
      particle.update();
    });

    // drawImage();
    // ctx.globalAlpha = 0.05
    // ctx.fillStyle = 'rgba(0, 0, 0)';
    // ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // drawImage();
    // particles.forEach((particle) => {
    //   particle.draw();
    //   // particle.update();

    //   if (particle.y_position < CANVAS_HEIGHT) {
    //     //Get the rgba data for the image at the particles coordinates
    //     //Use that info to update the particle
    //     const rowLength = CANVAS_HEIGHT * RGBA_ARRAY_LENGTH;
    //     const imageRow = imageData.data.slice(
    //       particle.y_position * rowLength,
    //       particle.y_position * rowLength + rowLength
    //     );
    //     const rgbaData = imageRow.slice(
    //       particle.x_position * RGBA_ARRAY_LENGTH,
    //       particle.x_position * RGBA_ARRAY_LENGTH + RGBA_ARRAY_LENGTH
    //     );

    //     // console.log(`rgba(${rgbaData[0]}, ${rgbaData[1]}, ${rgbaData[2]}, ${rgbaData[3]})`)

    //     particle.update(rgbaData);
    //   } else {
    //     particle.update();
    //   }
    // });
    requestAnimationFrame(animate);
  };
  animate();
});
