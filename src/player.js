class Player {
    //referencia de la imagen del player
    img = null;
    //posicion del player respecto al canvas
    position = {
        x : 0,
        y : 0,
    };
    //colisionador para detectar que baldosas estan en contacto
    collider = {
        x:0,
        y:0,
        w:0,
        h:0,
    }
    //cantidad de clicks en el inventario
    clicks = 0;
    //velocidad del player
    speed = 100;
    //numero de animaciones del player
    n_animation = 0;
    //el player esta parado?
    statico = true;
    //objeto animador del player
    animate = new Animation();
    //controles del player
    controls = new Controls();
    //la mitad de la imagen del player
    half_size_img ={
        x : null,
        y : null,
    };
    //baldosa en la que se encuentra actualmente
    tile_actual= {
        x:0,
        y:0,
    }

    Start = function() {
        this.img = player_img;
        this.animate.Start(this.img, 4, 4, {x:50,y:50},12);
        this.half_size_img = {x: ((this.img.width/4)/2), y: ((this.img.height/4)/2)};
        this.collider.w = this.img.width/4 - 14;
        this.collider.h = this.img.height/4 - 18;
        

    };
    Update = function(deltaTime) {
      
             
        my_world.tile_world[Math.trunc(this.tile_actual.x)][Math.trunc(this.tile_actual.y)].tile_position = {x:5,y:2};
        my_world.tile_world[Math.trunc(this.tile_actual.x)][Math.trunc(this.tile_actual.y)].kind_of_tile=7;
        my_world.tile_world[Math.trunc(this.tile_actual.x)][Math.trunc(this.tile_actual.y)].select_kind_of_Tile();
        

        if(my_world.tile_world[Math.trunc(this.tile_actual.x)][Math.trunc(this.tile_actual.y)].walkable){
            if(input.isKeyPressed(this.controls.up.b1) || input.isKeyPressed(this.controls.up.b2)) {
                this.n_animation = 2;
                if(this.position.y > world.world_corners[0].position_with_offset.y)
                    this.position.y -= this.speed * deltaTime;        
                
            } 
            else if(input.isKeyPressed(this.controls.down.b1) || input.isKeyPressed(this.controls.down.b2)) {
                this.n_animation = 0;
                if(this.position.y < world.world_corners[1].position_with_offset.y - this.img.height/4)//se divide entre 5 porque la imagen esta hecha con los frames del personaje y como son 4 animaciones se dividiria entre 4 mas los huecos entre animaciones 5
                    this.position.y += this.speed * deltaTime;
    
            }
            if(input.isKeyPressed(this.controls.left.b1) || input.isKeyPressed(this.controls.left.b2)) {
                this.n_animation = 1;
                if(this.position.x > world.world_corners[0].position_with_offset.x)
                    this.position.x -= this.speed * deltaTime;
                
            } 
            else if(input.isKeyPressed(this.controls.right.b1) || input.isKeyPressed(this.controls.right.b2)) {
                this.n_animation = 3;
                if(this.position.x < world.world_corners[2].position_with_offset.x - this.img.width/4)//se divide entre 5 porque la imagen esta hecha con los frames del personaje y como son 4 animaciones se dividiria entre 4 mas los huecos entre animaciones 5
                    this.position.x += this.speed * deltaTime;
    
            }
            

        }else{
            if(!this.statico)
                switch(this.n_animation){
                    case 0:
                        this.position.y -= this.speed * deltaTime;
                    break;
                    case 1:
                        this.position.x += this.speed * deltaTime;
                    break;
                    case 2:
                        this.position.y += this.speed * deltaTime; 
                    break;
                    case 3:
                        this.position.x -= this.speed * deltaTime;
                    break;
                }

        }
        this.collider.x = this.position.x + 5;
        this.collider.y = this.position.y + 5;
        
        if(input.isKeyPressed(this.controls.up.b1) || input.isKeyPressed(this.controls.down.b1) || input.isKeyPressed(this.controls.left.b1) || input.isKeyPressed(this.controls.right.b1) 
            || input.isKeyPressed(this.controls.up.b2) || input.isKeyPressed(this.controls.down.b2) || input.isKeyPressed(this.controls.left.b2) || input.isKeyPressed(this.controls.right.b2)){
                this.statico = false;
            }else{
                this.statico = true;
            }
        

        if(!this.statico)
        {
            this.tile_actual.x = ((this.position.x - my_camera.offset.x) - this.half_size_img.x) / 45;
            this.tile_actual.y = ((this.position.y - my_camera.offset.y) + this.half_size_img.y) / 45;
        }


    };
    Draw = function(ctx) {
        this.animate.animate(ctx,this.position,this.n_animation, this.statico);
        ctx.fillStyle='rgba(255,0,0,0.5)';
        ctx.fillRect(this.collider.x,this.collider.y,this.collider.w,this.collider.h);
        


    };
}
