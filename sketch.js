var step,fwd_x,fwd_y,bodyar,foodar,blockar,nomove,towin,t, speed,score;
var x,y;
var posi = [];
var body = [];
var food = [];
var block = [];
var foodarmax;
var life;

var building = [];
var n,k;

function setup() {
  frameRate(30);
  createCanvas(windowWidth - 20, windowHeight - 40);
  
//ΠΑΡΑΜΕΤΡΟΣ ΠΑΡΑΘΥΡΟΥ
  t =floor(map(width*height,200*200,1000*1000,1,100));
  foodarmax = floor(2*t);
  n=0.3*t;
  step=t*0.25;
  
//ΑΡΧΙΚΟΙ ΠΑΡΑΜΕΤΡΟΙ 
   life = 5;
   towin = 10; 
   bodyar = 40;
  
//ΦΑΓΗΤΟ 
  foodar = foodarmax;
  
//ΦΙΔΙ
   x = width/2;
   y = height/2;
   posi = [x,y];
   fwd_x = 0;
   fwd_y = 0;
  for (var j=0; j<bodyar; j++){
    body.push([x-j*4,y]);
  }
  
//ΚΤΗΡΙΑ
  createBuildings();
  drawBuildings(5);
  for (var i=0; i<foodar; i++){
    let k = random (0,width);
    let l = random (55,height);
     let d = get(k,l);
  if (d[0] < 100 && d[0]>0){
    i--;
  }else{
    food.push([k,l]);
  }
  }

  
  
}

function draw() {
  noStroke();
  frameRate(map(foodar,foodarmax,towin,t*0.2,1.5*t));
  
  background(0,0,0);
  
//ΣΧΕΔΙΑΖΩ ΦΑΓΗΤΟ 
  for (var i=0; i<food.length; i++){
    noStroke();
    fill(238,222,158); 
    rect(food[i][0]-2,food[i][1]-2,4,4);
  
//ΦΙΔΙ ΤΡΩΕΙ ΦΑΓΗΤΟ
    let pv = createVector(posi[0],posi[1]);
    let fv = createVector(food[i][0],food[i][1]);
    if (dist(pv.x,pv.y,fv.x,fv.y)<(step)){
        bodyar++
        food.splice(i,1);
        foodar--
        }
  }
//ΘΕΣΗ ΚΕΦΑΛΙΟΥ
  
   x = x + fwd_x;
   y = y + fwd_y;
   posi = [x,y];
  
  
  strokeWeight(1);
  stroke('white');
  fill("yellow");
  rect(posi[0]-step/2,posi[1]-step/2,step,step);

  
//ΣΩΜΑ ΦΙΔΙΟΥ
  body.splice(0,0,[posi[0],posi[1]]);
  body.splice(bodyar,1);
  
//ΣΧΕΔΙΑΖΩ ΦΙΔΙ
  for (var j=1; j<body.length-1; j++){
    noFill();
    noStroke();
    //stroke('white');
  fill("yellow");
    rect(body[j][0]-step/2,body[j][1]-step/2,step,step);
    if(!((fwd_x==0)&&(fwd_y==0))){
    if((x==body[j+1][0])&&(y==body[j+1][1])){
      restart();
    }
    }
  }
  

//EXTRA
  
//ΧΑΝΕΙ ΖΩΗ ΚΤΗΡΙΑ
  //let c = [x , y];
  if(y+ fwd_y>55){
    
  for (var k=0; k<building.length;k++){
    if((x+step >building[k][0]+step)&&(x+step <building[k][0]+building[k][2]+step)){
      if((y+step >building[k][1]+step)&&(y+step <building[k][1]+building[k][3]+step)){
       restart();
        }
      }
    }
  }
  
//LIFE BAR
  fill(40,40,40,200,200);
  stroke(100,100,100,255);
  rect(0,0,width,50);
  
  
  returnside();
  drawBuildings(step);
  fill('white');
  textSize(20);
  text("Remaining apples: "+ (foodar-towin) ,30,35);
  
  for(var l=0;l<life;l++){
    stroke('black');
    fill('red');
    ellipse((width-life*30)-l*30,28,15,15)
  }
  
//ΤΕΛΟΣ ΠΑΙΧΝΙΔΙΟΥ
  if (foodar == towin){
    textSize(100);
    fill('blue');
  text("You Won",width/2-200,height/2+20);
   fwd_x = 0;
   fwd_y = 0;
    noLoop();
  }else if(life == 0){
    stroke('black');
    fill('red');
    textSize(100);
    text("You Lost",width/2-200,height/2+20);
    score = floor(map(foodar-towin,0,foodarmax-towin,100,0));
    textSize(40);
    text("Score: " + score + "%",width/2-110,height/2+60);
    noLoop();
  }
  
}

function keyPressed() {
  
 if (key === 'ArrowUp'){
    if ((nomove !== 1)){
    //print("up");
      
    fwd_x = 0;
    fwd_y = -step;
      
    nomove = 3;
    }
 }else if (key === 'ArrowRight'){
    if ((nomove !== 2)){
    //print("right");
      
    fwd_x = step;
    fwd_y = 0;
      
    nomove = 4;
    }
 }else if (key === 'ArrowDown'){
    if ((nomove !== 3)){
    //print("down");
      
    fwd_x = 0;
    fwd_y = step;
      
    nomove = 1;
    }
 }else if (key === 'ArrowLeft'){
    if ((nomove !== 4)){
    //print("left");
      
    fwd_x = -step;
    fwd_y = 0;
      
    nomove = 2;
    }
   }else if (keyCode === 32){
     fwd_x = 0;
     fwd_y = 0;
 }

}
function returnside(){
  if (x>width){
     x=1;
  }else if(x<0){
    x=width-1;
  }else if(y<50){
    y=height;
  }else if(y>height){
    y=50;
  }
}


function createBuildings(){
  for(var i=0; i<n; i++){
    let w = random(40,150);
    let h = random(40,150);
    let bx = random(10,width-w-10);
    let by = random(60,height-h-10);
    if (!((bx<width/2)&&(bx+w>width/2))){
      if (!((by<height/2)&&(by+h>height/2))){
        building.push ([bx, by , w , h]);
      }else{
        i--;
      }
    }else{
      i--;
    }
    
  }
}
function drawBuildings(step){
  fill(40,40,40,220);
  strokeWeight(step/4);
    stroke('blue');
  for (var k=0; k<building.length;k++){
    rect(building[k][0],building[k][1],building[k][2],building[k][3])
  }
  noStroke();
}


function restart(){
   life--;
        fwd_x = 0;
        fwd_y = 0;
        x = width/2;
        y = height/2;
        nomove=0;
        background(0,0,0);
        background(255,255,255);
        background(0,0,0);
}