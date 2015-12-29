//POLYFILL
// adapted from http://paulirish.com/2011/requestanimationframe-for-smart-animating/
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
                                 window.mozRequestAnimationFrame    ||
                                 window.oRequestAnimationFrame      ||
                                 window.msRequestAnimationFrame     ||
                                 ((callback, element) => window.setTimeout(callback, 1000 / 60))
}

//adapted from https://github.com/jakesgordon/javascript-tower-platformer/blob/master/js/common.js
import {timestamp, normalize} from './game-math';

//main game runner
export function GameRunner(cfg) {

  let now,
      dt       = 0,
      last     = timestamp(),
      slow     = cfg.slow || 1, // slow motion scaling factor
      step     = 1/cfg.fps,
      slowStep = slow * step,
      update   = cfg.update,
      render   = cfg.render;
      //currently a module in the global space
      // fpsmeter = new FPSMeter(cfg.fpsmeter || { decimals: 0, graph: true, theme: 'dark', left: '5px' });

  let frame = function() {
    // fpsmeter.tickStart();
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while(dt > slowStep) {
      dt = dt - slowStep;
      update(step);
    }
    render(dt/slow);
    last = now;
    // fpsmeter.tick();
    requestAnimationFrame(frame, cfg.canvas);
  }

  //start
  frame();
};

export function Animator(fps, entity, animation) {
  animation               = animation               || entity.animation;
  entity.animationFrame   = entity.animationFrame   || 0;
  entity.animationCounter = entity.animationCounter || 0;
  if (entity.animation != animation) {
    entity.animation        = animation;
    entity.animationFrame   = 0;
    entity.animationCounter = 0;
  }
  else if (++(entity.animationCounter) == Math.round(fps/animation.fps)) {
    entity.animationFrame   = normalize(entity.animationFrame + 1, 0, entity.animation.frames);
    entity.animationCounter = 0;
  }
}
