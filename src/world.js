let world = {
    size:{
        x:0,
        y:0,
    },
    position_array:{
        x:0,
        y:0,
    },
    tile_world: null,
    amount_of_clicks:null,

    build_world: function(){
        this.tile_world = new Array(this.size.x);
        for(var i = 0; i < this.size.x; i++)
            this.tile_world[i] = new Array(this.size.y);
        

        for(this.position_array.x = 0; this.position_array.x < this.size.x; this.position_array.x++){
            for(this.position_array.y = 0; this.position_array.y < this.size.y; this.position_array.y++){
                console.log(this.position_array.x + ", " + this.position_array.y);
                my_tile = new tile();
                if(Math.floor(Math.random() * 100)+1 <= this.amount_of_clicks)
                    my_tile.Start(true,{x:this.position_array.x,y:this.position_array.y},Math.floor(Math.random() * 1000));
                else
                    my_tile.Start(true,{x:this.position_array.x,y:this.position_array.y},0);
                this.tile_world[this.position_array.x][this.position_array.y] = my_tile;
            }
        }

        for(this.position_array.x=0; this.position_array.x < this.size.x; this.position_array.x++){
            for(this.position_array.y=0;this.position_array.y < this.size.y; this.position_array.y++){
                if(this.position_array.x != 0)
                    this.tile_world[this.position_array.x][this.position_array.y].near_tiles[0] = this.tile_world[this.position_array.x-1][this.position_array.y];
                else
                    this.tile_world[this.position_array.x][this.position_array.y].near_tiles[0] = null;

                if(this.position_array.y != this.size.y - 1)
                    this.tile_world[this.position_array.x][this.position_array.y].near_tiles[1] = this.tile_world[this.position_array.x][this.position_array.y+1];
                else
                    this.tile_world[this.position_array.x][this.position_array.y].near_tiles[1] = null;

                if(this.position_array.x != this.size.x - 1)
                    this.tile_world[this.position_array.x][this.position_array.y].near_tiles[2] = this.tile_world[this.position_array.x+1][this.position_array.y];
                else
                    this.tile_world[this.position_array.x][this.position_array.y].near_tiles[2] = null;

                if(this.position_array.y != 0)
                    this.tile_world[this.position_array.x][this.position_array.y].near_tiles[3] = this.tile_world[this.position_array.x][this.position_array.y - 1];
                else
                    this.tile_world[this.position_array.x][this.position_array.y].near_tiles[3] = null;
            }   
        }
        this.tile_world.forEach(function(fila){
            fila.forEach(function(tile){
                tile.transfer_clicks();
            });
        });
        //this.tile_world[0][0].transfer_clicks();
    },
    Start: function(size, amount_of_clicks){
        this.size.x = size.x;
        this.size.y = size.y;
        this.amount_of_clicks = amount_of_clicks;
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


class tile {

    walkable = null;
    img = null;
    position = {
        x : 0,
        y : 0,
    };
    clicks = 0;
    size = {
        x:64,
        y:64,
    };
    near_tiles = new Array();

    transfer_clicks = function() {
        for(var i = 0;i < this.near_tiles.length;i++){
            if(this.near_tiles[i] != null){
                if(this.clicks > 500 && this.clicks/2 > 100)
                    this.near_tiles[i].clicks = this.clicks/2;

                this.near_tiles[i].select_kind_of_tile();
                
                //this.near_tiles[i].transfer_clicks();
            }
        }
    };

    Start = function(walkable , position , clicks){

        this.walkable = walkable;
        this.position.x = this.size.x * position.x;
        this.position.y = this.size.y * position.y;
        this.clicks = clicks;
        this.select_kind_of_tile();

    };
    Update = function(deltaTime){
        

    };
    Draw = function(ctx) {
        ctx.drawImage(this.img,this.position.x,this.position.y);


     };
     select_kind_of_tile = function(){
        if(this.clicks == 0){this.img = tile_grass_img;}//null hay que sustituirlo por link de imagen de baldosa con clicks
        else{this.img = tile_clicks_img;}//null hay que sustituirlo por link de imagen de baldosa sin clicks


     };


}
