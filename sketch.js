//Create variables here
var dog;
var foodS;
var foodStock;
var database;
var haapyDog;
function preload()
{
  //load images here
  dogImage = loadImage("images/Dog.png");
  happyDogImage = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);
  
  //Creation of the dog.
  dog = createSprite(250,400,30,30);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
background("#1E8E3E")
textSize(18)
fill("yellow")
text("Press the UP Arrow Key to feed the dog and make it happy!",10,20);

textSize(19)
fill("yellow")
text("Food:"+foodS,250,250);

if(keyDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImage)
}
if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImage)
}

  drawSprites();

  //add styles here

}

function readStock(data){
foodS = data.val();
console.log(foodS)
}

function writeStock(x){
  if(x<=1){
    x = 0;
  }else {
  x = x-1;
 } 
database.ref('/').update({
  Food:x
})
}