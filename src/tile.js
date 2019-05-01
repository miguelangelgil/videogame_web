let tile={

    walkable : null,
    img : null,
    position:{
        x : 0,
        y : 0,
    },
    clicks : 0,

    Start : function(walkable , position , clicks){

        this.walkable = walkable;
        this.position = position;
        this.clicks = clicks;

    },
    Update : function(deltaTime){
        if(clicks == 0){img = null;}//null hay que sustituirlo por link de imagen de baldosa con clicks
        else{img = null;}//null hay que sustituirlo por link de imagen de baldosa sin clicks


    },
    Draw : function(ctx) {

     }


}
