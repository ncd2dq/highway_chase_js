//Ellie frame_XXX_0
//aim 7
//death 7
//idle 3
//run 13
//shoot 3

class Hero{
    constructor(){
        this.state = 'run';
        this.animation_dict = this.create_animation_dictionary();
        this.animation_index = 0;
        this.animation_speed = 6;
        
    }
    
    create_animation_dictionary(){
        let animation_dict = {};
        let prefix = 'assets/hero/ellie frames/Ellie frame_';
        let suffix = '.png';
        animation_dict['aim'] = [];
        animation_dict['death'] = [];
        animation_dict['idle'] = [];
        animation_dict['run'] = [];
        animation_dict['shoot'] = [];
        
        //Load Aim Images
        for(let i = 0; i < 8; i++){
            animation_dict['aim'].push(loadImage(prefix + 'aim_' + i + suffix));
        }
        
        //Load Death Images
        for(let i = 0; i < 8; i++){
            animation_dict['death'].push(loadImage(prefix + 'death_' + i + suffix));
        }
        
        //Load Idle Images
        for(let i = 0; i < 4; i++){
            animation_dict['idle'].push(loadImage(prefix + 'idle_' + i + suffix));
        }
        
        //Load Run Images
        for(let i = 0; i < 14; i++){
            if( i < 10){
                animation_dict['run'].push(loadImage(prefix + 'run_0' + i + suffix));
            } else {
                animation_dict['run'].push(loadImage(prefix + 'run_' + i + suffix));
            }
        }
        
        //Load Shoot Images
        for(let i = 0; i < 4; i++){
            animation_dict['shoot'].push(loadImage(prefix + 'shoot_' + i + suffix));
        }
        
        return animation_dict;
        
    }
    
    //Increment the animation index
    loop_current_animation(frame){
        let max_animation = this.animation_dict[this.state].length;
        
        if(frame % this.animation_speed == 0){
            if(this.animation_index < max_animation - 1){
                this.animation_index++;
            } else {
                this.animation_index = 0;
            }
        }
        
    }
    
    //Display the current image
    display(){
        image(this.animation_dict[this.state][this.animation_index], 20, 350, 75, 75);
    }
    
    run(frame){
        this.loop_current_animation(frame);
        this.display();
    }
    
    
}