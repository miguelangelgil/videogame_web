import {player as my_player} from '../src/player.js'
const PI2 = Math.PI*2;
var canvas;
var ASPECT_RATIO = {
    width : 16,
    height : 9
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

var player = null;

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
        //aqui hay que dar valores a las variables y dar rutas

        /*bulletImg = new Image();
        bulletImg.src = "../assets/bullet.png";
        bulletImg.onload = function(){

            playershipImg = new Image();
            playershipImg.src="../assets/player_ship.png";
            playershipImg.onload = function(){

                invaderImg = new Image();
                invaderImg.src="../assets/invader1.png";
                invaderImg.onload = function()
                {
                    Start();

                    //setInterval(Loop, deltaTime);
                    Loop();

                };
            };
        };*/

        Start();
        Loop();
        
    }
}

function Start (){
    player = new my_player();
    player.Start();


}
function Loop (){

}
function Update (deltaTime){

}
function Draw (){

}

