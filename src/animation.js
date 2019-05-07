class Animation {
    img = null;
    position = {
        x : 0,
        y : 0,
    };
    position_in_lienzo = {
        x : 0,
        y : 0,
    };
    n_animatios = null;
    space_between_frames = {
        x : 0,
        y : 0,
    };
    n_frames_per_animation = null;
    dimensions = {
        x : 0,
        y : 0,
    };
    current_frame = 0;
    current_animation = 0;
    

    Start = function(img, n_animatios, n_frames_per_animation, dimensions){
        this.img = img;
        this.n_animations = n_animatios;
        this.n_frames_per_animation = n_frames_per_animation;
        this.dimensions = dimensions;

    };


    animate = function(ctx,position,animation_number,statico){
        this.position.x = position.x;
        this.position.y = position.y;
        
        if(this.current_animation != animation_number || statico ) {
            this.current_frame = 1;
            this.current_animation = animation_number;

        }
            
        ctx.drawImage(this.img, this.position_in_lienzo.x, this.position_in_lienzo.y, this.dimensions.x, this.dimensions.y, this.position.x, this.position.y, 64, 64);
        if(this.current_frame < this.n_frames_per_animation-1)
            this.current_frame++;
        else
            this.current_frame=0;
        this.reposite_frame();
        
        //drawImage(imagen, imgX, imgY, imgAncho, imgAlto, lienzoX, lienzoY, LienzoAncho, LienzoAlto);
    };
    reposite_frame = function(){
        this.position_in_lienzo.x = this.dimensions.x * this.current_animation;
        this.position_in_lienzo.y = this.dimensions.y * this.current_frame;
        
    };
    
}