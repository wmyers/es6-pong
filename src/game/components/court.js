export default function createCourt(config) {
  let {
    width, height, wallWidth
  } = config;
  let walls = [];
  walls.push({
    x: 0,
    y: 0,
    width,
    height: wallWidth
  });
  walls.push({
    x: 0,
    y: height - wallWidth,
    width,
    height: wallWidth
  });
  walls.push({
    x: 0,
    y: 0,
    width: wallWidth,
    height
  });
  walls.push({
    x: width - wallWidth,
    y: 0,
    width: wallWidth,
    height
  });

  return {
    draw: function(ctx) {
      ctx.fillStyle = '#F08010';
      walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
      });
    }
  }
}
