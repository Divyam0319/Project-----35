var balloon,balloonImage1,balloonImage2,height;
var birdsGroup, birdImage;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");

   birdImage = loadImage("bird.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database()
  createCanvas(1500,700);

  balloon=createSprite(150,490,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.8;

  var balloonPosition=database.ref("balloon/height")
    balloonPosition.on("value",readHeight,showError)


  textSize(20); 

  birdsGroup = createGroup();



}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
   
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    balloon.scale=balloon.scale-0.01
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    balloon.scale=balloon.scale+0.01
  }

  spawnBirds();

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y){
  database.ref("balloon/height").set({
      'x':height.x+x,
      'y':height.y+y
  })

}


function readHeight(data){
  height=data.val()
  balloon.x=height.x;
  balloon.y=height.y;

}

function showError(){
  console.log("ERROR");

}
function spawnBirds() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var bird = createSprite(1550,300,40,10);
    bird.addImage(birdImage)
    bird.y = Math.round(random(10,250))
    bird.scale = 0.4;
    bird.velocityX = -3;
    
    //assign lifetime to the variable
    bird.lifetime = 534;
    
    //adjust the depth
  
    
    //add each cloud to the group
    birdsGroup.add(bird);
    }
}


