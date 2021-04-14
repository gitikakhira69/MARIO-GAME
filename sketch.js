var mario,mario_running,mario_collide;
var bg,bg_image;
var brickGroup, brickImg;
var coinGroup,coinImg;
var coinScore = 0;
var obsGroups,obs1,obs2;
var turImg,mushImg;
var dieSound;
var marioDead;
var status = "play";
var restartImg,restart;
var level = "easy";
var marioStillImg;

function preload(){
  bg_image = loadImage("images/bgnew.jpg");
  mario_running = loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png",
  "images/mar5.png","images/mar6.png","images/mar7.png");
  brickImg = loadImage("images/brick.png");
  //load coin sound
  coinSound = loadSound("sounds/coinSound.mp3");
  coinImg = loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png",
  "images/con5.png","images/con6.png"); 
  //obstales images
  turImg = loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png",
  "images/tur4.png","images/tur5.png");
  mushImg = loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png",
  "images/mush4.png","images/mush5.png","images/mush6.png");
  dieSound = loadSound("sounds/dieSound.mp3");
  //load dead mario
  marioDead = loadAnimation("images/dead.png");
  //load restart image
  restartImg = loadImage("images/restart.png");
  //mario still image
  marioStillImg = loadAnimation("images/mar1.png");

}

function setup() {
createCanvas(1000, 600);
//backgroung image
bg = createSprite(500,300);
bg.addImage(bg_image);
bg.scale=.5;

//mario
mario = createSprite(200,500,20,20);
mario.addAnimation("running",mario_running);
mario.addAnimation("collide",marioDead);
mario.addAnimation("still",marioStillImg);
mario.scale=.2;
mario.debug = true;

//platform
platform = createSprite(200,600,500,10);
platform.degug = true;
//a brick group 
brickGroup = new Group();
// a coin group
coinGroup = new Group();
//a obstacle group
obsGroups = new Group();
//sprite for restart 
restart = createSprite(500,300);
restart.addImage(restartImg);
}

function draw() {
if(status==="play"){
  //background velocityX
  
  if(level === "difficult"){
    bg.velocityX = -15;
  }
  else{
    bg.velocityX = -6;
  }
  //change mario image
  mario.changeAnimation("running",mario_running);
  //restart sprite invsible
  restart.visible = false;
  //gravity to mario
  mario.velocityY = mario.velocityY + 1 ;
  //mario on platform
  mario.collide(platform)
if(keyDown("space")){
    mario.velocityY  = -5; 
} 
//booster 
if(keyDown("right")){
  level = "difficult";
  brickGroup.destroyEach();
  coinGroup.destroyEach();
  obsGroups.destroyEach();
}
//illusion for background

if(bg.x < 100){
console.log(bg.width,"width of bg")
bg.x = bg.width / 4;

}
// infinte Bricks
getBricks();
// interacting with bricks
for (var i = 0;i<brickGroup.length;i++){
var temp = brickGroup.get(i);
if(temp.isTouching(mario)){
  mario.collide(temp);
}
}
//infinite coins 
generateCoin();
// interacting with coin
for (var i = 0;i<coinGroup.length;i++){
var temp = coinGroup.get(i);
if(temp.isTouching(mario)){
 coinSound.play(); 
 coinScore++;
 temp.destroy();
 temp = null;
}
}
//obstacles
generateObs();
//a bug (error)
if(mario.x < 200){
mario.x = 200;
}
if(mario.y < 50){
mario.y = 50;
}

//load animation for mario dead state
for(var i = 0;i<obsGroups.length;i++){
var temp = obsGroups.get(i);
if(temp.isTouching(mario)){
  status = "end";
  dieSound.play();
}

}

}
else if(status==="end"){
  bg.velocityX = 0;
  mario.velocityX = -5;
  mario.velocityY = 0;
  if(mario.x == 30){
    mario.velocityX = 0;
    mario.changeAnimation("still",marioStillImg);
  }
  
  brickGroup.setVelocityXEach(0);
  coinGroup.setVelocityXEach(0);
  obsGroups.setVelocityXEach(0);
  obsGroups.setLifetimeEach(-2);
  coinGroup.setLifetimeEach(-1);
  brickGroup.setLifetimeEach(-1);
  restart.visible = true;
}
if(mousePressedOver(restart)){
  restartGame();

}




    
drawSprites();
textSize(20);
fill("blue");
text("Coins Collected - "+coinScore,100,100);
}
function getBricks(){
  if(frameCount % 70 === 0){
    var brick = createSprite(1200,random(100,400),40,10);
    brick.lifetime = 250;
    brick.addImage(brickImg);
    brick.scale = .5;
    if(level === "difficult"){
      brick.velocityX = -15;
    }
    else{
      brick.velocityX = -5;
    }
    brickGroup.add(brick);

  }
}
function generateCoin(){
 if(frameCount % 50 === 0){
   var coin = createSprite(1200,random(100,400),40,10);
   coin.addAnimation("coin",coinImg);
   if(level === "difficult"){
     coin.velocityX = -15;
   }
   else {
    coin.velocityX = -5;
   }
   coin.lifetime = 500;
   coinGroup.add(coin);
   coin.scale = .1;
}
}
function generateObs(){
  if(frameCount % 100  === 0){
    var obstacle = createSprite(1200,550);
    obstacle.scale = .1;
    if(level === "difficult"){
      obstacle.velocityX = -15;
    }
    else{
      obstacle.velocityX = -5;
    }
    var ob = Math.round(random(1,2));
    switch(ob){
      case 1:obstacle.addAnimation("Mushroom",mushImg);
      break
      case 2:obstacle.addAnimation("Turtle",turImg);
      break;
      default : 
      break;
    }
    obstacle.lifetime = 250;
    obsGroups.add(obstacle);
  }
}
function restartGame(){
  status = "play";
  obsGroups.destroyEach();
  coinGroup.destroyEach();
  brickGroup.destroyEach();
  coinScore = 0;
  restart.visible = false;

}