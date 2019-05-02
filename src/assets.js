let tile_grass_img;
let tile_clicks_img;
let player_img;

async function load_tiles_img(){
    tile_grass_img = new Image();
    tile_clicks_img = new Image();

    tile_grass_img.src = await '../assets/tile_sin_clicks.png';
    tile_clicks_img.src = await '../assets/tile_con_clicks.png';
    return true    
}

async function load_player_img(){
    player_img = new Image();

    player_img.src = await '../assets/george.png';
    return true;
    
    
}

async function load_all_img(){
    tile_grass_img = new Image();
    tile_clicks_img = new Image();
    player_img = new Image();

    tile_grass_img.src = await '../assets/tile_sin_clicks.png';
    tile_clicks_img.src = await '../assets/tile_con_clicks.png';
    player_img.src = await '../assets/george.png';

}