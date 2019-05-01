
const PI2 = Math.PI*2;
var canvas;
var ctx;

var deltaTime = 0;
var targetDT = (1/60) *1000;
var targetDTSeconds = (1/60);

var currentDT;

var gamePause = false;

var stars;
var invaders;
var playership;

var invaderImg;
var playershipImg;
var auxLastInput;
var time = 0,
    fps=0,
    frames=0,
    acumDelta=0;

var bulletImg;

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

        bulletImg = new Image();
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
        };
        
    }
}

function Start ()
{
    //console.log("Start");
    currentDT = new Date().getTime();

    //create playership
   playership.Start();
    // create the stars
    stars = new Array();
    for (var i = 0; i < 17; i++)
    {
        var star = {
            position: {
                x: Math.random() * canvas.width,
                y: Math.random() * 400
            },
            radius: 1 + Math.random() * 3,
            velocity: 20 + Math.random() * 20,
            Draw: function (ctx) {
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = "white";
                ctx.fill();
            },
            Update: function () {
                this.position.x += this.velocity * deltaTime * 0.001;
                this.position.x = this.position.x % canvas.width;
            }
        };

        stars.push(star);
    }
    //crear enemigos
    invaders = new Array();
    var invader={
        img: invaderImg,
        position: {
            x: Math.random() * canvas.width,
            y: Math.random() * 400

    },
    rotation: 0,
    velocity:30,
    rotVelocity: 0.5,
    yDespA:0.2,
    yDespB:2,
    radius:0,
    radius2:0,

    imgHalfWidth: this.invaderImg.width/2,
    imgHalfHeight: this.invaderImg.height/2,
    
    Start: function() {
        this.radius = Math.sqrt((this.imgHalfHeight * this.imgHalfHeight) + (this.imgHalfWidth * this.imgHalfWidth));

        this.radius2 = this.radius * this.radius;


    },


    Update: function(deltaTime)
    {
        this.position.x += this.velocity * deltaTime;
        this.position.y += Math.cos(this.position.x * this.yDespA) * this.yDespB;
        this.rotation += this.rotVelocity * PI2* deltaTime;
        if(this.position.x >= canvas.width - this.img.width ||
            this.position.x <= 0.0)
        {
            this.velocity = -this.velocity;
            this.position.y += 10;
        }


    },
    Draw: function(ctx)
    {
        ctx.save();

        ctx.translate(this.position.x ,this.position.y );
        ctx.rotate(this.rotation);
        ctx.fillStyle = 'rgba(255,0,0,0.3)';
        ctx.strocKeStyle = 'red';
        ctx.fillRect(-this.imgHalfWidth,-this.imgHalfHeight,this.img.width,this.img.height);
        ctx.drawImage(this.img,-this.imgHalfWidth,-this.imgHalfHeight);

        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,255,0,0.3)';
        ctx.arc(0,0,this.radius,0,2*Math.PI);
        ctx.fill();

        ctx.restore();



    }
    };
    invader.Start();
    invaders.push(invader);
}

function Loop ()
{
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

    Update(deltaTime / 1000);
    Draw();
}

function Update (deltaTime)
{
    
    
    
    if(input.isKeyPressed(KEY_PAUSE))
    {
        gamePause = !gamePause;
        lastPress = null;
    }


    if(gamePause)
        return;

    playership.Update(deltaTime);
    
    // stars
    stars.forEach(function(star) {
        star.Update();
    });
    invaders.forEach(function(invader) {
        invader.Update(deltaTime);
    });

    //check collisions
    //debugger;
    for(var i = 0; i < playership.bulletPool.bulletArray.length;i++) {
        var bullet = playership.bulletPool.bulletArray[i];
        if(bullet.active) {
            for(var j = 0;j < invaders.length;j++) {
                if(PointInsideCircle(invaders[j].position, invaders[j].radius2, bullet.position)) {
                    playership.bulletPool.DisableBullet(bullet);
                }

            }

        }
    }
}

function Draw ()
{
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background gradient
    var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0.0, "black");
    grd.addColorStop(0.8, "#2b3f65");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // stars
    stars.forEach(function(star) {
        star.Draw(ctx);
    });
    invaders.forEach(function(invader) {
        invader.Draw(ctx);
    });

    //playership
    playership.Draw(ctx);

    //Pause screen
    if(gamePause)
    {
        ctx.textAlign = 'center';
        ctx.font="40px Comic Sans MS";
        ctx.fillText('PAUSE', canvas.width/2, 200);
        ctx.textAlign = 'left';

    }
    //FPS
    ctx.fillStyle = "white";
    ctx.font="10px Comic Sans MS"
    ctx.fillText('FPS: ' + fps, 10, 14);
    this.BulletPoolDrawer(ctx);

}

