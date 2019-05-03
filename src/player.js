class Player {
    img = null;
    position = {
        x : 0,
        y : 0,
    };
    clicks = 0;
    speed = 20;
    animate = new Animation();

    Start = function() {
        this.img = player_img;
        this.animate.Start(this.img, 4, 4, {x:12,y:12});

    };
    Update = function(deltaTime) {

    };
    Draw = function(ctx) {
        

    };
}
