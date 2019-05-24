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
                my_tile = new Tile();
                if(Math.floor(Math.random() * 100)+1 <= this.amount_of_clicks)
                    my_tile.Start(true,{x:this.position_array.x,y:this.position_array.y},Math.floor(Math.random() * 1000));
                else
                    my_tile.Start(true,{x:this.position_array.x,y:this.position_array.y},0);
                this.tile_world[this.position_array.x][this.position_array.y] = my_tile;
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
        this.tile_world.forEach(function(fila){
            fila.forEach(function(Tile){
                Tile.transfer_clicks();
            });
        });
        //this.tile_world[0][0].transfer_clicks();
    },
    Start: function(size, amount_of_clicks){
        this.size.x = size.x;
        this.size.y = size.y;
        this.amount_of_clicks = amount_of_clicks;
    },
    Update: function(deltaTime){
        this.tile_world.forEach(function(fila){
            fila.forEach(function(tile){
                tile.Update(deltaTime);
            });
        });

    },
    Draw: function(ctx){
        //this.tile_world[0,0].Draw(ctx);
        for(var x = 0; x < this.size.x; x++){
            for(var y = 0; y < this.size.y; y++){
                
                this.tile_world[x][y].Draw(ctx);
            }
        }
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
        x:64,
        y:64,
    };
    //determina si hay que renderizar la baldosa si o no
    renderizado = false;
    //guarda la referencia de las 4 baldosas colindantes
    near_Tiles = new Array();

    transfer_clicks = function() {
        for(var i = 0;i < this.near_Tiles.length;i++){
            if(this.near_Tiles[i] != null){
                if(this.clicks > 500 && this.clicks/2 > 100)
                    this.near_Tiles[i].clicks = this.clicks/2;

                this.near_Tiles[i].select_kind_of_Tile();
                
                //this.near_Tiles[i].transfer_clicks();
            }
        }
    };

    Start = function(walkable , position , clicks){

        this.walkable = walkable;
        this.position.x = this.size.x * position.x;
        this.position.y = this.size.y * position.y;
        this.clicks = clicks;
        this.select_kind_of_Tile();
        

    };
    Update = function(deltaTime){

        this.position_with_offset.x = this.position.x + my_camera.offset.x;
        this.position_with_offset.y = this.position.y + my_camera.offset.y;
        

    };
    Draw = function(ctx) {
        if(this.position_with_offset.x >= (-this.size.x) && this.position_with_offset.y >= (-this.size.y) && this.position_with_offset.x <= canvas.width && this.position_with_offset.y <=canvas.height){
            ctx.drawImage(this.img,this.position_with_offset.x,this.position_with_offset.y);
            this.renderizado = true;
        }else{
            this.renderizado = false;
        }
            


     };
     select_kind_of_Tile = function(){
        if(this.clicks == 0){this.img = Tile_grass_img;}//null hay que sustituirlo por link de imagen de baldosa con clicks
        else{this.img = Tile_clicks_img;}//null hay que sustituirlo por link de imagen de baldosa sin clicks


     };


}
