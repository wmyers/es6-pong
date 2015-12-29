import { GameRunner } from '../base/game-runner';
import { initCanvas, createCanvas } from '../base/game-canvas';
import { addListener } from '../base/dom-utils';
import createCourt from './components/court';
import { createBalls } from './components/ball';

let config = {
  width:     640,   // logical canvas width (browser will scale to physical canvas size - which is controlled by @media css queries)
  height:    480,   // logical canvas height (ditto)
  wallWidth: 10,
  balls:     10,
  stats:     true
}

export default function Pong () {
  //dimensions
  let { width, height } = config;

  //canvas
  let frontCanvas  = initCanvas(document.getElementById('game'), width, height)
  let backCanvas   = createCanvas(width, height);
  let front2d      = frontCanvas.getContext('2d');
  let back2d       = backCanvas.getContext('2d');

  //components
  let court  = createCourt(config);
  let balls = createBalls(config);

  //funcs
  const update = function(dt) {
    balls.forEach(ball => ball.update(dt));
  };

  const render = function() {
    back2d.clearRect(0, 0, width, height);

    //cache-draw onto the backCanvas
    court.draw(back2d);
    balls.forEach(ball => ball.draw(back2d));

    //draw from the back to the front
    front2d.clearRect(0, 0, width, height);
    front2d.drawImage(backCanvas, 0, 0);
  };

  //events
  const onkeydown = function(e) {};
  const onkeyup = function(e) {};
  addListener(document, 'keydown', onkeydown.bind(this));
  addListener(document, 'keyup', onkeyup.bind(this));

  //game runner - starts when created
  let runnerCfg = {
    width,
    height,
    slow: 1,
    fps: 60,
    update,
    render,
    fpsmeter: null,
    canvas: frontCanvas
  }
  let runner = GameRunner(runnerCfg);

}
