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
    fps = 1;
    fps_60 = 60;
    

    Start = function(img, n_animatios, n_frames_per_animation, dimensions,fps){
        this.img = img;
        this.n_animations = n_animatios;
        this.n_frames_per_animation = n_frames_per_animation;
        this.dimensions = dimensions;
        this.fps = this.fps_60/fps;

    };

    print_a_frame = function(ctx,world_position,sprite_position,space_between_frames){
        this.position.x = world_position.x;
        this.position.y = world_position.y;
        this.current_animation = sprite_position.x;
        this.current_frame = sprite_position.y;
        this.space_between_frames = space_between_frames;
        this.position_in_lienzo.x = this.dimensions.x * this.current_animation + this.space_between_frames.x * this.current_animation;
        this.position_in_lienzo.y = this.dimensions.y * this.current_frame + this.space_between_frames.y * this.current_frame;
        ctx.drawImage(this.img, this.position_in_lienzo.x, this.position_in_lienzo.y, this.dimensions.x, this.dimensions.y, this.position.x, this.position.y, 64 * my_camera.zoom, 64 * my_camera.zoom);
    }

    animate = function(ctx,position,animation_number,statico){
        this.position.x = position.x;
        this.position.y = position.y;
        if(this.fps_60 > 0)
            this.fps_60--;
        if(this.fps_60 <= 0)
            this.fps_60 = 60;
      
       
        if(this.current_animation != animation_number || statico ) {
            this.current_frame = 1;
            this.current_animation = animation_number;

        }
        
        ctx.drawImage(this.img, this.position_in_lienzo.x, this.position_in_lienzo.y, this.dimensions.x, this.dimensions.y, this.position.x, this.position.y, 64 * my_camera.zoom, 64 * my_camera.zoom);
        if(this.fps_60 % this.fps == 0){

            if(this.current_frame < this.n_frames_per_animation-1)
                this.current_frame++;
            else
                this.current_frame=0;
            
            this.reposite_frame();
        
            
           
            
        }
        
       
        
        //drawImage(imagen, imgX, imgY, imgAncho, imgAlto, lienzoX, lienzoY, LienzoAncho, LienzoAlto);
    };
    reposite_frame = function(){
        this.position_in_lienzo.x = this.dimensions.x * this.current_animation;
        this.position_in_lienzo.y = this.dimensions.y * this.current_frame;
        
    };
    
}