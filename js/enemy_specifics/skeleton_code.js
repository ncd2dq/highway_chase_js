class Skeleton{
    constructor(){
        this.template = new SpriteSheetEnemy('walk', 43, 37, true, 
                                             
                                             {'directory': 'skeleton', 'animations': {'attack': 18, 'dead': 15, 'hit': 8, 'idle': 11, 'react': 4, 'walk': 13}}, 
                                             
                                             {'attack': {'x': 43, 'y': 37}, 'dead': {'x': 33, 'y': 32}, 'hit': {'x': 30, 'y': 32}, 'idle': {'x': 24, 'y': 32}, 'react': {'x': 22, 'y': 32}, 'walk': {'x': 22, 'y': 33}},
                                             {'attack': {'x': 35, 'y': 13}}
                                            );
        this.template.relative_size = 2;
        this.template.punk_ground_y = 352;
        this.template.industrial_ground_y = 293;
        
        if(BackGround.name == 'Punk'){
            this.template.y = this.template.punk_ground_y;
        } else if(BackGround.name == 'Industrial'){
            this.template.y = this.template.industrial_ground_y;
        }
    }
    
    run(){
        this.template.run();
        
        fill(255, 255,255);
        ellipse(this.template.x, this.template.y, 10, 10);
    }
}