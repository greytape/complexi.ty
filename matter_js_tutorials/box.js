function Rectangle(x, y, w, h) {
  var options = {
    friction: 1,
    restitution: 1,
  };
  this.body = Bodies.rectangle(x, y, w, h);
  this.body.friction = 0;
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER); 
    rect(0, 0, this.w, this.h);
    pop();
  }
}