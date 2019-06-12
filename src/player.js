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
    //area en el que el player puede interactuar con el entorno
    influence_area ={
        c:{
            x:0,
            y:0,
        },
        r:100,
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
    //inventario del jugador
    inventory = new Inventory();
    //herramienta mano
    hand = new Hand();
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
      
        /*     
        my_world.tile_world[Math.trunc(this.tile_actual.x)][Math.trunc(this.tile_actual.y)].tile_position = {x:5,y:2};
        my_world.tile_world[Math.trunc(this.tile_actual.x)][Math.trunc(this.tile_actual.y)].kind_of_tile=7;
        my_world.tile_world[Math.trunc(this.tile_actual.x)][Math.trunc(this.tile_actual.y)].select_kind_of_Tile();
        */
        
        

        if(my_world.tile_world[Math.trunc(this.tile_actual.x)][Math.trunc(this.tile_actual.y)].walkable){
            if(input.isKeyPressed(this.controls.up.b1) || input.isKeyPressed(this.controls.up.b2)) {
                this.n_animation = 2;
                if(this.position.y > world.world_corners[0].position_with_offset.y){
                    if(CheckCollisionRectToRect(this.collider,my_world.tile_world[Math.trunc(this.tile_actual.x)][Math.trunc(this.tile_actual.y - 1)].collider)){
                        if(my_world.tile_world[Math.trunc(this.tile_actual.x)][Math.trunc(this.tile_actual.y - 1)].walkable){
                            this.position.y -= this.speed * deltaTime; 
                        }

                    }else{
                        this.position.y -= this.speed * deltaTime; 

                    }
                }

                           
                
            } 
            else if(input.isKeyPressed(this.controls.down.b1) || input.isKeyPressed(this.controls.down.b2)) {
                this.n_animation = 0;
                if(this.position.y < world.world_corners[1].position_with_offset.y - this.img.height/4){
                    if(CheckCollisionRectToRect(this.collider,my_world.tile_world[Math.trunc(this.tile_actual.x)][Math.trunc(this.tile_actual.y + 1)].collider)){
                        if(my_world.tile_world[Math.trunc(this.tile_actual.x)][Math.trunc(this.tile_actual.y + 1)].walkable){
                            this.position.y += this.speed * deltaTime; 
                        }

                    }else{
                        this.position.y += this.speed * deltaTime; 

                    }
                }
                  
    
            }
            if(input.isKeyPressed(this.controls.left.b1) || input.isKeyPressed(this.controls.left.b2)) {
                this.n_animation = 1;
                if(this.position.x > world.world_corners[0].position_with_offset.x){
                    if(CheckCollisionRectToRect(this.collider,my_world.tile_world[Math.trunc(this.tile_actual.x - 1)][Math.trunc(this.tile_actual.y)].collider)){
                        if(my_world.tile_world[Math.trunc(this.tile_actual.x - 1)][Math.trunc(this.tile_actual.y)].walkable){
                            this.position.x -= this.speed * deltaTime; 
                        }

                    }else{
                        this.position.x -= this.speed * deltaTime; 

                    }
                }
                
            } 
            else if(input.isKeyPressed(this.controls.right.b1) || input.isKeyPressed(this.controls.right.b2)) {
                this.n_animation = 3;
                if(this.position.x < world.world_corners[2].position_with_offset.x - this.img.width/4){
                    if(CheckCollisionRectToRect(this.collider,my_world.tile_world[Math.trunc(this.tile_actual.x + 1)][Math.trunc(this.tile_actual.y)].collider)){
                        if(my_world.tile_world[Math.trunc(this.tile_actual.x + 1)][Math.trunc(this.tile_actual.y)].walkable){
                            this.position.x += this.speed * deltaTime; 
                        }

                    }else{
                        this.position.x += this.speed * deltaTime; 

                    }
                }
    
            }
            //Controles del menu barra
            if(input.isKeyPressed(this.controls.item1)){this.inventory.foco = 0};
            if(input.isKeyPressed(this.controls.item2)){this.inventory.foco = 1};
            if(input.isKeyPressed(this.controls.item3)){this.inventory.foco = 2};
            if(input.isKeyPressed(this.controls.item4)){this.inventory.foco = 3};
            if(input.isKeyPressed(this.controls.item5)){this.inventory.foco = 4};
            if(input.isKeyPressed(this.controls.item6)){this.inventory.foco = 5};
            

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
        //control con el raton
        if(input.mouse.pressed && PointInsideCircle(this.influence_area.c,this.influence_area.r,input.mouse)){
            console.log("he pulsado dentro del circulo");
            if(my_world.tile_world[Math.trunc((input.mouse.x-my_camera.offset.x)/45)][Math.trunc((input.mouse.y-my_camera.offset.y)/45)].clicks > 0){
                if(this.inventory.items[this.inventory.foco] != null){
                    if(this.inventory.items[this.inventory.foco].works != undefined){
                        if(this.inventory.items[this.inventory.foco].works.mine==true){

                        }

                    }
                    

                }
                else{
                    if(this.hand.Working(deltaTime)){this.inventory.clicks++;  my_world.tile_world[Math.trunc((input.mouse.x-my_camera.offset.x)/45)][Math.trunc((input.mouse.y-my_camera.offset.y)/45)].clicks -=1; }
                }
                
                
            }

        }
        if(input.isKeyPressed(this.controls.action.b1) || input.isKeyPressed(this.controls.action.b2)){
            if(input.isKeyUp(this.controls.action.b1) || input.isKeyUp(this.controls.action.b2))
                this.inventory.open = !this.inventory.open; 
            //Set_time_out(function(){},when(input.isKeyUp(this.controls.action.b1) || input.isKeyUp(this.controls.action.b2)));
        }
        

        this.collider.x = this.position.x + 5;
        this.collider.y = this.position.y + 5;
        this.influence_area.c.x = this.position.x;
        this.influence_area.c.y = this.position.y; 
        
        if(input.isKeyPressed(this.controls.up.b1) || input.isKeyPressed(this.controls.down.b1) || input.isKeyPressed(this.controls.left.b1) || input.isKeyPressed(this.controls.right.b1) 
            || input.isKeyPressed(this.controls.up.b2) || input.isKeyPressed(this.controls.down.b2) || input.isKeyPressed(this.controls.left.b2) || input.isKeyPressed(this.controls.right.b2)){
                this.statico = false;
            }else{
                this.statico = true;
            }
        

        if(!this.statico)
        {
            this.tile_actual.x = ((this.position.x - my_camera.offset.x) + this.half_size_img.x) / 45;
            this.tile_actual.y = ((this.position.y - my_camera.offset.y) + this.half_size_img.y) / 45;
        }

        this.inventory.Update(deltaTime);
        


    };
    Draw = function(ctx) {
        
        this.animate.animate(ctx,this.position,this.n_animation, this.statico);
        /*
        ctx.fillStyle='rgba(255,0,0,0.5)';
        ctx.fillRect(this.collider.x,this.collider.y,this.collider.w,this.collider.h);
        */
       this.inventory.Draw(ctx);
        /*ctx.fillStyle = 'rgba(255,0,0,0.5)';
        ctx.arc(this.influence_area.c.x,this.influence_area.c.y,this.influence_area.r,0, 2 * Math.PI);
        ctx.fill();
        */
    
       
        


    };
}
