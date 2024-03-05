function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  drawPolarRombus(30, 100);
  // draw axis lines
  line(width/2, 0, width/2, height);
  line(0, height/2, width, height/2);
}

function drawPolarRombus(a, d, origin = createVector(width/2, height/2)){
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
  for (let [i, p] of pts.entries()){
    np = pts[(i+1) % pts.length];
    line(p.x, p.y, np.x, np.y);
  }


}