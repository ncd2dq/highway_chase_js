class Skeleton{
    constructor(){
        this.template = new SpriteSheetEnemy('walk', 43, 37, true, 
                                             
                                             {'directory': 'skeleton', 'animations': {'attack': 18, 'dead': 15, 'hit': 8, 'idle': 11, 'react': 4, 'walk': 13}}, 
                                             
                                             {'attack': {'x': 43, 'y': 37}, 'dead': {'x': 33, 'y': 32}, 'hit': {'x': 30, 'y': 32}, 'idle': {'x': 24, 'y': 32}, 'react': {'x': 22, 'y': 32}, 'walk': {'x': 22, 'y': 33}},
                                             {'attack': {'x': 38, 'y': 8}}
                                            ); //35
        this.template.relative_size = 2;
        this.template.punk_ground_y = 392;
        this.template.industrial_ground_y = 333;
        
        this.template.hit_radius = 20;
        this.template.x_offset = -28;
        this.template.y_offset = -40;
        
        this.template.x = 150;
        
        this.template.health = 3;
        this.template.max_health = 3;
        
        this.template.health_bar_x_offset = -10;
        this.template.health_bar_y_offset = -35;
        this.template.health_bar_size = 18;
        
        this.template.has_death_animation = true;
        
        if(BackGround.name == 'Punk'){
            this.template.y = this.template.punk_ground_y;
        } else if(BackGround.name == 'Industrial'){
            this.template.y = this.template.industrial_ground_y;
        }
    }
    
    run(){
        this.template.run();
        //this.template._draw_hit_box();
        if(this.template.state == 'attack' && this.template.animation_index == 9 && frameCount % this.template.animation_speed == 0){
            hero.health--;
            console.log('hit!');
        }
        if(this.template.state != 'dead' && this.template.state != 'hit'){
            if(this.template.animation_offsets[this.template.state]){
                if(this.template.x + this.template.animation_offsets[this.template.state]['x'] - hero.find_center()[0] <= 40 && this.template.x + this.template.animation_offsets[this.template.state]['x'] - hero.find_center()[0] >= 10){
                    if(this.template.state != 'attack'){
                        this.template.state_change_perm('attack');   
                    }
                } else if (this.template.state != 'walk'){
                    this.template.state_change_perm('walk');
                }
            } else {
                if(this.template.x - hero.find_center()[0] < 40 && this.template.x - hero.find_center()[0] > 0){
                    if(this.template.state != 'attack'){
                        this.template.state_change_perm('attack');   
                    }
                } else if (this.template.state != 'walk'){
                    this.template.state_change_perm('walk');
                }
            }
        }
        
        if(this.template.state == 'walk'){
            this.template.x -= 1.5;
        }
    }
}