//let Canvas_Width =  window.innerWidth;
//let Canvas_Height = window.innerHeight;
let Canvas_Width =  800;
let Canvas_Height = 445;

let blackBackground;
let industrialBackground;
let punkBackground;
let BackGround;

let hero;

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
    blackBackground = color(0, 0, 0);
    industrialBackground = new IndustrialBackground();
    punkBackground = new PunkBackground();
    BackGround = punkBackground;
    hero = new Hero();
    
    //TESTING--------------
    humvee_object = new Humvee();
    bike1 = new MotoCommuter();
    bike2 = new MotoNaked();
    j = new Jet();
    all_units.push(humvee_object, bike1, bike2, j);
}

function draw(){
    background(blackBackground);
    BackGround.run();
    
    //Vehicle TESTING--------------
    if(hero.occupied_vehicle){
        occupied_vehicle.run_occupied(frameCount);
        for(let i = 0; i < all_units.length; i++){
            if(all_units[i] != occupied_vehicle){
                all_units[i].display();
            }
        }
    } else {
        for(let i = 0; i < all_units.length; i++){
            all_units[i].display();
        }
    }
    
    
    //Hero Testing
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
        if(!hero.occupied_vehicle){
            hero.action('jump');
        } else {
            if(!occupied_vehicle.template.land_vehicle){
                occupied_vehicle.template.fly('up', occupied_vehicle.template.y_speed);
            }
        }
        
    } else if (keyCode ==DOWN_ARROW){
        if(hero.occupied_vehicle){
            if(!occupied_vehicle.land_vehicle){
                occupied_vehicle.template.fly('down', occupied_vehicle.template.y_speed);
            }
        }
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
        if(hero.occupied_vehicle){
            if(!occupied_vehicle.land_vehicle){
                occupied_vehicle.template.y_vel = 0;
            }
        }
        
    } else if (keyCode == DOWN_ARROW){
        if(hero.occupied_vehicle){
            if(!occupied_vehicle.land_vehicle){
                occupied_vehicle.template.y_vel = 0;
            }
        }

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


/*


gif = loadGif(image) loads up a gif and returns a p5Image object with some extra functionality. Warning: loadGif only works with locally hosted gifs.

gif.play() plays the gif (it will start playing by default)

gif.pause() pauses the gif

gif.playing() returns true or false depending on if the gif is currently playing

gif.loaded() returns true or false depending on if the gif has loaded

gif.frames() returns the frames as an array of image data

gif.frame([n]) with no argument, returns the current frame. With an integer as an argument, skips to that frame.

totalFrames() returns the total number of frames in the gif

loadGif() will return a modified p5Image object, so you can also use any of the p5Image functions like loadPixels(), filter() or blend().


*/
function mouseReleased(){
    hero.action('aim');
}