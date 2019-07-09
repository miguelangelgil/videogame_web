class Hand{
    time_to_make_work=5;
    aux_time_to_make_work=0;
    works={
        mine:true,
        build:true,
        atack:true,
    };
    Working = function(deltaTime){
        if(this.aux_time_to_make_work <= this.time_to_make_work)
            this.aux_time_to_make_work += deltaTime;
        if(this.aux_time_to_make_work >= this.time_to_make_work){
            this.aux_time_to_make_work=0;
            return true;
        }
        return false;


    };
}

class Pick{
    time_to_make_work = 2;
    aux_time_to_make_work=0;
    n_applications=0;
    quality=0;
    price = 0;
    do_once = true;
    canvas_position = {
        x:0,
        y:0,
    };
    dimensions ={
        w:30,
        h:30,
    }
    position ={
        x:0,
        y:0,
    }
    animate = new Animation();
    works={
        mine:true,
        build:false,
        atack:false,

    };

    Working = function(deltaTime){
        if(this.aux_time_to_make_work <= this.time_to_make_work)
            this.aux_time_to_make_work += deltaTime;
        if(this.aux_time_to_make_work >= this.time_to_make_work){
            this.aux_time_to_make_work=0;
            this.n_applications--;
            return true;
        }
        return false;


    };
    Start_animate = function(quality)
    {
        this.animate.Start(Tile_tools, 4, 6, {x:30,y:30},60);
        this.animate.extra_zoom = 2;
        this.quality = quality;
        switch(this.quality)
        {
            case 0:
            this.time_to_make_work=2;
            this.canvas_position={x:0,y:0};
            this.n_applications = 20;
            this.price=1;
            break;
            case 1:
            this.time_to_make_work=1.5;
            this.canvas_position={x:1,y:0};
            this.n_applications = 40;
            this.price = 20;
            break;
            case 2:
            this.time_to_make_work=1;
            this.canvas_position={x:0,y:1};
            this.n_applications = 80;
            this.price = 30;
            break;
            case 3:
            this.time_to_make_work=0.5;
            this.canvas_position={x:1,y:1};
            this.n_applications = 160;
            this.price = 40;
            break;
        }
    }
    Draw = function(ctx, position)
    {
        if(this.do_once)
            this.position = position;
        this.animate.print_a_frame(ctx,this.position,this.canvas_position,{x:1,y:1});

    };
    
    
    

}
