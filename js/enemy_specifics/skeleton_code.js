class Skeleton{
    constructor(){
        this.template = new SpriteSheetEnemy('walk', 43, 37, true, 
                                             
                                             {'directory': 'skeleton', 'animations': {'attack': 18, 'dead': 15, 'hit': 8, 'idle': 11, 'react': 4, 'walk': 13}}, 
                                             
                                             {'attack': {'x': 43, 'y': 37}, 'dead': {'x': 33, 'y': 32}, 'hit': {'x': 30, 'y': 32}, 'idle': {'x': 24, 'y': 32}, 'react': {'x': 22, 'y': 32}, 'walk': {'x': 22, 'y': 33}}
                                            );
        this.template.relative_size = 2;
    }
    
    run(){
        this.template.run();
    }
}




//create animation dictionary
//{'animation_name': {'frames': [], 'length': int}}
//


//attack
//dead good
//hit good
//idle good
//react good
//walk good