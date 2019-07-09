//hand es la herramienta por defecto
class Hand{
    //tiempo para realizar una tarea
    time_to_make_work=5;
    aux_time_to_make_work=0;
    //los trabajos que se pueden realizar
    works={
        mine:true,
        build:true,
        atack:true,
    };
    //esta función es llamada desde el jugador y cuando completa el trabajo que realiza devuelve un true
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
//esta es la herramienta de pico
class Pick{
    //tiempo en realizar un trabajo
    time_to_make_work = 2;
    aux_time_to_make_work=0;
    //los usos que se le pueden dar antes de que se rompa la herramienta
    n_applications=0;
    //con esta variable controlo cual de los 4 picos es el de esta clase
    quality=0;
    //el coste del articulo en la tienda
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
    //la clase animation para usar la funcion para pintar un frame
    animate = new Animation();
    //trabajos que puede realizar
    works={
        mine:true,
        build:false,
        atack:false,

    };
    //esta función es llamada desde el jugador y cuando completa el trabajo que realiza devuelve un true
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
    //se inicia la clase animate y se aprobecha para indicar cual de los 4 picos es y se le asignan los valores en función
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
    //se recoge una vez cual va a ser la posicion del pico en el inventario por lo que no se puede cambiar de sitio hasta que se destrulla
    Draw = function(ctx, position)
    {
        if(this.do_once)
            this.position = position;
        this.animate.print_a_frame(ctx,this.position,this.canvas_position,{x:1,y:1});

    };
    
    
    

}
