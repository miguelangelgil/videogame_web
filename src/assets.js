let tile_grass_img;
let tile_clicks_img;
let player_img;

function load_tiles_img(){
    var state = false;
    tile_grass_img = new Image();
    tile_grass_img.src = '../assets/tile_sin_clicks.png';
    tile_grass_img.onload = function(){

        tile_clicks_img = new Image();
        tile_clicks_img.src = '../assets/tile_con_clicks.png';
        tile_clicks_img.onload = function(){

            state = true;
        }

        
        
    }
    return state;
}

function load_player_img(){
    var state = false;
    player_img = new Image();
    player_img.src = '../assets/george.png';
    player_img.onload = function(){
        state = true;
    }
    return state;
}