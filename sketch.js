var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOver, restart, gameOverimg, restartimg;

var score;

var PLAY =1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  gameOverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided",trex_collided);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  
  ground = createSprite(200,180,width,20);
  ground.addImage("ground",groundImage);
  //ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(-200,190,width*100,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(trex.x,70,10,10);
  gameOver.addImage(gameOverimg);
  gameOver.scale =0.5;
  gameOver.visible = false;
  
  restart = createSprite(trex.x,90,10,10);
  restart.addImage(restartimg);
  restart.scale = 0.4;
  restart.visible =false;
  
  
  score = 0;
}

function draw() {
  background(255);

  if(score>=100){
    background(130);
  }

  if(score>=200){
    background(255);
  }

  if(score>=300){
    background(130);
  }

  if(score>=400){
    background(255);
  }

  if(score>=500){
    background(130);
  }

  textSize(15);
  fill("black")
  text("Score: "+ score, trex.x+200,50);
  //trex.debug =true;
  text.velocityX=5;
  
  
  if(gameState === PLAY){
  score = score + Math.round(getFrameRate()/60);

  trex.velocityX=5;
  gameOver.velocityX=5;
  restart.velocityX=5;

  if(ground.x<trex.x-300){
    ground.x=trex.x;
  }
  
  //console.log(trex.y);
    ground.velocityX=trex.velocityX-5;
    
  if(keyDown("space")&& trex.y>161) {
    trex.velocityY = -13;
  }
  
  trex.velocityY = trex.velocityY + 0.8;
  camera.position.x = trex.position.x;
  
  // if (ground.x < 0){
  //   ground.x = ground.width/2;
  //}
  spawnClouds();
  spawnObstacles();
    if (trex.isTouching(obstaclesGroup)){
        gameState=END;
        }
  }
  
  if(gameState===END){
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityX=0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    gameOver.velocityX=0;
    restart.velocityX=0;
    
    //change the trex animation
    trex.changeAnimation("trex_collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
       reset();
       }
  }
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var rand = random(trex.position.x+300,trex.position.x+350);
    var cloud = createSprite(rand,120,10,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    //cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    gameOver.depth = trex.depth+2;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var rand1 = random(trex.position.x+300,trex.position.x+360);
    var obstacle = createSprite(rand1,165,10,40);
    //obstacle.velocityX = -4;
    //obstacle.debug=true;
  
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  //ground.velocityX = -4;
  score = 0;
  trex.x=50;
  gameOver.x=trex.x;
  restart.x=trex.x;
  ground.x=200;
}