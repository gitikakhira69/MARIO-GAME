var mario,mario_running,mario_collide;
var bg,bg_image;
function preload(){
  bg_image = loadImage("images/bgnew.jpg");
  mario_running = loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png",
  "images/mar5.png","images/mar6.png","images/mar7.png");
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
mario.scale=.3;
//platform
platform = createSprite(200,600,300,10);
}

function draw() {
    //gravity to mario
    mario.velocityY = mario.velocityY + 1 ;
    //mario on platform
    mario.collide(platform)
  if(keyDown("space")){
      mario.velocityY  = -5; 
  } 
drawSprites()
}
