//image(obj, dx, dy, dw, dh, sx, sy, sw, sh)

class SpriteSheetEnemy{
    constructor(state, x_size, y_size, reversed, directions, sizing, animation_offsets){
        
        //Display Resizing
        this.x_resize = 0;
        this.y_resize = 0;
        
        
        //Position attributes
        //Offsets are you how get from the center to the top left point of the image
        this.x_offset = 0;
        this.y_offset = 0;
        //X, Y should be the dead center of the sprite
        this.x = 0;
        this.y = 0;
        this.animation_offsets = animation_offsets;
        
        this.punk_ground_y = 0;
        this.industrial_ground_y = 0;
        
        //Animation
        this.sizing = sizing;
        this.relative_size = 0;
        this.animation_speed = 3;
        this.animation_index = 0;
        this.reverse_animation = reversed; //if the original sprite sheet was reversed, iterate through frames from right to left
        this.animation_dictionary = this.load_animation_dictionary(directions);
        
        this.state = state;
        this.state_pending = state;
        
        //Sprite attributes
        this.x_size = this.sizing[this.state]['x'];
        this.y_size = this.sizing[this.state]['y'];
        this.hit_radius = 0;
    }
    
    load_animation_dictionary(directions){
        //directions = {'directory': '/assets/enemies/____', 'animations': {'attack': 18, 'dead': 15, ...}}
        let prefix = 'assets/enemies/';
        let suffix;
        
        if(this.reverse_animation){
            suffix = '_l.png';
        } else {
            suffix = '.png';
        }
        
        //{'animation_name': {'frames': img_obj, 'length': int}}
        let animation_dict = {};
        
        for(let [key, value] of Object.entries(directions['animations'])){
            animation_dict[key] = {'frames': loadImage(prefix + directions['directory'] + '/' + key + suffix), 'length': value};
        }
        
        return animation_dict;
    }
    
    be_attacked(x_y_pos){
        //Preserves current sprite state by queueing it up and changing state to hit animation
        let hit = this._is_hit(x_y_pos);
        if(hit){
            //If this were not here and you were hit while already being hit, you would enter an endless hit animation loop
            if(this.state != 'hit'){
                this.state_pending = this.state;
            }
            this.state_change_temp('hit');
        }
    }
    
    _is_hit(x_y_pos){
        //Returns true if a mouse click is within sprite hit box
        let dist = this._distance_to_hit(x_y_pos);
        console.log(dist);
        if(dist > this.hit_radius){
            return false;
        }
        return true;
    }
    
    _distance_to_hit(x_y_pos){
        //Determine the distance between center of sprite and mouseclick
        let dist;
        if(this.animation_offsets[this.state]){
            dist = Math.sqrt(Math.pow(x_y_pos['x'] - (this.x + this.animation_offsets[this.state]['x']), 2) +Math.pow(x_y_pos['y'] - (this.y + this.animation_offsets[this.state]['y']), 2))
            
        } else {
            dist = Math.sqrt(Math.pow(x_y_pos['x'] - this.x, 2) +Math.pow(x_y_pos['y'] - this.y, 2))
        }
        return dist;
    }
    
    _draw_hit_box(){
        //Debugging tool to draw hit box
        fill(255, 255, 255);
        if(!this.animation_offsets[this.state]){
            ellipse(this.x, this.y, this.hit_radius, this.hit_radius);
        } else {
            ellipse(this.x + this.animation_offsets[this.state]['x'], this.y + this.animation_offsets[this.state]['y'], this.hit_radius, this.hit_radius);
        }
    }
    
    //CHANGE SPRITE STATE FUNCTIONS ----------->
    _correct_animation_offset(old_state, new_state){
        //Call this funciton whenever you change states just incase the pictures need to be adjusted to stay in the same location
        if(this.animation_offsets[new_state]){
            this.x -= this.animation_offsets[new_state]['x'];
            this.y -= this.animation_offsets[new_state]['y'];
        }
        if(this.animation_offsets[old_state]){
            this.x += this.animation_offsets[old_state]['x'];
            this.y += this.animation_offsets[old_state]['y'];
        }
    
    }
    
    _change_animation_size(){
        this.x_size = this.sizing[this.state]['x'];
        this.y_size = this.sizing[this.state]['y'];
    }
    //END CHANGE SPRITE STATE FUNCTIONS ----------->
    
    animate(reverse){
        //The callback function will be called after 1 animation cycle (this allows you to have sprite resume activity);
        if(frameCount % this.animation_speed == 0){
            if(reverse){
                if(this.animation_index > 0){
                    this.animation_index--;
                } else {
                    
                    if(this.state != this.state_pending){
                        this.state_change_temp(this.state_pending);
                    }

                    this.animation_index = this.animation_dictionary[this.state]['length'] - 1;
                }

            } else {
                if(this.animation_index < this.animation_dictionary[this.state]['length'] - 1){
                    this.animation_index++;
                } else {
                    this.animation_index = 0;
                    //add in pending state changes
                }
            }
        }
    }

    display(){
        image(this.animation_dictionary[this.state]['frames'], 
              this.x + this.x_offset, this.y + this.y_offset, //position
              this.x_size * this.relative_size, this.y_size * this.relative_size, //destination size
              this.x_size * this.animation_index, 0, //starting x of slice, starting y in slice
              this.x_size, this.y_size); //source size
    }
    
    state_change_temp(new_state){
        this._correct_animation_offset(this.state, new_state);
        this.state = new_state;
        
        if(this.reverse_animation){
            this.animation_index = this.animation_dictionary[this.state]['length'] - 1;
        } else {
            this.animation_index = 0;
        }
        this._change_animation_size();
    }
    
    state_change_perm(new_state){
        this._correct_animation_offset(this.state, new_state);
        this.state = new_state;
        this.state_pending = new_state;
        
        if(this.reverse_animation){
            this.animation_index = this.animation_dictionary[this.state]['length'] - 1;
        } else {
            this.animation_index = 0;
        }
        this._change_animation_size();
    }
    
    run(){
        this.display();
        this.animate(true);
    }
}