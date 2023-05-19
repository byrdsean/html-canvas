const DEFAULT_HEIGHT = 500;

export function getCanvas2DContext(id) {
  //Get the canvas DOM element, then an object with it's dimensions and position
  const canvas = document.getElementById(id);
  canvas.width = getDimensionOfCanvas(canvas, "width", window.innerWidth);
  canvas.height = getDimensionOfCanvas(canvas, "height", DEFAULT_HEIGHT);

  const ctx = canvas.getContext("2d");
  const boundingClient = canvas.getBoundingClientRect();
  ctx.height = boundingClient.height;
  ctx.width = boundingClient.width;

  return {
    ctx,
    width: boundingClient.width,
    height: boundingClient.height,
    canvasBounding: boundingClient,
  };
}

function getDimensionOfCanvas(canvas, attributeName, defaultValue) {
  //Try to get the dimension specified for the attribute name provided.
  //If unable to, return the default value
  const attributeValue = canvas.getAttribute(attributeName);
  return attributeValue ? +attributeValue.replace(/px/g, "") : defaultValue;
}
