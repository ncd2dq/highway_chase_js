class IndustrialBackground{
    constructor(){
        
        this.position1 = 0;
        this.position2 = 697.5 ;
        this.position3 = 697.5 * 2;;
        
        this.b0 = loadImage('assets/environments/industrial/layer0.png');
        this.b0x = this.position1;
        this.b0x2 = this.position2;
        this.b0x3 = this.position3;
        
        this.b1 = loadImage('assets/environments/industrial/layer1.png');
        this.b1x = this.b0x;
        this.b1x2 = this.b0x2;
        this.b1x3 = this.b0x3
        
        this.b2 = loadImage('assets/environments/industrial/layer2.png');
        this.b2x = this.b0x;
        this.b2x2 = this.b0x2;
        this.b2b3 = this.b0x3;
        
        this.b3 = loadImage('assets/environments/industrial/layer3.png');
        this.b3x = this.b0x;
        this.b3x2 = this.b0x2;
        this.b3x3 = this.b0x3;
        this.image_resizing = 1.98;
        
        this.speed = 2 * 1.2 * 1.2;
        
        this.floor_y = 360;
        this.hero_floor = 295;
    }
    
    update(){
        this.b0x = this.position1;
        this.b1x = this.position1;
        this.b2x = this.position1;
        this.b3x = this.position1;
        
        this.b0x2 = this.position2;
        this.b1x2 = this.position2;
        this.b2x2 = this.position2;
        this.b3x2 = this.position2;
        
        this.b0x3 = this.position3;
        this.b1x3 = this.position3;
        this.b2x3 = this.position3;
        this.b3x3 = this.position3;
        
        this.position1 -= this.speed;
        this.position2 -= this.speed;
        this.position3 -= this.speed;

        
    }
    
    infinite_loop(){
        if (this.position1 <= -697.5){
            this.position1 = 697.5 * 2;
        }
        if (this.position2 <= -697.5){
            this.position2 = 697.5 * 2;
        }
        if (this.position3 <= -697.5){
            this.position3 = 697.5 * 2;
        }
    }
    
    display(){
        //Background iteration 1
        image(this.b0, this.b0x, 0, this.b0.width * this.image_resizing, this.b0.height * this.image_resizing);
        image(this.b1, this.b1x, 0, this.b1.width * this.image_resizing, this.b1.height * this.image_resizing);
        image(this.b2, this.b2x, 0, this.b2.width * this.image_resizing, this.b2.height * this.image_resizing);
        image(this.b3, this.b3x, 0, this.b3.width * this.image_resizing, this.b3.height * this.image_resizing);
        
        //Background iteration 2
        image(this.b0, this.b0x2, 0, this.b0.width * this.image_resizing, this.b0.height * this.image_resizing);
        image(this.b1, this.b1x2, 0, this.b1.width * this.image_resizing, this.b1.height * this.image_resizing);
        image(this.b2, this.b2x2, 0, this.b2.width * this.image_resizing, this.b2.height * this.image_resizing);
        image(this.b3, this.b3x2, 0, this.b3.width * this.image_resizing, this.b3.height * this.image_resizing);
        
        //Background iteration 3
        image(this.b0, this.b0x3, 0, this.b0.width * this.image_resizing, this.b0.height * this.image_resizing);
        image(this.b1, this.b1x3, 0, this.b1.width * this.image_resizing, this.b1.height * this.image_resizing);
        image(this.b2, this.b2x3, 0, this.b2.width * this.image_resizing, this.b2.height * this.image_resizing);
        image(this.b3, this.b3x3, 0, this.b3.width * this.image_resizing, this.b3.height * this.image_resizing);
        
/*        //finding the ground level
        stroke(255, 0, 0);
        strokeWeight(1);
        line(0, 360, 400, 360);*/
    }
    
    run(){
        this.infinite_loop();
        this.display();
    }
    
}
