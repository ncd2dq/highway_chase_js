//let Canvas_Width =  window.innerWidth;
//let Canvas_Height = window.innerHeight;
let Canvas_Width =  800;
let Canvas_Height = 445;

let blackBackground;
let industrialBackground;
let punkBackground;

let hero;

function preload(){
    
    
}


function setup(){
    createCanvas(Canvas_Width, Canvas_Height);
    blackBackground = color(0, 0, 0);
    industrialBackground = new IndustrialBackground();
    punkBackground = new PunkBackground();
    hero = new Hero();
}

function draw(){
    background(blackBackground);
    //industrialBackground.run();
    punkBackground.run();
    hero.run(frameCount);
    
}