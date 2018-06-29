class Vehicle{
    constructor(land_vehicle, file_path){
        //True or False
        this.land_vehicle = land_vehicle;
        this.occupied = false;
        this.direction = 'right';
        this.moving = false;
        
        //Offset positions
        this.tire_left_x_offset = 0;
        this.tire_left_y_offset = 0;
        this.tire_right_x_offset = 0;
        this.tire_right_y_offset = 0;
        this.tire_left_center_x_offset = 0;
        this.tire_left_center_y_offset = 0;
        this.tire_right_center_x_offset = 0;
        this.tire_right_center_y_offset = 0;
        this.body_x_offset = 0;
        this.body_y_offset = 0;
        this.body_x_offset_s = 0;
        this.body_y_offset_s = 0;
        this.hero_x_offset = 0;
        this.hero_y_offset = 0;
        
        //Central Point
        this.x = 0;
        this.y = 0;
        this.x_vel = 0;
        this.y_vel = 0;
        this.x_speed = 5;
        this.y_speed = 5;
        this.ground_y_punk = 0;
        this.ground_y_industrial = 0;
        
        //Image Sizes
        this.tire_left_x_size = 0;
        this.tire_left_y_size = 0;
        this.tire_right_x_size = 0;
        this.tire_right_y_size = 0;
        this.body_x_size = 0;
        this.body_y_size = 0;
        
        //Hold sprite pictures + animation speed
        this.animation_dict = this.load_animation_dictionary(file_path);
        this.animation_index = 0;
        this.animation_index_max = 4;
        this.idle_animation_speed = 5;
        this.idle_movement = 5;
        this.idle_jerk = 1.2;
        this.wheel_rotation_speed = 0.005;
        
        this.boarding_threshold = 0;
    }
    
    load_animation_dictionary(file_path){
        let prefix = 'assets/vehicles';
        let animation_dict = {'body': [], 'tire': []};
        
        if(this.land_vehicle == true){
            animation_dict['body'].push(loadImage(prefix + file_path + '/body.png'));
            animation_dict['tire'].push(loadImage(prefix + file_path + '/tire.png'));
        } else {
            for(let i = 0; i < file_path.length; i++){
                animation_dict['body'].push(loadImage(prefix + file_path + '/body' + i + '.png'));
            }
        }
        
        return animation_dict;
    }
    
    update(){
        if(this.x + this.x_vel >= Canvas_Width * 3 / 4){
            BackGround.update();
            this.y += this.y_vel;
        } else {
            let hero_center = hero.find_center();
            this.x += this.x_vel;
            this.y += this.y_vel;
            hero.x = this.x - hero_center[2] + this.hero_x_offset;
            hero.y = this.y - hero_center[3] + this.hero_y_offset;
        }
        
    }
    
    be_boarded(hero_center){
        if(hero_center[0] >= this.x - this.boarding_threshold && hero_center[0] <= this.x + this.boarding_threshold){
            if(hero_center[1] >= this.y - this.boarding_threshold && hero_center[1] <= this.y + this.boarding_threshold){
                hero.x = this.x - hero_center[2] + this.hero_x_offset;
                hero.y = this.y - hero_center[3] + this.hero_y_offset;
                this.occupied = true;
                return true;
            }
        }
        return false;
    }
    
    exit(){
        this.occupied = false;
        this.body_x_offset = this.body_x_offset_s;
        this.body_y_offset = this.body_y_offset_s;
        this.moving = false;
        this.x_vel = 0;
        this.y_vel = 0;
    }
    
    animation(frame){
        if(frame % this.idle_animation_speed == 0){
            if(this.animation_index == 0){
                this.body_y_offset += this.idle_movement;
                hero.y += this.idle_movement;
            } else if (this.animation_index == 1){
                this.body_y_offset += this.idle_movement * this.idle_jerk;
                hero.y += this.idle_movement * this.idle_jerk;
                
            } else if (this.animation_index == 2){
                this.body_y_offset -= this.idle_movement;
                hero.y -= this.idle_movement;
                
            } else if (this.animation_index == 3){
                this.body_y_offset -= this.idle_movement * this.idle_jerk;
                hero.y -= this.idle_movement * this.idle_jerk;
            }
        }
        
        if(this.animation_index < this.animation_index_max - 1){
            this.animation_index++;
        } else {
            this.animation_index = 0;
        }
        
    }
    
    wheel_rotation(){
        if(this.direction == 'right'){
            push();
            translate(this.x + this.tire_left_x_offset + 23, this.y + this.tire_left_y_offset + 23);
            rotate(degrees(frameCount * this.wheel_rotation_speed));
            image(this.animation_dict['tire'][0], -23, -23, this.tire_left_x_size, this.tire_left_y_size);
            pop();
        
            push();
            translate(this.x + this.tire_right_x_offset + 23, this.y + this.tire_right_y_offset + 23);
            rotate(degrees(frameCount * this.wheel_rotation_speed));
            image(this.animation_dict['tire'][0], -23, -23, this.tire_right_x_size, this.tire_right_y_size);
            pop();
        } else {
            push();
            translate(this.x + this.tire_left_x_offset + 23, this.y + this.tire_left_y_offset + 23);
            rotate(degrees(-frameCount * this.wheel_rotation_speed));
            image(this.animation_dict['tire'][0], -23, -23, this.tire_left_x_size, this.tire_left_y_size);
            pop();
        
            push();
            translate(this.x + this.tire_right_x_offset + 23, this.y + this.tire_right_y_offset + 23);
            rotate(degrees(-frameCount * this.wheel_rotation_speed));
            image(this.animation_dict['tire'][0], -23, -23, this.tire_right_x_size, this.tire_right_y_size);
            pop();
        }
    }
    
    display(occupied){
        if(occupied){
            hero.display();
        }
        if(this.land_vehicle == true){
            image(this.animation_dict['body'][0], this.x + this.body_x_offset, this.y + this.body_y_offset, this.body_x_size, this.body_y_size);
            
            if(this.moving){
                this.wheel_rotation();
            } else { 
                image(this.animation_dict['tire'][0], this.x + this.tire_left_x_offset, this.y + this.tire_left_y_offset, this.tire_left_x_size, this.tire_left_y_size);
                image(this.animation_dict['tire'][0], this.x + this.tire_right_x_offset, this.y + this.tire_right_y_offset, this.tire_right_x_size, this.tire_right_y_size);
            }
            
        } else {
            image(this.animation_dict['body'][this.animation_index], this.x + this.body_x_offset, this.y + this.body_y_offset, this.body_x_size, this.body_y_size);
        }
        
    }
    
}