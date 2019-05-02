let player = {
    img : null,
    position : {
        x : 0,
        y : 0,
    },
    clicks : 0,
    speed : 20,
    animate = new animation(),

    Start : function() {
        img = player_img;
        animate.Start(img, 4, 4, {x:12,y:12});

    } ,
    Update : function(deltaTime) {

    },
    Draw : function(ctx) {

    }
}
