class Inventory{
    //cantidad de clicks que tiene el jugador
    clicks = 0;
    //cantidad de huecos que tiene el inventario
    spaces= 18;
    //referencia a los items del inventario
    items=Array(6);
    shop = Array(4);
    //cantidad de items que se ven en el inventario cuando esta cerrado
    n_items_in_down_bar = 6;
    //que espacio del inventario esta seleccionado
    foco = 0;
    //inidca si el inventario esta cerrado o abierto
    open = false;
    //dimensiones del inventaripo que es una barra en la parte invferior de la pantalla
    dimensions_inventory_ui={
        x:0,
        y:0,
        w:0,
        h:0,
    };
    //dimensiones del inevntario cuando se habre el inventario grande
    dimensions_inventory_ui_open={
        x:0,
        y:0,
        w:0,
        h:0,
    };
    //dimensiones del espacio que ocupa cada item en el inventario
    dimension_a_scuare ={
        w:0,
        h:0,
    }; 
    //audio de fondo
    soundtrack;
    is_sound_playing = true;
    //constructor de la clase

    Start = function()
    {   
        this.soundtrack = document.getElementById("soundtrack");
        for(var i = 0; i < this.shop.length;i++)
        {
            this.shop[i] = new Pick();
            this.shop[i].Start_animate(i);
        }
        this.soundtrack.volume = 0.4;
        this.soundtrack.loop = true;
        this.soundtrack.play();

    };

    Update = function(deltaTime){
        this.dimensions_inventory_ui = {x:(canvas.width/2) - 400,y:canvas.height - 100,w:800,h:100};
        this.dimensions_inventory_ui_open =  {x:(canvas.width/2)-100, y:(canvas.height/2) - 80,w:200,h:150};
        this.dimension_a_scuare.w = (this.dimensions_inventory_ui.w/this.n_items_in_down_bar)-5 * this.n_items_in_down_bar; 
        this.dimension_a_scuare.h = this.dimensions_inventory_ui.h - 2;
        if(input.isKeyPressed(KEY_M))
        {
            if(this.is_sound_playing) 
            {
                this.soundtrack.pause();
                this.soundtrack.currentTime = 0;
                this.is_sound_playing = false;
            }else
            {
                this.soundtrack.play();
                this.is_sound_playing = true;
            }
        }
        

    };
    Draw = function(ctx){
        //si está abierto se pinta la tienda
        if(this.open){

            ctx.fillStyle='rgba(218, 218, 218  ,0.5)';
            ctx.fillRect(this.dimensions_inventory_ui_open.x,this.dimensions_inventory_ui_open.y,(this.dimension_a_scuare.w +5) * 4,this.dimensions_inventory_ui_open.h);
            
            for(var i = 0;i < this.shop.length;i++){
                if(this.shop[i] != null){
                    this.shop[i].Draw(ctx, {x:this.dimensions_inventory_ui_open.x + (this.dimension_a_scuare.w + 5)*i,y: this.dimensions_inventory_ui_open.y}); //(ctx,world_position,sprite_position,space_between_frames)
                    ctx.textAlign = 'left';
                    ctx.fillStyle = this.shop[i].price <= this.clicks ? "black" : 'red';
                    ctx.font="10px Comic Sans MS"
                    ctx.fillText('Price: ' + this.shop[i].price +' clicks',this.dimensions_inventory_ui_open.x + (this.dimension_a_scuare.w + 5)*i , this.dimensions_inventory_ui_open.y + this.dimension_a_scuare.h + 10);
                }
                ctx.fillStyle='rgba(137, 137, 137  ,0.5)';
                ctx.fillRect(this.dimensions_inventory_ui_open.x + (this.dimension_a_scuare.w + 5)*i,this.dimensions_inventory_ui_open.y ,this.dimension_a_scuare.w,this.dimension_a_scuare.h);


            }

            


            //si está cerrado se pinta el inventario
        }else{
            ctx.fillStyle='rgba(218, 218, 218  ,0.5)';
            ctx.fillRect(this.dimensions_inventory_ui.x,this.dimensions_inventory_ui.y,this.dimensions_inventory_ui.w,this.dimensions_inventory_ui.h);
            for(var i = 0;i < this.n_items_in_down_bar;i++){
                if(this.items[i] != null){

                    if(i==0)
                    {
                        this.items[i].Draw(ctx, {x:this.dimensions_inventory_ui.x + (this.dimension_a_scuare.w/2),y: this.dimensions_inventory_ui.y});
                        ctx.textAlign = 'left';
                        ctx.fillStyle = this.items[i].n_applications >= 10 ? "black" : 'red';
                        ctx.font="10px Comic Sans MS"
                        ctx.fillText(this.items[i].n_applications,this.dimensions_inventory_ui.x + (this.dimension_a_scuare.w/2) , this.dimensions_inventory_ui.y + this.dimension_a_scuare.h);
                    }
                        
                    else
                    {
                        this.items[i].Draw(ctx, {x:this.dimensions_inventory_ui.x + (this.dimension_a_scuare.w/2) + (this.dimension_a_scuare.w + 5)*i,y: this.dimensions_inventory_ui.y});   
                        ctx.textAlign = 'left';
                        ctx.fillStyle = this.items[i].n_applications >= 10 ? "black" : 'red';
                        ctx.font="10px Comic Sans MS"
                        ctx.fillText(this.items[i].n_applications,this.dimensions_inventory_ui.x + (this.dimension_a_scuare.w/2) + (this.dimension_a_scuare.w + 5)*i , this.dimensions_inventory_ui.y + this.dimension_a_scuare.h);

                    }
                    if(this.items[i].n_applications <= 0)
                        this.items[i] = null;
                                    
                }
                if(this.foco == i)
                    ctx.fillStyle='rgba(248, 245, 245  ,0.5)';
                else
                    ctx.fillStyle='rgba(137, 137, 137  ,0.5)';
                if(i==0)
                    ctx.fillRect(this.dimensions_inventory_ui.x + (this.dimension_a_scuare.w/2),this.dimensions_inventory_ui.y,this.dimension_a_scuare.w,this.dimension_a_scuare.h);
                else
                    ctx.fillRect(this.dimensions_inventory_ui.x + (this.dimension_a_scuare.w/2) + (this.dimension_a_scuare.w + 5)*i,this.dimensions_inventory_ui.y,this.dimension_a_scuare.w,this.dimension_a_scuare.h);

            }
        }
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.font="20px Comic Sans MS"
        ctx.fillText('Clicks: ' + this.clicks, 10, 20);
        
    };
}