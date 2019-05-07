class Player {
    img = null;
    position = {
        x : 0,
        y : 0,
    };
    clicks = 0;
    speed = 20;
    animate = new Animation();
    controls = new Controls();

    Start = function() {
        this.img = player_img;
        this.animate.Start(this.img, 4, 4, {x:55,y:55});

    };
    Update = function(deltaTime) {
        if(this.position.x < canvas.width - playershipImg.width)
                  

        if(input.isKeyPressed(this.controls.up)) {
            if(this.position.y > world.world_corners[0].position.y)
                this.position.y -= this.speed * deltaTime;
            
        } 
        else if(input.isKeyPressed(this.controls.down)) {
            if(this.position.y < world.world_corners[1].position.y)
                this.position.y += this.speed * deltaTime;

        }
        if(input.isKeyPressed(this.controls.left)) {
            if(this.position.x > world.world_corners[2].position.x)
                this.position.x -= this.speed * deltaTime;
            
        } 
        else if(input.isKeyPressed(this.controls.right)) {
            if(this.position.x < world.world_corners[3].position.x)
                this.position.x += this.speed * deltaTime;

        }

        

    };
    Draw = function(ctx) {
        this.animate.animate(ctx,0);


    };
}
