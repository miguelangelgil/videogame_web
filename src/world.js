let world = {
    //dimensiones del mundo
    size:{
        x:0,
        y:0,
    },
    //lleva la cuenta en los bucles de generacion del mundo
    position_array:{
        x:0,
        y:0,
    },
    //array donde se guarda la referencia de todas las baldosas
    tile_world: null,
    //porcentaje de bloiques de clicks
    amount_of_clicks:null,
    //cantidad de agua
    amount_of_water:null,
    //cantidad de verde
    amount_of_green:null,
    //top izquierda, bot izquierda , top izquierda y bot izquierda
    world_corners: null,
    //construlle el mundo
    build_world: function(){
        this.tile_world = new Array(this.size.x);
        for(var i = 0; i < this.size.x; i++)
            this.tile_world[i] = new Array(this.size.y);

        this.world_corners = new Array(4);
        

        for(this.position_array.x = 0; this.position_array.x < this.size.x; this.position_array.x++){
            for(this.position_array.y = 0; this.position_array.y < this.size.y; this.position_array.y++){
                console.log(this.position_array.x + ", " + this.position_array.y);
                let my_tile;
                if(Math.floor(Math.random() * 100)+1 <= this.amount_of_water)
                    my_tile = new Tile({x:this.position_array.x,y:this.position_array.y},0,0);
                else{
                    if(Math.floor(Math.random() * 100)+1 <= this.amount_of_clicks)
                        my_tile = new Tile({x:this.position_array.x,y:this.position_array.y},4,Math.floor(Math.random() * 1000)+1);
                    else
                    {
                        if(Math.floor(Math.random() * 100)+1 <= this.amount_of_green)
                            my_tile = new Tile({x:this.position_array.x,y:this.position_array.y},2,0);
                        else
                            my_tile = new Tile({x:this.position_array.x,y:this.position_array.y},1,0);

                    }

                }
               
                this.tile_world[this.position_array.x][this.position_array.y] = my_tile;
                //aqui guardo las esquinas del mundo para tener la referencias de las cordenadas limites
                if(this.position_array.x == 0){
                    if(this.position_array.y == 0){
                        
                        this.world_corners[0] = my_tile;

                    }
                    else if(this.position_array.y == this.size.y-1){
                        
                        this.world_corners[1] = my_tile;

                    }
                }
                if(this.position_array.x == this.size.x-1){
                    if(this.position_array.y == 0){

                        this.world_corners[2] = my_tile;

                    }
                    else if(this.position_array.y == this.size.y-1){

                        this.world_corners[3] = my_tile;

                    }

                }
            }
        }
        //aquí guardo la referencia de las baldosas cercanas a cada baldosa
        for(this.position_array.x=0; this.position_array.x < this.size.x; this.position_array.x++){
            for(this.position_array.y=0;this.position_array.y < this.size.y; this.position_array.y++){
                if(this.position_array.x != 0)
                    this.tile_world[this.position_array.x][this.position_array.y].near_Tiles[0] = this.tile_world[this.position_array.x-1][this.position_array.y];
                else
                    this.tile_world[this.position_array.x][this.position_array.y].near_Tiles[0] = null;

                if(this.position_array.y != this.size.y - 1)
                    this.tile_world[this.position_array.x][this.position_array.y].near_Tiles[1] = this.tile_world[this.position_array.x][this.position_array.y+1];
                else
                    this.tile_world[this.position_array.x][this.position_array.y].near_Tiles[1] = null;

                if(this.position_array.x != this.size.x - 1)
                    this.tile_world[this.position_array.x][this.position_array.y].near_Tiles[2] = this.tile_world[this.position_array.x+1][this.position_array.y];
                else
                    this.tile_world[this.position_array.x][this.position_array.y].near_Tiles[2] = null;

                if(this.position_array.y != 0)
                    this.tile_world[this.position_array.x][this.position_array.y].near_Tiles[3] = this.tile_world[this.position_array.x][this.position_array.y - 1];
                else
                    this.tile_world[this.position_array.x][this.position_array.y].near_Tiles[3] = null;
            }   
        }
       
    },
    Start: function(size, amount_of_clicks,amount_of_water,amount_of_green){
        this.size.x = size.x;
        this.size.y = size.y;
        this.amount_of_clicks = amount_of_clicks;
        this.amount_of_green = amount_of_green;
        this.amount_of_water = amount_of_water;
    },
    Update: function(deltaTime){
        this.tile_world.forEach(function(fila){
            fila.forEach(function(tile){
                tile.Update(deltaTime);
            });
        });

    },
    Draw: function(ctx){
        this.tile_world.forEach(function(fila){
            fila.forEach(function(tile){
                tile.Draw(ctx);
            });
        });
       
    },
    
}


class Tile {
    //determina si esa baldosa se puede caminar por encima
    walkable = null;
    //imagen de la baldosa
    img = null;
    //posicion de la baldosa
    position = {
        x : 0,
        y : 0,
    };
    //posicion de la baldosa respecto a la camara
    position_with_offset={
        x:0,
        y:0,
    };
    //cantidad de clicks
    clicks = 0;
    //dimensiones de la baldosa
    size = {
        x:15,
        y:15,
    };
    //determina si hay que renderizar la baldosa si o no
    renderizado = false;
    //guarda la referencia de las 4 baldosas colindantes
    near_Tiles = new Array();
    animator = null;
    //0 = agua, 1 = tierra ,2 = cespez, 3 = orilla, 4 =clicks
    kind_of_tile=1;
    //posicion del tile en la img
    tile_position={
        x:0,
        y:0,
    };
    collider = {
        x:0,
        y:0,
        w:0,
        h:0,
    };
    up_hitbox = false;

