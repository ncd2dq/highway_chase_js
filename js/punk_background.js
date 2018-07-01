class PunkBackground{
    constructor(){
        this.name = 'Punk';
        this.b0 = loadImage('assets/environments/cyberpunk/layer0.png');
        this.b1 = loadImage('assets/environments/cyberpunk/layer1.png');
        this.b2 = loadImage('assets/environments/cyberpunk/layer2.png');
    
        this.b0x = 0;
        this.b1x = 0;
        this.b2x = 0;
        
        this.b0x2 = 486;
        this.b1x2 = 486;
        this.b2x2 = 668; //845 or 846 (overlap, gap)
        
        this.b0x3 = 486 * 2;
        this.b1x3 = 486 * 2;
        this.b2x3 = 668 * 2; //845 or 846 (overlap, gap)
        
        this.image_resizing = 2 * 0.95;
        
        this.speed_s = 0.5;
        this.speed1_s = 1 * 1.2;
        this.speed2_s = 2 * 1.2 * 1.2;
        
        this.speed = 0.5;
        this.speed1 = 1 * 1.2;
        this.speed2 = 2 * 1.2 * 1.2;
        
        this.floor_y = 419;
        this.hero_floor = 353;
        
    }
    
    reset_speed(){
        this.speed = this.speed_s;
        this.speed1 = this.speed1_s;
        this.speed2 = this.speed2_s;
    }
    

    realign(){
        //stops the gap from occuring between parralax layers
        //Stage 1 --> Find the farthest left most of each set
        let left_most = [this.b0x, this.b0x2, this.b0x3];
        let left_most2 = [this.b1x, this.b1x2, this.b1x3];
        let left_most3 = [this.b2x, this.b2x2, this.b2x3];
        
        left_most.sort(function(a,b){return a-b});
        left_most2.sort(function(a,b){return a-b});
        left_most3.sort(function(a,b){return a-b});
        
        //Stage 2 --> Redraw all others based on farthest left
        
        //Realign b_x
        left_most[1] = left_most[0] + 486;
        left_most[2] = left_most[0] + (486 * 2);
        this.b0x = left_most[0];
        this.b0x2 = left_most[1];
        this.b0x3 = left_most[2];
        
        //Realign b1x
        left_most2[1] = left_most2[0] + 486;
        left_most2[2] = left_most2[0] + (486 * 2);
        this.b1x = left_most2[0];
        this.b1x2 = left_most2[1];
        this.b1x3 = left_most2[2];
        
        //Realign b2x
        left_most3[1] = left_most3[0] + 668;
        left_most3[2] = left_most3[0] + (668 * 2);
        this.b2x = left_most3[0];
        this.b2x2 = left_most3[1];
        this.b2x3 = left_most3[2];
        
        
    }
    
    move_objects(){
        for(let i = 0; i < all_units.length; i++){
            all_units[i].template.x -= this.speed2;
        }
    }
    
    update(){
        this.b0x -= this.speed;
        this.b1x -= this.speed1;
        this.b2x -= this.speed2;
        
        this.b0x2 -= this.speed;
        this.b1x2 -= this.speed1;
        this.b2x2 -= this.speed2;
        
        this.b0x3 -= this.speed;
        this.b1x3 -= this.speed1;
        this.b2x3 -= this.speed2;
    }
    
    infinite_loop(){
        //loop base layer
        if(this.b0x <= - 486){
            this.b0x = 486 * 2;
            this.realign();
        }
        if(this.b0x2 <= - 486){
            this.b0x2 = 486 * 2;
            this.realign();
        }
        if(this.b0x3 <= - 486){
            this.b0x3 = 486 * 2;
            this.realign();
        }
        
        //Loop second layer
        if(this.b1x <= - 486){
            this.b1x = 486 * 2;
            this.realign();
        }
        if(this.b1x2 <= - 486){
            this.b1x2 = 486 * 2;
            this.realign();
        }
        if(this.b1x3 <= - 486){
            this.b1x3 = 486 * 2;
            this.realign();
        }
        
        //loop foreground
        if(this.b2x <= - 668){
            this.b2x = 668 * 2 - 1;
            this.realign();
        }
        if(this.b2x2 <= - 668){
            this.b2x2 = 668 * 2 - 1;
            this.realign();
        }
        if(this.b2x3 <= - 668){
            this.b2x3 = 668 * 2 - 1;
            this.realign();
        }
        
        
    }
    
    display(){
        image(this.b0, this.b0x, 0, this.b0.width * this.image_resizing, this.b0.height * this.image_resizing);
        image(this.b0, this.b0x2, 0, this.b0.width * this.image_resizing, this.b0.height * this.image_resizing);
        image(this.b0, this.b0x3, 0, this.b0.width * this.image_resizing, this.b0.height * this.image_resizing);
        
        image(this.b1, this.b1x, 0, this.b1.width * this.image_resizing, this.b1.height * this.image_resizing);
        image(this.b1, this.b1x2, 0, this.b1.width * this.image_resizing, this.b1.height * this.image_resizing);
        image(this.b1, this.b1x3, 0, this.b1.width * this.image_resizing, this.b1.height * this.image_resizing);
        
        image(this.b2, this.b2x, 75, this.b2.width * this.image_resizing, this.b2.height * this.image_resizing);
        image(this.b2, this.b2x2, 75, this.b2.width * this.image_resizing, this.b2.height * this.image_resizing);
        image(this.b2, this.b2x3, 75, this.b2.width * this.image_resizing, this.b2.height * this.image_resizing);
/*        
        //finding the ground level
        stroke(255, 0, 0);
        strokeWeight(1);
        line(0, 419, 400, 419);*/
    }
    
    run(){
        this.infinite_loop();
        this.display();
    }
    
}
