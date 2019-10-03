document.addEventListener('DOMContentLoaded', function() {

  var Engine = Matter.Engine;
  var Render = Matter.Render;
  var World = Matter.World;
  var Bodies = Matter.Bodies;
  var Body = Matter.Body;
  var MouseConstraint = Matter.MouseConstraint;
  var Events = Matter.Events;
  var Mouse = Matter.Mouse;

  var engine = Engine.create();

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 800,
      height: 400,
      wireframes: false,
    }
  });

  engine.world.gravity.x = 0;
  engine.world.gravity.y = 0;

  var ballA = Bodies.circle(Math.random() * 600, Math.random() * 300, 20);
  var ballB = Bodies.circle(Math.random() * 600, Math.random() * 300, 20);
  var ground = Bodies.rectangle(400, 400, 810, 40, { isStatic: true });
  var ceiling = Bodies.rectangle(400, 0, 810, 40, { isStatic: true });
  var leftWall = Bodies.rectangle(10, 200, 400, 20, { isStatic: true, angle: Math.PI / 2 });
  var rightWall = Bodies.rectangle(790, 200, 400, 20, { isStatic: true, angle: Math.PI / 2 });

  World.add(engine.world, [ballA, ballB, ground, ceiling, leftWall, rightWall]);

  // Matter.Pairs.clear(engine.pairs);
  console.log(engine);

  var canvasMouse = Mouse.create(render.canvas);
  World.add(engine.world, canvasMouse);

  Mouse.setElement(canvasMouse, render.canvas);

  var mouseInteractivity = MouseConstraint.create(engine, {
    mouse: canvasMouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  });
  World.add(engine.world, mouseInteractivity);
  
  Engine.run(engine);
  Render.run(render);

  function plusOrMinus() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  function randomVector(mag) {
    return { x: (Math.random() * mag * plusOrMinus()), y: (Math.random() * mag * plusOrMinus()) };
  }

  Events.on(mouseInteractivity, 'mousedown', function(event) {
    Body.applyForce(ballA, ballA.position, randomVector(0.05));
    Body.applyForce(ballB, ballB.position, randomVector(0.05));
  }); 

  var Player = ballA
});