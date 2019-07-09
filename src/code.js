
const PI2 = Math.PI*2;
var canvas;
var ASPECT_RATIO = {
    width : 21,
    height : 9,
};
var ctx;

var deltaTime = 0;
var targetDT = (1/60) *1000;
var targetDTSeconds = (1/60);

var gamePause = false;

var stars;

var time = 0,
    fps=0,
    frames=0,
    acumDelta=0;

var my_player = null;
var my_world = null;
var my_camera = null;
var in_game = true;

 
window.requestAnimationFrame = (function (evt) {
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame     ||
        function (callback) {
            window.setTimeout(callback, targetDT);
        };
}) ();

canvas = document.getElementById("my_canvas");

if (canvas)
{
    ctx = canvas.getContext("2d");
    if (ctx)
    {
        
        SetupKeyboardEvents();
        SetupMouseEvents();
        
        //las funciones de carga de assets son asincronicas por lo que lo que nos devuelve es una promesa
        if(load_all_img().then((load)=>load==true)){
            setTimeout(function(){
            Start();
            Loop();
            }, 5000);
        }
        
    }
}


function Start (){
    if(in_game)
    {
        my_world = world;
        my_player = new Player();
        my_player.Start();
        my_world.Start({x:100,y:100},5,15,80);
        my_camera = new Camera(my_player,my_world,canvas,{x:20,y:20});
        my_world.build_world();

    }


}
function Loop (){
    //console.log("loop");
    requestAnimationFrame(Loop);
    
         // compute fps
    var now = Date.now();
    deltaTime = now - time;
    // si el tiempo es mayor a 1 seg: se descarta
    if (deltaTime > 1000)
        deltaTime = 0;
    time = now;
    frames++;
    acumDelta += deltaTime;
    if(acumDelta > 1000)
    {
        fps = frames;
        frames = 0;
        acumDelta -= 1000;
    }

    //var now = new Date().getTime();
    //console.log("elapsed time: " + (now - currentDT));
    //currentDT = now;
    if(in_game)
    {

        Update(deltaTime / 1000);
        Draw();

    }
   
}
function Update (deltaTime){
    my_player.Update(deltaTime);
    my_world.Update(deltaTime);
    my_camera.Update(deltaTime);

}
function Draw (){
    if(in_game)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        my_world.Draw(ctx);
        //ctx.drawImage(player_img, 0, 0, 55, 55, 0, 0, 64,64);
        my_player.Draw(ctx);

    }
    
    

}

