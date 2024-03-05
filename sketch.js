function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noLoop(); 
}

function draw() {
  background(255);
  //drawPolarRombus(30, 100);
  //drawPolarPrism();
  for (let i = 0; i < 10; i++){
    let p = new Prism(100, 100, 100, origin = createVector(100 + i*200, 100 + i*200));
    p.draw();
  }

}

function drawAxes(){
  // draw axis lines
  line(width/2, 0, width/2, height);
  line(0, height/2, width, height/2);
}

class Prism{
  constructor(l, w, h, origin = createVector(width/2, height/2)){
    this.top = polarRhombus(30, 100, origin);
    this.bottom = polarRhombus(30, 100, origin.add(createVector(0, h)));
    this.left = [this.top[0].copy(), this.bottom[0].copy(), this.bottom[3].copy(), this.top[3].copy()];
    this.right = [this.top[0].copy(), this.bottom[0].copy(), this.bottom[1].copy(), this.top[1].copy()];
  }
  draw(){
    drawShape(this.top);
    drawShape(this.left);
    drawShape(this.right);
    
  }

}

function drawShape(pts){
  beginShape();
  for (let p of pts){
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
}

function polarRhombus(a, d, origin = createVector(width/2, height/2)){
  // draw a line that is a degrees from origin
  // and d units long

  let abs_x = cos(a) * d;
  let abs_y = sin(a) * d;
  pts = [
    createVector(0, abs_y), 
    createVector(abs_x, 0),
    createVector(0, -abs_y),
    createVector(-abs_x, 0)
  ]
  for (let p of pts){
    p.add(origin);
  } 
  return pts; 

}

