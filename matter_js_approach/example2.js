document.addEventListener('DOMContentLoaded', function() {

  var Engine = Matter.Engine;
  var Render = Matter.Render;
  var World = Matter.World;
  var Bodies = Matter.Bodies;

  var engine = Engine.create();

  engine.world.gravity.x = 0;
  engine.world.gravity.y = 0;

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 800,
      height: 400,
      wireframes: false,
    }
  });

  var ballA = Bodies.circle(Math.random() * 800, Math.random() * 400, 20);
  var ballB = Bodies.circle(Math.random() * 800, Math.random() * 400, 20);
  var ground = Bodies.rectangle(400, 400, 810, 40, { isStatic: true });
  var ceiling = Bodies.rectangle(400, 0, 810, 40, { isStatic: true });
  var leftWall = Bodies.rectangle(10, 200, 400, 20, { isStatic: true, angle: Math.PI / 2 });
  var rightWall = Bodies.rectangle(790, 200, 400, 20, { isStatic: true, angle: Math.PI / 2 });

  World.add(engine.world, [ballA, ballB, ground, ceiling, leftWall, rightWall]);

  Engine.run(engine);
  Render.run(render);
});