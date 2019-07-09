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
    //audio de la piedra al romperse
    break_stone;

    Start = function() {
        this.img = player_img;
        this.animate.Start(this.img, 4, 4, {x:50,y:50},12);
        this.half_size_img = {x: ((this.img.width/4)/2), y: ((this.img.height/4)/2)};
        this.collider.w = this.img.width/4 - 14;
        this.collider.h = this.img.height/4 - 18;
        this.inventory.Start(this.input);
        this.position={x:canvas.width/2,y:canvas.height/2};
        this.break_stone = document.getElementById("piedra");
         
        

    };
    Update = function(deltaTime) {
      
        
        
        //en estos bloques de if elses se lleva a cabo el desplazamiento del jugador comprobando las colisiones y actualizando las animaciones del jugador
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
         //Controles del menu barra , indica donde se situa el foco
         if(input.isKeyPressed(this.controls.item1)){this.inventory.foco = 0};
         if(input.isKeyPressed(this.controls.item2)){this.inventory.foco = 1};
         if(input.isKeyPressed(this.controls.item3)){this.inventory.foco = 2};
         if(input.isKeyPressed(this.controls.item4)){this.inventory.foco = 3};
         if(input.isKeyPressed(this.controls.item5)){this.inventory.foco = 4};
         if(input.isKeyPressed(this.controls.item6)){this.inventory.foco = 5};

         //aqui se hace el sistema de compra del inventario
         for(var i = 0;i < this.inventory.shop.length;i++){
            //si el inventario esta abierto y se presiona el rato se comprueba la colision del raton con los items de la tienda
            if(this.inventory.open && input.mouse.pressed && CheckCollisionRect(input.mouse,{coord:{x:this.inventory.shop[i].position.x, y:this.inventory.shop[i].position.y},width:this.inventory.shop[i].dimensions.w*2,height:this.inventory.shop[i].dimensions.h*2}))
            {
                //se comprueba si el jugador puede permitirse el precio del producto
                if(this.inventory.shop[i].price <= this.inventory.clicks)
                {
                    //se comprueba si el jugador tiene sitio dispobible en el inventario y en caso afirmativo se almacena en el primero que encuentre
                    for(var j = 0;j < this.inventory.items.length;j++)
                    {
                        if(this.inventory.items[j] == null)
                        {
                            this.inventory.items[j] = new Pick();
                            this.inventory.items[j].Start_animate(this.inventory.shop[i].quality);
                            this.inventory.clicks -= this.inventory.shop[i].price;
                            break;

                        }
                    }
                   
                }


            }

         }
      
         



        //control con el raton, esta limitado por un area de accion que rodea al jugador
        if(input.mouse.pressed && PointInsideCircle(this.influence_area.c,this.influence_area.r,input.mouse)){
            if(my_world.tile_world[Math.trunc((input.mouse.x-my_camera.offset.x)/45)][Math.trunc((input.mouse.y-my_camera.offset.y)/45)].clicks > 0){
                //si se dispone de una herramienta en el hueco del inventario seleccionado se usará
                if(this.inventory.items[this.inventory.foco] != null){
                    if(this.inventory.items[this.inventory.foco].works != undefined){
                        //se comprueva si la herramienta esta capacitada para minar
                        if(this.inventory.items[this.inventory.foco].works.mine==true){
                            //una vez se pase todas las comprobaciones se accionará la erramienta y cuando esta devuelva un true, que significa que ha conseguido minar un click, se le sumara al inventario del jugador y se le restrá al terreno del mapa
                            if(this.inventory.items[this.inventory.foco].Working(deltaTime)){this.inventory.clicks++;  my_world.tile_world[Math.trunc((input.mouse.x-my_camera.offset.x)/45)][Math.trunc((input.mouse.y-my_camera.offset.y)/45)].clicks -=1; }

                        }

                    }
                    

                }
                //en el caso de que no se disponga de una herramienta en el hueco del inventario seleccionado se usara la herramienta por defecto "hand"
                else{
                     //una vez se pase todas las comprobaciones se accionará la erramienta y cuando esta devuelva un true, que significa que ha conseguido minar un click, se le sumara al inventario del jugador y se le restrá al terreno del mapa
                    if(this.hand.Working(deltaTime)){this.inventory.clicks++;  my_world.tile_world[Math.trunc((input.mouse.x-my_camera.offset.x)/45)][Math.trunc((input.mouse.y-my_camera.offset.y)/45)].clicks -=1; }
                }
                //mientras se mantenga el raton presionado sobre un bloque con clicks y este este en el area de accion del jugador se reproducirá estre sonido, simula estra minando
               this.break_stone.play();
                
            }

        }
        //pulsando e se acciona el menu de compra y al volverlo a pulsar se cierra / probé a poner keyup pero entonces la tienda se quedaba pillada
        if(input.isKeyPressed(this.controls.action.b1) || input.isKeyPressed(this.controls.action.b2)){
            this.inventory.open = !this.inventory.open;
        }
        
        //aquí ajustamos los colliders del jugador y el area de influencia que le rodea
        this.collider.x = this.position.x + 5;
        this.collider.y = this.position.y + 5;
        this.influence_area.c.x = this.position.x;
        this.influence_area.c.y = this.position.y; 
        //esto determina si el jugador es esta moviendo, esta comprobacion se hace para ahorra recursos y no estra reasignando siempre el tile actual que almacena el jugador 
        if(input.isKeyPressed(this.controls.up.b1) || input.isKeyPressed(this.controls.down.b1) || input.isKeyPressed(this.controls.left.b1) || input.isKeyPressed(this.controls.right.b1) 
            || input.isKeyPressed(this.controls.up.b2) || input.isKeyPressed(this.controls.down.b2) || input.isKeyPressed(this.controls.left.b2) || input.isKeyPressed(this.controls.right.b2)){
                this.statico = false;
            }else{
                this.statico = true;
            }
        
            //se guarda la posicion del jugador en relaccion con la cuadricula de tiles solo cuando el jugador se desplace
        if(!this.statico)
        {
            this.tile_actual.x = ((this.position.x - my_camera.offset.x) + this.half_size_img.x) / 45;
            this.tile_actual.y = ((this.position.y - my_camera.offset.y) + this.half_size_img.y) / 45;
        }

        this.inventory.Update(deltaTime);
        


    };
    Draw = function(ctx) {
        //realiza las animaciones del jugador, esto lo administra completamente la clase animate
        this.animate.animate(ctx,this.position,this.n_animation, this.statico);
        this.inventory.Draw(ctx);

        //si el raton esta pulsado dentro del area de influencia del jugador y sobre un bloque que contiene clicks, se pintará a la derecha del raton unos numeros que indican el tiempo de minería que hay que emplear para minar un click
       if(input.mouse.pressed && PointInsideCircle(this.influence_area.c,this.influence_area.r,input.mouse))
        if(my_world.tile_world[Math.trunc((input.mouse.x-my_camera.offset.x)/45)][Math.trunc((input.mouse.y-my_camera.offset.y)/45)].clicks > 0){
            ctx.textAlign = 'left';
            ctx.fillStyle = "white";
            ctx.font="10px Comic Sans MS"
            ctx.fillText(this.inventory.items[this.inventory.foco] == null ? this.hand.aux_time_to_make_work.toFixed(2) + '/' + this.hand.time_to_make_work : this.inventory.items[this.inventory.foco].aux_time_to_make_work.toFixed(2) + '/' + this.inventory.items[this.inventory.foco].time_to_make_work,input.mouse.x, input.mouse.y);
        }
    
       
        


    };
}
