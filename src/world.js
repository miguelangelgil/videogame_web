let world = {
    size:{
        x:0,
        y:0,
    },
    position_array:{
        x:0,
        y:0,
    },
    tile_world:[,],
    build_world: function(){
        for(this.position_array.x = 0; this.position_array.x < this.size.x; this.position_array.x++){
            for(this.position_array.y = 0; this.position_array.y < this.size.y; this.position_array.y++){
                my_tile = new tile();
                my_tile.Start(true,{x:this.position_array.x,y:this.position_array.y},0);
                this.tile_world[this.position_array.x,this.position_array.y] = my_tile;
            }
        }

        for(this.position_array.x=0; this.position_array.x < this.size.x; this.position_array.x++){
            for(this.position_array.y=0;this.position_array.y < this.size.y; this.position_array.y++){
                if(this.position_array.x != 0)
                    this.tile_world[this.position_array.x,this.position_array.y].near_tiles[0] = this.tile_world[this.position_array.x-1,this.position_array.y];
                else
                    this.tile_world[this.position_array.x,this.position_array.y].near_tiles[0] = null;

                if(this.position_array.y != this.size.y - 1)
                    this.tile_world[this.position_array.x,this.position_array.y].near_tiles[1] = this.tile_world[this.position_array.x,this.position_array.y+1];
                else
                    this.tile_world[this.position_array.x,this.position_array.y].near_tiles[1] = null;

                if(this.position_array.x != this.size.x - 1)
                    this.tile_world[this.position_array.x,this.position_array.y].near_tiles[2] = this.tile_world[this.position_array.x+1,this.position_array.y];
                else
                    this.tile_world[this.position_array.x,this.position_array.y].near_tiles[2] = null;

                if(this.position_array.y != 0)
                    this.tile_world[this.position_array.x,this.position_array.y].near_tiles[3] = this.tile_world[this.position_array.x,this.position_array.y - 1];
                else
                    this.tile_world[this.position_array.x,this.position_array.y].near_tiles[3] = null;
            }   
        }
    },
    
}


let tile={

    walkable : null,
    img : null,
    position:{
        x : 0,
        y : 0,
    },
    clicks : 0,
    size:{
        x:0,
        y:0,
    },
    near_tiles:[],

    transfer_clicks : function() {
        this.near_tiles.forEach(function(element){
            if(this.clicks > 500 && this.clicks/2 > 100){
                element.clicks = this.clicks/2;
                element.transfer_clicks();

            }
                
        });
    },

    Start : function(walkable , position , clicks){

        this.walkable = walkable;
        this.position.x = this.size.x * position.x;
        this.position.y = this.size.y * position.y;
        this.clicks = clicks;

    },
    Update : function(deltaTime){
        if(clicks == 0){img = tile_grass_img;}//null hay que sustituirlo por link de imagen de baldosa con clicks
        else{img = tile_clicks_img;}//null hay que sustituirlo por link de imagen de baldosa sin clicks


    },
    Draw : function(ctx) {


     }


}
