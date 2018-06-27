class Hero{
    constructor(){
        this.state = 'idle_right';
        this.facing = 'right';
        this.animation_dict = this.create_animation_dictionary();
        this.animation_index = 0;
        this.animation_speed = 6;
        
        this.jump2 = false;
        this.x = 20;
        this.y = BackGround.hero_floor;
        this.y_vel = 0;
        this.gravity = 1;
        this.y_standard = BackGround.hero_floor;
        this.run_speed = 3;
        
    }
    
    create_animation_dictionary(){
        let animation_dict = {};
        let prefix_right = 'assets/hero/ellie frames/right/Ellie frame_';
        let prefix_left = 'assets/hero/ellie frames/left/Ellie frame_';
        let suffix = '.png';
        animation_dict['aim_right'] =   [];
        animation_dict['death_right'] = [];
        animation_dict['idle_right'] =  [];
        animation_dict['run_right'] =   [];
        animation_dict['shoot_right'] = [];
        animation_dict['aim_left'] =    [];
        animation_dict['death_left'] =  [];
        animation_dict['idle_left'] =   [];
        animation_dict['run_left'] =    [];
        animation_dict['shoot_left'] =  [];
        //RIGHT FACING
        //Load Aim Images
        for(let i = 0; i < 8; i++){
            animation_dict['aim_right'].push(loadImage(prefix_right + 'aim_' + i + suffix));
        }
        //Load Death Images
        for(let i = 0; i < 8; i++){
            animation_dict['death_right'].push(loadImage(prefix_right + 'death_' + i + suffix));
        }
        //Load Idle Images
        for(let i = 0; i < 4; i++){
            animation_dict['idle_right'].push(loadImage(prefix_right + 'idle_' + i + suffix));
        }
        //Load Run Images
        for(let i = 0; i < 14; i++){
            if( i < 10){
                animation_dict['run_right'].push(loadImage(prefix_right + 'run_0' + i + suffix));
            } else {
                animation_dict['run_right'].push(loadImage(prefix_right + 'run_' + i + suffix));
            }
        }
        //Load Shoot Images
        for(let i = 0; i < 4; i++){
            animation_dict['shoot_right'].push(loadImage(prefix_right + 'shoot_' + i + suffix));
        }
        //LEFT FACING
        //Load Aim Images
        for(let i = 0; i < 8; i++){
            animation_dict['aim_left'].push(loadImage(prefix_left + 'aim_' + i + suffix));
        }
        //Load Death Images
        for(let i = 0; i < 8; i++){
            animation_dict['death_left'].push(loadImage(prefix_left + 'death_' + i + suffix));
        }
        //Load Idle Images
        for(let i = 0; i < 4; i++){
            animation_dict['idle_left'].push(loadImage(prefix_left + 'idle_' + i + suffix));
        }
        //Load Run Images
        for(let i = 0; i < 14; i++){
            if( i < 10){
                animation_dict['run_left'].push(loadImage(prefix_left + 'run_0' + i + suffix));
            } else {
                animation_dict['run_left'].push(loadImage(prefix_left + 'run_' + i + suffix));
            }
        }
        //Load Shoot Images
        for(let i = 0; i < 4; i++){
            animation_dict['shoot_left'].push(loadImage(prefix_left + 'shoot_' + i + suffix));
        }
        
        return animation_dict;
        
    }
    
    //Increment the animation index
    loop_current_animation(frame){
        let max_animation = this.animation_dict[this.state].length;
        
        if(this.state == 'aim_left' || this.state == 'aim_right'){
            if(frame % this.animation_speed == 0){
                if(this.animation_index < max_animation - 1){
                    this.animation_index++;
                }
            }
        } else {
            if(frame % this.animation_speed == 0){
                if(this.animation_index < max_animation - 1){
                    this.animation_index++;
                } else {
                    this.animation_index = 0;
                }
            }
        }
    }
    
    update(){
        if(this.state == 'run_right'){
            if(this.x >= Canvas_Width * 3 / 4){
                BackGround.update();
            } else {
                this.x += this.run_speed;
            }
        } else if(this.state == 'run_left'){
            if(this.x >= - 20)
            this.x -= this.run_speed;
        }
        
        this.y += this.y_vel;
        if(this.y < this.y_standard){
            this.y_vel += this.gravity
        } else {
            this.y = this.y_standard
            this.y_vel = 0;
            this.jump2 = false;
        }
    }
    
    action(behavior){
        if (behavior == 'run_left'){
            this.state = 'run_left';
            this.facing = 'left'
            this.animation_index = 0;
            
        } else if(behavior == 'run_right'){
            this.state = 'run_right';
            this.facing = 'right';
            this.animation_index = 0;

        } else if(behavior == 'jump'){
            if(this.y_vel != 0 && !this.jump2){ //allows the double jump
                this.y -= 10;
                this.y_vel = -9;
                this.jump2 = true;
            }
            if(!this.jump2){
                this.y -= 10;
                this.y_vel = -9;
            }
            
        } else if(behavior == 'attack'){
            if(this.state == 'aim_right' || this.state == 'aim_left'){ //first check if already aiming, if not, aim
                this.animation_index = 0;
                if(this.facing == 'right'){
                    this.state = 'shoot_right';
                } else {
                    this.state = 'shoot_left';
                }
            } else {
                if(this.facing == 'right'){
                    this.state = 'aim_right';
                } else {
                    this.state = 'aim_left';
                }
                this.animation_index = 0;
            }
            
        } else if(behavior == 'vehicle'){
            
        } else if(behavior == 'idle'){
            if(this.facing == 'right'){
                this.state = 'idle_right';
            } else {
                this.state = 'idle_left';
            }
            this.animation_index = 0;
            
        } else if(behavior == 'aim'){
            
            if(this.state == 'shoot_right' || this.state == 'shoot_left'){ //if coming from shooting, display final aim frame
                this.animation_index = this.animation_dict[this.state].length - 1;
            } //if not coming from shooting, play full aim animation
            
            if(this.facing == 'right'){
                this.state = 'aim_right';
            } else {
                this.state = 'aim_left';
            }
        }
    }
    
    //Display the current image
    display(){
        image(this.animation_dict[this.state][this.animation_index], this.x, this.y, 75, 75);
    }
    
    run(frame){
        this.loop_current_animation(frame);
        this.display();
        this.update();
    }
    
    
}