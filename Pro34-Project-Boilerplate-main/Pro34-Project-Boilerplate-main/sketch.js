const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;


var rope,ball,con,vel;
var building1,building2,building3;
var bk_img,b_img;
var ground;
var h1,h2,h3;
var sound, hit;
var score;
var damage = random(5,25);

function preload(){
  b_img = loadImage("b1.png");
  bk_img = loadImage("d6f3a1fbde944dd.gif");
  sound = loadSound('AZKU9QC-explosion-boom.mp3')
}
function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  hit = 0;
  score = 0;
  rope = new Rope(8,{x:500,y:200});
  ball = Bodies.circle(100,100,10);
  Matter.Composite.add(rope.body,ball);
  con = new Link(rope,ball);
  ground = Bodies.rectangle(width/2,height,width,1,{isStatic : true});
  building1 = Bodies.rectangle(800,500,130,400);
  building2 = Bodies.rectangle(300,495,140,500);
  building3 = Bodies.rectangle(950,400,140,500);
  World.add(world,ground)
  World.add(world,ball);
  World.add(world,building1);
  World.add(world,building2);
  World.add(world,building3)
  ellipseMode(CENTER);
  imageMode(CENTER)
  h1 = 150;
  h2 = 150;
  h3 = 150;
  vel = 0.00125;
}


function draw() 
{
  background(255);
  image(bk_img,width/2,height/2,width,height);
  Engine.update(engine);
  rope.show();
  fill(0)
  ellipse(ball.position.x,ball.position.y,30,30);
  fill(255)
  strokeWeight(20);
  textAlign(CENTER);
  textSize(100);
  if (building1 == null && building2 == null && building3 == null){
    text("You won",windowWidth/2-150,windowHeight/2-150,300,300);
  }

  if(building1 != null){
    image(b_img,building1.position.x,building1.position.y,130,400);
    var c1 = Matter.SAT.collides(ball,building1)
      if (c1.collided){
        h1 -= damage;
        hit += 1;
      }
      if (h1 < 0 || building1.position.x < 0 || building1.position.x > windowWidth){
        Matter.World.remove(world,building1)
        building1 = null;
      }
  }
  if(building2 != null){
    image(b_img,building2.position.x,building2.position.y,140,500);
    var c2 = Matter.SAT.collides(ball,building2)
      if (c2.collided){
        h2 -= damage;
        hit += 1;
      }
      if (h2 < 0 || building2.position.x < 0 || building2.position.x > windowWidth){
        Matter.World.remove(world,building2);
        building2 = null;
      }
  }
  if(building3 != null){
    image(b_img,building3.position.x,building3.position.y,140,500);
    var c3 = Matter.SAT.collides(ball,building3)
      if (c3.collided){
        h3 -= damage;
        hit += 1;
      }
      if (h3 < 0 || building3.position.x < 0 || building3.position.x > windowWidth){
        Matter.World.remove(world,building3);
        building3 = null;
      }
  }

  if (keyIsDown(LEFT_ARROW)){
		Matter.Body.applyForce(ball,{x:0,y:0},{x:-vel,y:0});
  }
  if (keyIsDown(RIGHT_ARROW)){
		Matter.Body.applyForce(ball,{x:0,y:0},{x:vel,y:0});
  }
  if (keyIsDown(DOWN_ARROW)){
		Matter.Body.applyForce(ball,{x:0,y:0},{x:0,y:vel});
  }
  if (keyIsDown(UP_ARROW)){
		Matter.Body.applyForce(ball,{x:0,y:0},{x:0,y:-vel});
  }
  
  console.log(h1);
  console.log(h2);
  console.log(h3);
  // score = Math.round(450-h1+h2+h3/hit);
}

