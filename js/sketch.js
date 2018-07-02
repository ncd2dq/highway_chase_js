//let Canvas_Width =  window.innerWidth;
//let Canvas_Height = window.innerHeight;
let Canvas_Width =  800;
let Canvas_Height = 445;

//Load Backgrounds
let blackBackground;
let industrialBackground;
let punkBackground;
let BackGround;

//Instantiate hero
let hero;

//All enemies and vehicles should be in "all_units" except for the occupied vehicle
let all_units = [];
let occupied_vehicle = false;

//TESTING--------------
let humvee_object;
let bike1;
let bike2;
let j;


function preload(){
    
}


function setup(){
    createCanvas(Canvas_Width, Canvas_Height);
    //Black backing incase any background layer isn't aligned correctly makes it harder to notice
    blackBackground = color(0, 0, 0);
    
    //Load up backgrounds
    industrialBackground = new IndustrialBackground();
    punkBackground = new PunkBackground();
    
    //Whichever background is asigned to "BackGround" will be the visible background
    BackGround = industrialBackground;
    
    hero = new Hero();
    
    //TESTING--------------
    humvee_object = new Humvee();
    bike1 = new MotoCommuter();
    bike2 = new MotoNaked();
    j = new Jet();
    
    //If units are not in "all_units", they will not move when the background scrolls
    all_units.push(humvee_object, bike1, bike2, j);
}

function draw(){
    background(blackBackground);
    BackGround.run();
    
    //Vehicle TESTING--------------
    if(occupied_vehicle){
        occupied_vehicle.run_occupied(frameCount);
    }
    for(let i = 0; i < all_units.length; i++){
        all_units[i].run();
    }
    
    //Hero Testing
    hero.run(frameCount);

}

//User Input -------------
function keyPressed(){
    console.log(keyCode);
    if (keyCode === LEFT_ARROW || keyCode == 65){
        
        if(!hero.occupied_vehicle){
            hero.action('run_left');
        } else {
            occupied_vehicle.template.x_vel = -occupied_vehicle.template.x_speed;
            occupied_vehicle.template.direction = 'left';
            occupied_vehicle.template.moving = true;
        }
        
    } else if (keyCode === RIGHT_ARROW || keyCode == 68){
        if(!hero.occupied_vehicle){
            hero.action('run_right');
        } else {
            occupied_vehicle.template.x_vel = occupied_vehicle.template.x_speed;
            occupied_vehicle.template.direction= 'right';
            occupied_vehicle.template.moving = true;
        }
        
    } else if (keyCode === UP_ARROW || keyCode == 87){
        if(!hero.occupied_vehicle){
            hero.action('jump');
        } else {
            if(!occupied_vehicle.template.land_vehicle){
                occupied_vehicle.template.fly('up', occupied_vehicle.template.y_speed);
            }
        }
        
    } else if (keyCode ==+ DOWN_ARROW || keyCode == 83){
        if(hero.occupied_vehicle){
            if(!occupied_vehicle.land_vehicle){
                occupied_vehicle.template.fly('down', occupied_vehicle.template.y_speed);
            }
        }
    } else if (keyCode == 32){ //the spacebar
        hero.action('attack');

    } else if (keyCode == 80){ //the 'p' key

    } else if (keyCode == 66 || keyCode == 70){
        hero.action('board');
    }
}

function keyReleased(){
    if (keyCode === LEFT_ARROW || keyCode == 65){
        if(!hero.occupied_vehicle){
            hero.action('idle');
        } else {
            occupied_vehicle.template.x_vel = 0;
            occupied_vehicle.template.moving = false;
        }
        
    } else if (keyCode === RIGHT_ARROW || keyCode == 68){
        if(!hero.occupied_vehicle){
            hero.action('idle');
        } else {
            occupied_vehicle.template.x_vel = 0;
            occupied_vehicle.template.moving = false;
        }
        
    } else if (keyCode === UP_ARROW || keyCode == 87){
        if(hero.occupied_vehicle){
            if(!occupied_vehicle.land_vehicle){
                occupied_vehicle.template.y_vel = 0;
            }
        }
        
    } else if (keyCode == DOWN_ARROW || keyCode == 83){
        if(hero.occupied_vehicle){
            if(!occupied_vehicle.land_vehicle){
                occupied_vehicle.template.y_vel = 0;
            }
        }

    } else if (keyCode == 32){ //the spacebar
        hero.action('aim');

    } else if (keyCode == 80){ //the 'p' key

    } else if (keyCode == 66 || keyCode == 70){ //the 'b' key

    }
    
}

function mousePressed(){
    hero.action('attack');
}

function mouseReleased(){
    hero.action('aim');
}

//End user input -----

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