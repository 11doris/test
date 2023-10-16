// Maurer Rose
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/c1-maurer-rose
// https://youtu.be/4uU9lZ-HSqA
// https://editor.p5js.org/codingtrain/sketches/qa7RiptE9

let n = 0;
let d = 0;
let dSlider;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function resetAnimation() { 
  n = 0;
  d = 0;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(15);
  angleMode(DEGREES);
  dSlider = createSlider(1,7,1);
  dSlider.position(50, 100);
  dSlider.changed(resetAnimation); 

  text("Click on the button to " + "reset the animation", 20, 20); 

  resetBtn =  createButton("Reset Animation"); 
  resetBtn.position(30, 40); 
  resetBtn.mousePressed(resetAnimation); 
}

function draw() {
  background(0);
  translate(width/2,height/2);
  stroke(255);

  d = dSlider.value();

  noFill();
  beginShape();
  strokeWeight(1);
  for (let i = 0; i < 361; i++) {
    let k = i * d;
    let r = 150 * sin(n*k);
    let x = r * cos(k);
    let y = r * sin(k);
    vertex(x,y);    
  }
  endShape();

  noFill();
  stroke('orange');
  strokeWeight(4);
  beginShape();
  for (let i = 0; i < 361; i++) {
    let k = i;
    let r = 250 * sin(n*k);
    let x = r * cos(k);
    let y = r * sin(k);
    vertex(x,y);    
  }
  endShape();

  n += 0.001;
  d += 0.005;

  
  
}

