//en este ecript se guardan todos los recursos graficos en variables globales para poder acceder desde cualquier lugar, se cargan de forma asincrona y cuando acaban de cargar todos los recursos devuelve un true


let Tile_grass_img;
let Tile_clicks_img;
let Tiles_world_img;
let Tile_tools;
let player_img;

async function load_Tiles_img(){
    Tile_grass_img = new Image();
    Tile_clicks_img = new Image();
    Tiles_world_img = new Image();
    Tile_tools = new Image();

    Tile_grass_img.src = await '../assets/Tile_sin_clicks.png';
    Tile_clicks_img.src = await '../assets/Tile_con_clicks.png';
    Tiles_world_img.src = await '../assets/tilesworld.png';
    Tile_tools.src = await '../assets/tools.png';
    return true    
}

async function load_player_img(){
    player_img = new Image();

    player_img.src = await '../assets/george.png';
    return true;
    
    
}

async function load_all_img(){
    Tile_grass_img = new Image();
    Tile_clicks_img = new Image();
    Tiles_world_img = new Image();
    player_img = new Image();
    Tile_tools = new Image();

    Tile_grass_img.src = await '../assets/Tile_sin_clicks.png';
    Tile_clicks_img.src = await '../assets/Tile_con_clicks.png';
    Tiles_world_img.src = await '../assets/tilesworld.png';
    player_img.src = await '../assets/george.png';
    Tile_tools.src = await '../assets/tools.png';
    
    return true;

}