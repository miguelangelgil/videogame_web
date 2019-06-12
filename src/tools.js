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
    works={
        mine:true,
        build:false,
        atack:false,

    };

}

class Hammer{
    time_to_make_work = 2;
    works={
        mine:false,
        build:true,
        atack:false,

    };

}