    transfer_clicks = function() {
        for(var i = 0;i < this.near_Tiles.length;i++){
            if(this.near_Tiles[i] != null){
                if(this.clicks > 500 && this.clicks/2 > 100){
                    this.near_Tiles[i].clicks = this.clicks/2;
                    this.near_Tiles[i].walkable = true;
                    this.near_Tiles[i].kind_of_tile=4;
                    this.near_Tiles[i].select_kind_of_Tile();

                }
            }
        }
    };
    transfer_green = function(){
        for(var i = 0;i < this.near_Tiles.length;i++){
            if(this.near_Tiles[i] != null){
                if(this.kind_of_tile == 2){
                    if(this.near_Tiles[i] != 0){
                        if(Math.floor(Math.random() * 100) < 40){
                            this.near_Tiles[i].kind_of_tile=2;
                            this.near_Tiles[i].walkable = true;
                            this.near_Tiles[i].select_kind_of_Tile();
                        }

                    }
                   
                        
                }
            }
        }

    };
    transfer_water = function(){
        for(var i = 0;i < this.near_Tiles.length;i++){
            if(this.near_Tiles[i] != null){
                if(this.kind_of_tile == 0){
                    if(Math.floor(Math.random() * 100) < 20){
                        this.near_Tiles[i].kind_of_tile=0;
                        this.near_Tiles[i].walkable = false;
                        this.near_Tiles[i].select_kind_of_Tile();
                    }
                        
                }
            }
        }

    };
    
    //constructor de la clase
    constructor(position , kind_of_tile,clicks){
        this.walkable = kind_of_tile != 0 ? true : false;
        this.position.x = this.size.x * position.x * my_camera.zoom;
        this.position.y = this.size.y * position.y * my_camera.zoom;
        this.kind_of_tile = kind_of_tile;
        this.clicks = clicks;
        this.img = Tiles_world_img;
        this.select_kind_of_Tile();
        this.animator = new Animation();
        this.animator.Start(this.img, 57, 31, {x:15,y:15},1);
        this.collider.w = 45;
        this.collider.h = 45;
        

    };
    Update = function(deltaTime){

        this.position_with_offset.x = this.position.x + my_camera.offset.x;
        this.position_with_offset.y = this.position.y + my_camera.offset.y;
        
        this.collider.x = this.position.x + 5;
        this.collider.y = this.position.y + 5;
        

    };
    Draw = function(ctx) {
        if(this.position_with_offset.x >= (-this.size.x * my_camera.zoom) && this.position_with_offset.y >= (-this.size.y * my_camera.zoom) && this.position_with_offset.x <= canvas.width && this.position_with_offset.y <=canvas.height){
            this.animator.print_a_frame(ctx,{x:this.position_with_offset.x,y:this.position_with_offset.y},this.tile_position,{x:2,y:2});
                //ctx.drawImage(this.img, 85, 0, 15, 15, this.position_with_offset.x,this.position_with_offset.y, 64 * my_camera.zoom, 64 * my_camera.zoom);
            this.renderizado = true;
        }else{
            this.renderizado = false;
        }
      

     };
     select_kind_of_Tile = function(){
         if(this.clicks == 0){
             if(this.kind_of_tile == 0)
             {
                 var random_tile_of_kind = Math.floor(Math.random() * 2);
                 switch(random_tile_of_kind){
                     case 0:
                        this.tile_position = {x:0,y:0}; 
                     break;
                     case 1:
                        this.tile_position = {x:1,y:0};
                     break;
                 };
             }else if(this.kind_of_tile == 1)
             {
                var random_tile_of_kind = Math.floor(Math.random() * 2);
                switch(random_tile_of_kind){
                    //TIERRA
                    case 0:
                        this.tile_position = {x:6,y:0};
                    break;
                    case 1:
                        this.tile_position = {x:6,y:1};
                    break;
                };
            }else if(this.kind_of_tile == 2)
            {
               var random_tile_of_kind = Math.floor(Math.random() * 11);
               switch(random_tile_of_kind){
                   //CESPEZ
                   case 0:
                      this.tile_position = {x:5,y:0}; 
                   break;
                   case 1:
                      this.tile_position = {x:5,y:1};
                   break;
                   case 2:
                      this.tile_position = {x:5,y:0}; 
                   break;
                   case 3:
                      this.tile_position = {x:5,y:1};
                   break;
                   case 4:
                      this.tile_position = {x:5,y:0}; 
                   break;
                   case 5:
                      this.tile_position = {x:5,y:1};
                   break;
                   case 6:
                      this.tile_position = {x:5,y:0}; 
                   break;
                   case 7:
                      this.tile_position = {x:5,y:1};
                   break;
                   //FLORES
                   case 8:
                       this.tile_position = {x:3,y:7};
                   break;
                   case 9:
                       this.tile_position = {x:3,y:10};
                   break;
                   case 10:
                       this.tile_position = {x:3,y:13};
                   break;
               };
           }

         }else if(this.kind_of_tile == 4)
        {
            if(this.clicks > 1000)
            {
                this.tile_position={x:11,y:14};
            }else if(this.clicks > 500)
            {
                this.tile_position={x:11,y:11};
            }else
            {
                this.tile_position={x:11,y:8};
            }
        }


     };


}
