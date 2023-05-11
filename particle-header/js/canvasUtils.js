export function getCanvas2DContext(id) {
  //Get the canvas DOM element, then an object with it's dimensions and position
  const canvas = document.getElementById(id);
  const boundingClient = canvas.getBoundingClientRect();

  const ctx = canvas.getContext("2d");
  ctx.width = boundingClient.width;
  ctx.height = boundingClient.height;

  return { ctx, width: boundingClient.width, height: boundingClient.height };
}
