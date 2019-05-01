let animation = {
    img:null,
    position : {
        x : 0,
        y : 0,
    },
    position_in_lienzo : {
        x : 0,
        y : 0,
    },
    n_animatios:null,
    space_between_frames: {
        x : 0,
        y : 0,
    },
    n_frames_per_animation:[],
    dimensions: {
        x : 0,
        y : 0,
    },
    current_frame : 0,
    current_animation : 0,
    

    Start: function(img, n_animatios, n_frames_per_animation, dimensions){
        this.img = img;
        this.n_animations = n_animatios;
        this.n_frames_per_animation = n_frames_per_animation;
        this.dimensions = dimensions;

    },


    animate: function(animation_number){
        
        if(this.current_animation != animation_number) {
            this.current_frame = 0;
            this.current_animation = animation_number;

        }
            
        drawImage(this.img, this.position_in_lienzo.x, this.position_in_lienzo.y, this.dimensions.x, this.dimensions.y, this.position.x, this.position.y, 1, 1);

        current_frame++;
        this.reposite_frame();
        
        //drawImage(imagen, imgX, imgY, imgAncho, imgAlto, lienzoX, lienzoY, LienzoAncho, LienzoAlto);
    },
    reposite_frame: function(){
        this.position_in_lienzo.x = this.dimensions.x * this.current_animation;
        this.position_in_lienzo.y = this.dimensions.y * this.current_frame;
        
    }
    
}