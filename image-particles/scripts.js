/** @type {HTMLCanvasElement} */
const CANVAS_HEIGHT = 700;
const CANVAS_WIDTH = 700;
const MAX_PARTICLES = 3000;
const MAX_SPEED = 10;
const MIN_SPEED = 1;
const RGBA_ARRAY_LENGTH = 4;
const MAX_BRIGHTNESS = 255;
const PARTICLE_ALPHA = 0.5;

const canvas = document.getElementById("canvas");
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

const ctx = canvas.getContext("2d");

const loadImage = (imagePath) => {
  const image = new Image();
  image.src = imagePath;
  return image;
};

// const image = loadImage("../images/megaman.png");
// const image = loadImage("../images/square.png");
// const image = loadImage("../images/spiderman.jpg");
const image = loadImage("../images/cyberpunk.jpg");

const drawImage = () => {
  //Draw image and center in canvas
  const x_position = canvas.width / 2 - image.width / 2;
  const y_position = canvas.height / 2 - image.height / 2;
  ctx.drawImage(image, x_position, y_position, image.width, image.height);
};

class Particle {
  constructor() {
    this.x_position = Math.floor(Math.random() * CANVAS_WIDTH);
    this.y_position = Math.floor(Math.random() * CANVAS_HEIGHT);
    this.color = "white";
    this.radius = 1;
    this.speed = Math.random() * MAX_SPEED;
    this.alpha = 0;
  }

  draw() {
    //Save the current context settings
    ctx.save();

    //Set the color for this individual particle
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;

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

  update(imageData) {
    let velocity = this.speed;

    //Get the brightness for this position, if any
    const x_coord = Math.floor(this.x_position);
    const y_coord = Math.floor(this.y_position);
    if (imageData && imageData[x_coord] && imageData[x_coord][y_coord]) {
      const brightnessLevel = imageData[x_coord][y_coord] / MAX_BRIGHTNESS;
      const darknessLevel = 1 - brightnessLevel;
      //   velocity = Math.ceil((MAX_SPEED - MIN_SPEED) * darknessLevel + MIN_SPEED);
      velocity = (MAX_SPEED - MIN_SPEED) * darknessLevel + MIN_SPEED;
      this.alpha = brightnessLevel;
    } else {
      this.alpha = 0;
    }

    this.y_position += velocity;
    if (this.y_position > CANVAS_HEIGHT) {
      //Set a random x position so the particle don't appear uniform
      this.x_position = Math.floor(Math.random() * CANVAS_WIDTH);

      //Set canvas height above viewport so that it can move down fluidly
      this.y_position = 0;
    }
  }
}

const getImageBrightnessMap = (imageData) => {
  const brightnessMap = {};
  if (!imageData) return brightnessMap;

  const rowLength = CANVAS_WIDTH * RGBA_ARRAY_LENGTH;
  for (let row = 0; row < CANVAS_HEIGHT; row++) {
    const imageRow = imageData.data.slice(
      row * rowLength,
      row * rowLength + rowLength
    );
    for (let col = 0; col < CANVAS_WIDTH; col++) {
      const rgba = imageRow.slice(
        col * RGBA_ARRAY_LENGTH,
        col * RGBA_ARRAY_LENGTH + RGBA_ARRAY_LENGTH
      );

      const brightness = Math.ceil(
        0.2126 * rgba[0] + 0.7152 * rgba[1] + 0.0722 * rgba[2]
      );
      if (0 < brightness) {
        const brightYMap = {};
        brightYMap[row] = brightness;
        brightnessMap[col] = { ...brightnessMap[col], ...brightYMap };
      }
    }
  }
  return brightnessMap;
};

image.addEventListener("load", () => {
  let particles = [];
  for (let i = 0; i < MAX_PARTICLES; i++) {
    const particle = new Particle();
    particles.push(particle);
  }

  //Draw the image in order to get the image and brightness data
  drawImage();
  const imageData = getImageBrightnessMap(
    ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  );
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const animate = () => {
    //Clear the canvas, and set the global alpha (opacity)
    //This will give the effect of "trails" on the particles.
    //The lower the value, the longer the trail
    ctx.globalAlpha = 0.01;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    particles.forEach((particle) => {
      particle.draw();
      particle.update(imageData);
    });
    requestAnimationFrame(animate);
  };
  animate();
});
