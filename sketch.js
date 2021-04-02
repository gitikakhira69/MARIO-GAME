var mario,mario_running,mario_collide;
var bg,bg_image;
var brickGroup, brickImg;
var coinGroup,coinImg;
var coinScore = 0;
function preload(){
  bg_image = loadImage("images/bgnew.jpg");
  mario_running = loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png",
  "images/mar5.png","images/mar6.png","images/mar7.png");
  brickImg = loadImage("images/brick.png");
  //load coin sound
  coinSound = loadSound("sounds/coinSound.mp3");
  coinImg = loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png",
  "images/con5.png","images/con6.png");   
}

function setup() {
createCanvas(1000, 600);
//backgroung image
bg = createSprite(500,300);
bg.addImage(bg_image);
bg.scale=.5;
bg.velocityX = -6;
//mario
mario = createSprite(200,500,20,20);
mario.addAnimation("running",mario_running);
mario.scale=.3;
//platform
platform = createSprite(200,600,300,10);
//a brick group 
brickGroup = new Group();
// a coin group
coinGroup = new Group();
}

function draw() {
    //gravity to mario
    mario.velocityY = mario.velocityY + 1 ;
    //mario on platform
    mario.collide(platform)
  if(keyDown("space")){
      mario.velocityY  = -5; 
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
//a bug (error)
if(mario.x < 200){
  mario.x = 200;
}
if(mario.y < 50){
  mario.y = 50;
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
    brick.velocityX = -5;
    brickGroup.add(brick);

  }
}
function generateCoin(){
 if(frameCount % 50 === 0){
   var coin = createSprite(1200,random(100,400),40,10);
   coin.addAnimation("coin",coinImg);
   coin.velocityX = -5;
   coin.lifetime = 500;
   coinGroup.add(coin);
   coin.scale = .1;
}
}