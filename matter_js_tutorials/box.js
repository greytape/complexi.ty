function Circle(x, y, r) {
  var options = {
    friction: 0.1,
    restitution: 1,
  };
  this.body = Bodies.circle(x, y, r);
  this.body.friction = 0;
  this.r = r;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER); 
    ellipse(0, 0, this.r * 2);
    pop();
  }
}