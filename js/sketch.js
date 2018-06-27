//let Canvas_Width =  window.innerWidth;
//let Canvas_Height = window.innerHeight;
let Canvas_Width =  800;
let Canvas_Height = 445;

let blackBackground;
let industrialBackground;
let punkBackground;
let BackGround;

let hero;

function preload(){
    
    
}


function setup(){
    createCanvas(Canvas_Width, Canvas_Height);
    blackBackground = color(0, 0, 0);
    industrialBackground = new IndustrialBackground();
    punkBackground = new PunkBackground();
    BackGround = punkBackground;
    hero = new Hero();
}

function draw(){
    background(blackBackground);
    BackGround.run();
    hero.run(frameCount);
    
}

//aim 7 (first time you press space or click)
//death (when you die)
//idle (not moving)
//run (arrow keys)
//shoot (second time space or click)


function keyPressed(){
    if (keyCode === LEFT_ARROW){
        hero.action('run_left');
        
    } else if (keyCode === RIGHT_ARROW){
        hero.action('run_right');
        
    } else if (keyCode === UP_ARROW){
        hero.action('jump');
        
    } else if (keyCode == 32){ //the spacebar
        hero.action('attack');

    } else if (keyCode == 80){ //the 'p' key

    }
}

function keyReleased(){
    if (keyCode === LEFT_ARROW){
        hero.action('idle');
        
    } else if (keyCode === RIGHT_ARROW){
        hero.action('idle');
        
    } else if (keyCode === UP_ARROW){

    } else if (keyCode == 32){ //the spacebar
        hero.action('aim');

    } else if (keyCode == 80){ //the 'p' key

    }
    
}

function change_level(){
    if(BackGround == industrialBackground){
        setup();
        BackGround = punkBackground;
        hero = new Hero();
    } else {
        setup();
        BackGround = industrialBackground;
        hero = new Hero();
    }

}

function mousePressed(){
    hero.action('attack');
}

function mouseReleased(){
    hero.action('aim');
}