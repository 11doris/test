// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/116-lissajous-curve-table

function make2DArray(rows, cols) {
    var arr = new Array(rows); //like arr[]; but with number of columns hardcoded
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(cols);
    }
    return arr;
  }
  
  function resetGraph(rows, cols) {
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          curves[j][i].reset();
        }
      }
  }


  let angle = 0;
  let w = Math.floor((screen.height - 200) / 2);
  let cols;
  let rows;
  let curves;
  let circleColor = 100; // light gray
  let circleDotColor = 'white';

  let p = 3;
  let q = 5;
  

  function setup() {
    console.log(windowWidth, windowHeight)
    createCanvas(2*w, 2*w);
    cols = 1 ;
    rows = 1;
    curves = make2DArray(rows,cols);


    // lissajous parameters from sliders
    var sliderx = document.getElementById("slider-x");
    var output = document.getElementById("value-x");
    output.innerHTML = sliderx.value;
    
    sliderx.oninput = function() {
      output.innerHTML = this.value;
      p = this.value;
      resetGraph(rows, cols);
    }
    var slidery = document.getElementById("slider-y");
    var outputy = document.getElementById("value-y");
    outputy.innerHTML = slidery.value;
    
    slidery.oninput = function() {
      outputy.innerHTML = this.value;
      q = this.value;
      resetGraph(rows, cols);
    } 


    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        curves[j][i] = new Curve();
      }
    }
  }
  
  function draw() {
    background(0);
    let d = w - 0.2 * w;
    let r = d / 2;
      
    // cols
    noFill();
    stroke(255);
    for (let i = 0; i < cols; i++) {

      // top circle
      let cx = w + i * w + w / 2;
      let cy = w / 2;
      strokeWeight(1);
      stroke(circleColor);   
      ellipse(cx, cy, d, d);
      
      
      let x = r * sin(angle * p + 1.5*PI);
      let y = r * cos(angle * p + 1.5*PI);
      strokeWeight(8);
      stroke(circleDotColor);
      point(cx + x, cy + y);

      // vertical line
      stroke(255, 150);
      strokeWeight(1);
      line(cx + x, 0, cx + x, height);
  
      for (let j = 0; j < rows; j++) {
        curves[j][i].setX(cx + x);
      }
    }
  
    // rows
    noFill();
    stroke(255);
    for (let j = 0; j < rows; j++) {

      // left circle
      let cx = w / 2;
      let cy = w + j * w + w / 2;
      strokeWeight(1);
      stroke(circleColor);
      ellipse(cx, cy, d, d);


      let x = r * sin(angle * q + PI);
      let y = r * cos(angle * q + PI);
      strokeWeight(8);
      stroke(circleDotColor);
      point(cx + x, cy + y);

      // horizontal line
      stroke(255, 150);
      strokeWeight(1);
      line(0, cy + y, width, cy + y);
  
      for (let i = 0; i < cols; i++) {
        curves[j][i].setY(cy + y);
      }
    }
  
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        curves[j][i].addPoint();
        curves[j][i].show(color);
      }
    }
  
  
    angle -= 0.01;
  
    if (angle < -TWO_PI) {
      resetGraph(rows, cols);
      // saveFrame("lissajous#####.png");
      angle = 0;
    }
  }