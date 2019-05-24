class Player {
    img = null;
    position = {
        x : 0,
        y : 0,
    };
    clicks = 0;
    speed = 100;
    n_animation = 0;
    statico = true;
    animate = new Animation();
    controls = new Controls();

    Start = function() {
        this.img = player_img;
        this.animate.Start(this.img, 4, 4, {x:50,y:50},12);

    };
    Update = function(deltaTime) {
      
                  

        if(input.isKeyPressed(this.controls.up.b1) || input.isKeyPressed(this.controls.up.b2)) {
            this.n_animation = 2;
            if(this.position.y > world.world_corners[0].position_with_offset.y)
                this.position.y -= this.speed * deltaTime;
            
        } 
        else if(input.isKeyPressed(this.controls.down.b1) || input.isKeyPressed(this.controls.down.b2)) {
            this.n_animation = 0;
            if(this.position.y < world.world_corners[1].position_with_offset.y - this.img.height/5)//se divide entre 5 porque la imagen esta hecha con los frames del personaje y como son 4 animaciones se dividiria entre 4 mas los huecos entre animaciones 5
                this.position.y += this.speed * deltaTime;

        }
        if(input.isKeyPressed(this.controls.left.b1) || input.isKeyPressed(this.controls.left.b2)) {
            this.n_animation = 1;
            if(this.position.x > world.world_corners[0].position_with_offset.x)
                this.position.x -= this.speed * deltaTime;
            
        } 
        else if(input.isKeyPressed(this.controls.right.b1) || input.isKeyPressed(this.controls.right.b2)) {
            this.n_animation = 3;
            if(this.position.x < world.world_corners[2].position_with_offset.x - this.img.width/5)//se divide entre 5 porque la imagen esta hecha con los frames del personaje y como son 4 animaciones se dividiria entre 4 mas los huecos entre animaciones 5
                this.position.x += this.speed * deltaTime;

        }
        if(input.isKeyPressed(this.controls.up.b1) || input.isKeyPressed(this.controls.down.b1) || input.isKeyPressed(this.controls.left.b1) || input.isKeyPressed(this.controls.right.b1) 
        || input.isKeyPressed(this.controls.up.b2) || input.isKeyPressed(this.controls.down.b2) || input.isKeyPressed(this.controls.left.b2) || input.isKeyPressed(this.controls.right.b2)){
            this.statico = false;
        }else{
            this.statico = true;
        }


    };
    Draw = function(ctx) {
        this.animate.animate(ctx,this.position,this.n_animation, this.statico);


    };
}
