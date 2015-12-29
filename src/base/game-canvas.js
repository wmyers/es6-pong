// CANVAS UTILITIES
//adapted from https://github.com/jakesgordon/javascript-tower-platformer/blob/master/js/common.js

export function initCanvas(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

export function createCanvas(width, height) {
  return initCanvas(document.createElement('canvas'), width, height);
};

export function renderCanvas(width, height, render, canvas) { // http://kaioa.com/node/103
  canvas = canvas || create(width, height);
  render(canvas.getContext('2d'), width, height);
  return canvas;
};

export function hideCanvasCursor(canvas) {
  canvas.style.cursor = 'none';
};

export function showCanvasCursor(canvas) {
  canvas.style.cursor = 'auto';
};
