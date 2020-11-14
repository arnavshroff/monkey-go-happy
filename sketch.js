var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running,monkey_collided;
var banana,obstacle;
var bananaImage, obstacleImage;
var bananaG,obstacleG;
var ground,groundI,invisible;
var restart,restartI;
var gameOver,gameOverI;

function preload(){
  
  groundI = loadImage("ground.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadAnimation("sprite_4.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameOverI = loadImage("gameover5.png");
  
  restartI = loadImage("restart.png");
 
}



function setup() {
  
  createCanvas(400,250);
  
  monkey = createSprite(50,200,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.12;
  
  ground = createSprite(200,245,800,20);
  ground.shapeColor = "yellowgreen";
  ground.x = ground.width /2;
  
  gameOver = createSprite(200,120,10,10);
  gameOver.addImage("gameover",gameOverI);
  gameOver.scale = 0.8;
  gameOver.visible = false;
  
  restart = createSprite(370,40,10,10);
  restart.addImage("restart",restartI);
  restart.scale = 0.05;
  restart.visible = false;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true;
  
  bananaG = createGroup();
  obstacleG = createGroup();
  
}


function draw() {
  background("white");
  
  if(gameState === PLAY){
    ground.velocityX = -4;
    
     if (ground.x < 0){
      ground.x = ground.width/2;
    }  
    if(keyDown("space")&& monkey.y >= 190) {
        monkey.velocityY = -15;
    }
  
  banana();
  obstacles();
    
      if(bananaG.isTouching(monkey)){
    bananaG.destroyEach();
  } 

  if(obstacleG.isTouching(monkey)){
    obstacleG.destroyEach();
    bananaG.destroyEach();
    gameState = END;
    
  }
  
  
  
  }
  
  if(gameState === END){
    
  
 
    gameOver.visible = true;
    restart.visible = true;
    monkey.visible = false;
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
     
    obstacleG.setVelocityXEach(0);
    bananaG.setVelocityXEach(0);
    
     if(mousePressedOver(restart)) {
        reset();
    }
   
  }

  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  
  
  drawSprites();
}
function reset (){
    gameState = PLAY;
  monkey.visible = true;
  gameOver.visible = false;
  restart.visible = false;
  
}
function banana(){
  if (frameCount % 80 === 0){
    var  banana = createSprite(400,200,20,20);
    banana.y = Math.round(random(50,140));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 150;
    bananaG.add(banana);
  }
   
}
function obstacles(){
  if (frameCount % 200 === 0){
    var obstacle = createSprite(400,220,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -8;
    obstacle.scale = 0.15;
    ground.depth = obstacle.depth;
    ground.depth = ground.depth+1;
    obstacleG.add(obstacle);
  }
}




