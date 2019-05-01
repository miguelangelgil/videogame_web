playership={
    img : null,
    position: {
        x:0,
        y:0
    },
    velocity:100,
    rotation: -Math.PI/2,
    shotCadency: 0.001,
    shotCadencyAux: 0,
    cannonPosition: null,

    laserSfx: null,

    bulletPool: {
        bulletArray: [],
        initialSize: 3,
        bulletCount: 0,

        Start: function() {
            this.bulletArray = [];
            for(var i=0;i < this.initialSize;i++) {
                var bullet = new createBullet();
                bullet.index = i;
                bullet.sprite = bulletImg;
                this.bulletArray.push(bullet); 
            }


        },
        Update: function(deltaTime) {
            for(var i =0 ;i < this.bulletArray.length;i++)
            {
                var bullet = this.bulletArray[i];
                
                if(bullet.active)
                {
                    bullet.Update(deltaTime);

                    if(bullet.position.y < 0)
                    {
                        this.DisableBullet(bullet);
                    }
                }
                        

            };
            
        },
        Draw: function(ctx) {
            this.bulletArray.forEach(function(bullet){
                if(bullet.active)
                    bullet.Draw(ctx);
            });

        },

        EnableBullet: function() {
            var found = false;
            var i = 0;
            while(!found && i < this.bulletArray.length) {
                if(!this.bulletArray[i].active) {
                    found = true;
                    bullet = this.bulletArray[i];  
                 }
                 else
                    i++;
            }

             if(!found) {
                 //creamos una nueva bala si no tenemos libres en el array
                 bullet = new createBullet();
                 bullet.index = this.bulletArray.length;
                 bullet.sprite = bulletImg;
                 this.bulletArray.push(bullet);

             }
             this.bulletCount++;
        
            return bullet;

        },
        DisableBullet: function(bullet) {
            this.bulletCount--;
            bullet.active = false;

        },

    },

    Start: function() {
        this.img = playershipImg;

        this.laserSfx = document.getElementById("laser");

        this.position = {
            x:(canvas.width/2)-playershipImg.width/2,
            y:canvas.height - 100
        }

        
        this.cannonPosition = {
            x: this.img.width / 2 - bulletImg.width / 2,
            y: 0

        }

        this.bulletPool.Start();


    },

    Update: function(deltaTime){
        this.shotCadencyAux -= deltaTime;

        if(input.isKeyPressed(KEY_RIGHT)) {
            //right
            if(this.position.x < canvas.width - playershipImg.width)
                    this.position.x += this.velocity * deltaTime;

        }
        else if(input.isKeyPressed(KEY_LEFT)) {
            //left
            if(this.position.x > 0)
            this.position.x -= this.velocity * deltaTime;

        }
        if(input.isKeyPressed(KEY_UP) && this.shotCadencyAux <= 0 ) {
            var bullet = this.bulletPool.EnableBullet();
            bullet.position.y = this.position.y + this.cannonPosition.y; //+ this.img.height/2;
            bullet.position.x = this.position.x + this.cannonPosition.x;
            bullet.rotation = this.rotation;
            bullet.velocity = 1000;
            bullet.active = true;
            this.laserSfx.currentTime = 0.23;
            this.laserSfx.play();
            this.shotCadencyAux= this.shotCadency;
            
            
           
        }//shoot
        
        this.bulletPool.Update(deltaTime);

    },
    Draw: function(ctx) {

        this.bulletPool.Draw(ctx);

        ctx.drawImage(this.img,this.position.x,this.position.y);

        ctx.fillStyle="white";
        ctx.font="12px Comic SansMs";
        ctx.fillText('bullet Count' + this.bulletPool.bulletCount,10,32);
        ctx.fillText('pool size' + this.bulletPool.bulletArray.length,10,52);
    }

};

function createBullet() {
    this.index = -1;
    this.position = {x:0, y:0 };
    this.rotation = 0;
    this.velocity= 0;
    this.active = false;
    this.damage = 0;
    this.sprite = null;

    this.Update = function(deltaTime) {

        this.position.x += this.velocity * deltaTime * Math.cos(this.rotation);
        this.position.y += this.velocity * deltaTime * Math.sin(this.rotation);

    };
    this.Draw = function(ctx) {
        
        ctx.drawImage(this.sprite, this.position.x, this.position.y);

    };
    
}
