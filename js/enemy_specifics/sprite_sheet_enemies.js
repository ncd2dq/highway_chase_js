//image(obj, dx, dy, dw, dh, sx, sy, sw, sh)

class SpriteSheetEnemy{
    constructor(state, x_size, y_size, reversed, directions, sizing){
        
        //Display Resizing
        this.x_resize = 0;
        this.y_resize = 0;
        
        
        //Position attributes
        this.x_offset = 0;
        this.y_offset = 0;
        this.x = 0;
        this.y = 0;
        
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
        
        //Sprite attributes
        this.x_size = this.sizing[this.state]['x'];
        this.y_size = this.sizing[this.state]['y'];
    }
    
    load_animation_dictionary(directions){
        //directions = {'directory': '/assets/enemies/____', 'animations': {'attack': 18, 'dead': 15, ...}}
        let prefix = '/assets/enemies/';
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
    
    animate(reverse){
        if(frameCount % this.animation_speed == 0){
            if(reverse){
                if(this.animation_index > 0){
                    this.animation_index--;
                } else {
                    this.animation_index = this.animation_dictionary[this.state]['length'] - 1;
                }

            } else {
                if(this.animation_index < this.animation_dictionary[this.state]['length'] - 1){
                    this.animation_index++;
                } else {
                    this.animation_index = 0;
                }
            }
        }
    }

    display(){
        image(this.animation_dictionary[this.state]['frames'], 
              this.x, this.y, //position
              this.x_size * this.relative_size, this.y_size * this.relative_size, //destination size
              this.x_size * this.animation_index, 0, //starting x of slice, starting y in slice
              this.x_size, this.y_size); //source size
        
        fill(255, 255, 255);
        ellipse(this.x + 27, this.y + 37, 5, 5);
        ellipse(this.x + 62, this.y + 50, 5, 5);
        //x = 62 - 27
        //y = 50 - 37
    }
    
    run(){
        this.display();
        this.animate(true);
    }
}