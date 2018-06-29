//let Canvas_Width =  window.innerWidth;
//let Canvas_Height = window.innerHeight;
let Canvas_Width =  800;
let Canvas_Height = 445;

let blackBackground;
let industrialBackground;
let punkBackground;
let BackGround;

let hero;

let all_vehicles = [];
let occupied_vehicle = false;

//TESTING--------------
let humvee_object;

function preload(){
    
    
}


function setup(){
    createCanvas(Canvas_Width, Canvas_Height);
    blackBackground = color(0, 0, 0);
    industrialBackground = new IndustrialBackground();
    punkBackground = new PunkBackground();
    BackGround = punkBackground;
    hero = new Hero();
    
    //TESTING--------------
    humvee_object = new Humvee();
    all_vehicles.push(humvee_object);
}

function draw(){
    background(blackBackground);
    BackGround.run();
    
    //TESTING--------------
    if(hero.occupied_vehicle){
        occupied_vehicle.run_occupied(frameCount);
    } else {
        humvee_object.display();
    }
    hero.run(frameCount);

}

//aim 7 (first time you press space or click)
//death (when you die)
//idle (not moving)
//run (arrow keys)
//shoot (second time space or click)


function keyPressed(){
    if (keyCode === LEFT_ARROW){
        if(!hero.occupied_vehicle){
            hero.action('run_left');
        } else {
            occupied_vehicle.template.x_vel = -occupied_vehicle.template.x_speed;
            occupied_vehicle.template.direction = 'left';
            occupied_vehicle.template.moving = true;
        }
        
    } else if (keyCode === RIGHT_ARROW){
        if(!hero.occupied_vehicle){
            hero.action('run_right');
        } else {
            occupied_vehicle.template.x_vel = occupied_vehicle.template.x_speed;
            occupied_vehicle.template.direction= 'right';
            occupied_vehicle.template.moving = true;
        }
        
    } else if (keyCode === UP_ARROW){
        hero.action('jump');
        
    } else if (keyCode == 32){ //the spacebar
        hero.action('attack');

    } else if (keyCode == 80){ //the 'p' key

    } else if (keyCode == 66){
        hero.action('board');
    }
}

function keyReleased(){
    if (keyCode === LEFT_ARROW){
        if(!hero.occupied_vehicle){
            hero.action('idle');
        } else {
            occupied_vehicle.template.x_vel = 0;
            occupied_vehicle.template.moving = false;
        }
        
    } else if (keyCode === RIGHT_ARROW){
        if(!hero.occupied_vehicle){
            hero.action('idle');
        } else {
            occupied_vehicle.template.x_vel = 0;
            occupied_vehicle.template.moving = false;
        }
        
    } else if (keyCode === UP_ARROW){

    } else if (keyCode == 32){ //the spacebar
        hero.action('aim');

    } else if (keyCode == 80){ //the 'p' key

    } else if (keyCode == 66){ //the 'b' key

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