function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  //noFill();
  noLoop(); 
}

function draw() {
  background(255);
  stroke(0);
  isoGrid();

  //drawShape(isoUnit(30, 50, 2));
  // let p = new Prism(50, 100, 50);
  // p.draw();
  // r = rhombus(30, 50);
  //drawShape(r);
  // for (let i = 0; i < 10; i++){
  //   let p = new Prism(100, 100, 100, ogn = createVector(100 + i*200, 100 + i*200));
  //   p.draw();
  // }

}

function drawAxes(){
  // draw axis lines
  line(width/2, 0, width/2, height);
  line(0, height/2, width, height/2);
}

class Prism{
  constructor(l, w, h,  ogn = createVector(width/2, height/2)){
    this.top = rhombus(30, l, ogn);
    this.bottom = rhombus(30, l, ogn.add(createVector(0, h)));
    this.left = [this.top[0].copy(), this.bottom[0].copy(), this.bottom[3].copy(), this.top[3].copy()];
    this.right = [this.top[2].copy(), this.bottom[2].copy(), this.bottom[3].copy(), this.top[3].copy()];
  }
  draw(){
    drawShape(this.top);
    //drawShape(this.left);
    //drawShape(this.right);
    
  }
}

function isoGrid(){
  // draw a grid of isometric lines
  iso = isoUnit(30, 100);
  unit = dimensions(iso);
  for (let i = 0; i < width; i+=unit.x){
    for (let j = 0; j < height; j+=unit.y){
      iso = isoUnit(30, 100, createVector(i, j));
      drawShape(iso);
    }
  }
}

function labelShape(pts){
  for (let i = 0; i < pts.length; i++){
    text(i, pts[i].x, pts[i].y);
  }
}

function drawShape(pts){
  beginShape();
  for (let p of pts){
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
}

// a is the known side (adjascent to angle)
function rhombus(angle, hyp, ogn = createVector(width/2, height/2)){
  // draw a rhombus with an angle a, width and hypotenuse
  console.log(ogn);
  // a is the adjacent side
  a = cos(angle) * hyp;
  // b is the opposite side
  b = sin(angle) * hyp;
  p1 = createVector(0,0).add(ogn);
  p2 = createVector(a, 0).add(ogn);
  p3 = createVector(2 * a, b).add(ogn);
  p4 = createVector(a, b).add(ogn);
  //get distance between p1 and p4
  d = dist(p2.x, p2.y, p3.x, p3.y);
  print(d);
  return [p1, p2, p3, p4];
}

function isoUnit(a, d, ogn = createVector(width/2, height/2)){
  // draw a line that is a degrees from origin
  // and d units long
  let abs_x = cos(a) * d;
  let abs_y = sin(a) * d;
  pts = [
    createVector(0, abs_y*2), 
    createVector(abs_x*2, 0),
    createVector(0, -abs_y ),
    createVector(-abs_x , 0)
  ]
  for (let p of pts){
    p.add(ogn);
  } 
  return pts; 

}

function dimensions(shape){
  // get the dimensions of a shape
  let x = [];
  let y = [];
  for (let p of shape){
    x.push(p.x);
    y.push(p.y);
  }
  return createVector(abs(max(x) - min(x)), abs(max(y) - min(y)));
}

