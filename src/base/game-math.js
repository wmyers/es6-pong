// MATH UTILITIES
//adapted from https://github.com/jakesgordon/javascript-tower-platformer/blob/master/js/common.js

export function lerp(n, dn, dt) {
  return n + (dn * dt);
}

export function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};

export function bound(x, min, max) {
  return Math.max(min, Math.min(max, x));
};

export function between(n, min, max) {
  return ((n >= min) && (n <= max));
};

export function brighten(hex, percent) {

  var a = Math.round(255 * percent / 100),
    r = a + parseInt(hex.substr(1, 2), 16),
    g = a + parseInt(hex.substr(3, 2), 16),
    b = a + parseInt(hex.substr(5, 2), 16);

  r = r < 255 ? (r < 1 ? 0 : r) : 255;
  g = g < 255 ? (g < 1 ? 0 : g) : 255;
  b = b < 255 ? (b < 1 ? 0 : b) : 255;

  return '#' + (0x1000000 + (r * 0x10000) + (g * 0x100) + b).toString(16).slice(1);
};

export function darken(hex, percent) {
  return brighten(hex, -percent);
};

export function normalize(n, min, max) {
  while (n < min){
    n += (max - min);
  }
  while (n >= max){
    n -= (max - min);
  }
  return n;
};

export function normalizeAngle180(angle) {
  return normalize(angle, -180, 180);
};

export function normalizeAngle360(angle) {
  return normalize(angle, 0, 360);
};

export function random(min, max) {
  return (min + (Math.random() * (max - min)));
};

export function randomInt(min, max) {
  return Math.round(random(min, max));
};

export function randomChoice() {
  return arguments[randomInt(0, arguments.length - 1)];
};
