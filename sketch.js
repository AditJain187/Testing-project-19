var space,spaceImg;
var spaceship,spaceshipImg;
var meteor,meteorImg;
var gameSound;
var distance;
PLAY = 1;
END = 0;
var gameState = PLAY;

function preload(){
  spaceImg = loadImage("SpaceImage1.gif");
  spaceshipImg = loadAnimation("Spaceship.png");
  meteorImg = loadImage("Meteor.png");
  gameOverImg = loadAnimation("GameOver.png");
  
  //gameSound = loadSound("RunnerGameSound1.mp3");
  
}

function setup() {
  createCanvas(500,500);
  
  space = createSprite(250,250,500,500);
  space.addImage("space",spaceImg);
  space.scale = 2.5;
  space.velocityY = 1;
  
  spaceship = createSprite(250,400,10,10);
  spaceship.addAnimation("spaceship",spaceshipImg);
  //spaceship.addAnimation("gameOver",gameOverImg);
  spaceship.setCollider("circle",0,0,90);
  spaceship.debug = false;
  spaceship.scale = 0.3;
  
  //gameSound.loop();
  
  meteorGroup = createGroup();
  
  distance = 0;
}

function draw() {
  background("black");
  
  if(gameState === PLAY){
    distance = distance + Math.round(getFrameRate()/60);
    
    spaceship.x = World.mouseX;
  
    if(space.y>200){
      space.y = 200;
    }
    
    spawnObstacles();
    
    if(spaceship.isTouching(meteorGroup)){
      gameState === END;
    }  
  }
  
  else if(gameState === END){
        spaceship.addAnimation("spaceship",gameOverImg);
        spaceship.x = 250;
        spaceship.y = 250;
        spaceship.scale = 1;
       }
    
  drawSprites();
  textSize(20);
  fill(225);
  text("distance: "+ distance,370,50);
}

function spawnObstacles(){
  if(frameCount%50 === 0){
    meteor = createSprite(20,20);
    meteor.addImage("meteor",meteorImg);
    meteor.velocityY = 6 + distance/100;
    meteor.x = Math.round(random(50,450));
    meteor.scale = 0.15;
    meteor.lifetime = 800;
    meteorGroup.add(meteor);
    
    meteor.depth = spaceship.depth;
    spaceship.depth = spaceship.depth+1;
  }
}