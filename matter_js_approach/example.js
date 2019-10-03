document.addEventListener('DOMContentLoaded', function () {
  var Engine = Matter.Engine;
  var Render = Matter.Render;
  var World = Matter.World;
  var Bodies = Matter.Bodies;
  var Body = Matter.Body;
  var Events = Matter.Events;
  var Runner = Matter.Runner;
  
  var engine = Engine.create();

  var runner = Runner.create({
    delta: 1000,
  });

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

  var ground = Bodies.rectangle(400, 400, 810, 40, { isStatic: true });
  var ceiling = Bodies.rectangle(400, 0, 810, 40, { isStatic: true });
  var leftWall = Bodies.rectangle(10, 200, 400, 20, { isStatic: true, angle: Math.PI / 2 });
  var rightWall = Bodies.rectangle(790, 200, 400, 20, { isStatic: true, angle: Math.PI / 2 });

  World.add(engine.world, [ground, ceiling, leftWall, rightWall]);

  Engine.run(engine);
  Render.run(render);

  var svg = document.querySelector('svg');
  var startButton = document.querySelector('#start-button');
  var stopButton = document.querySelector('#stop-button');
  let gameSession;
  let currentPlayerManager;

  let Player = {
    addMatterJSBody() {
      this.matterJSBody = Bodies.circle(Math.random() * 600, Math.random() * 300, 10);
      World.add(engine.world, this.matterJSBody);
    },
    calculateMidpoint() {
      let [targetA, targetB] = this.targetedPlayers;
      let midpointX = (targetA.matterJSBody.position.x + targetB.matterJSBody.position.x) / 2;
      let midpointY = (targetA.matterJSBody.position.y + targetB.matterJSBody.position.y) / 2;
      this.currentMidpoint = {
        x: midpointX,
        y: midpointY,
      };
    },
    moveTowardMidPoint() {
      let totalChangeInX = this.currentMidpoint.x - this.matterJSBody.position.x;
      let totalChangeInY = this.currentMidpoint.y - this.matterJSBody.position.y;
      let lengthOfVector = Math.sqrt(totalChangeInX ** 2 + totalChangeInY ** 2);
      let normalizedChangeInX = totalChangeInX / lengthOfVector;
      let normalizedChangeInY = totalChangeInY / lengthOfVector;
      let xVector = normalizedChangeInX * 0.0001;
      let yVector = normalizedChangeInY * 0.0001;
      Body.applyForce(this.matterJSBody, this.matterJSBody.position, { x: xVector, y: yVector });
    },
    targetPlayers() {
      for (idx = 0; idx < 2; idx += 1) {
        let targetedPlayer = currentPlayerManager.players[Math.floor(Math.random() * currentPlayerManager.players.length)];
        this.targetedPlayers.push(targetedPlayer);
      }
    },
    init() {
      this.currentMidpoint = null;
      this.targetedPlayers = [];
      this.addMatterJSBody();
    },
  }

  let playerManager = {
    createPlayers(numberOfNewPlayers) {
      this.players = [];
      for (let idx = 0; idx < numberOfNewPlayers; idx += 1) {
        let newPlayer = Object.create(Player);
        newPlayer.init();
        this.players.push(newPlayer);
      }
    },
    movePlayers() {
      this.players.forEach(player => {
        player.moveTowardMidPoint();
      });
    },
    setPlayerTargets() {
      this.players.forEach(player => {
        player.targetPlayers();
      });
    },
    setPlayerMidpoints() {
      this.players.forEach(player => {
        player.calculateMidpoint();
      });
    },
    init() {
      this.players = [];
    }
  }

  let simManager = {
    run() {
      currentPlayerManager.movePlayers();
      currentPlayerManager.setPlayerTargets();
      currentPlayerManager.setPlayerMidpoints();
    },
    init() {
      currentPlayerManager = Object.create(playerManager);
      currentPlayerManager.createPlayers(10);
      currentPlayerManager.setPlayerTargets();
      currentPlayerManager.setPlayerMidpoints();
    },
  };

  simManager.init();

  startButton.addEventListener('click', function () {
    Runner.run(engine);
    Events.on(engine, "beforeTick", simManager.run);
  });
  stopButton.addEventListener('click', function () {
    Runner.stop(runner);
    Events.off(engine);
  });
});