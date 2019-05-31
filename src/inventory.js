class Inventory{
    //cantidad de clicks que tiene el jugador
    clicks = 0;
    //cantidad de huecos que tiene el inventario
    spaces= 18;
    //referencia a los items del inventario
    items=Array(18);
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
    //constructor de la clase
    constructor(dimensions_inventory_ui, dimensions_inventory_ui_open){
        this.dimensions_inventory_ui = dimensions_inventory_ui;
        this.dimensions_inventory_ui_open = dimensions_inventory_ui_open;
        this.dimension_a_scuare.w = (dimensions_inventory_ui.w/this.n_items_in_down_bar)-5 * this.n_items_in_down_bar; 
        this.dimension_a_scuare.h = dimensions_inventory_ui.h - 10;
    }

    Update = function(deltaTime){

    };

    Draw = function(ctx){
        //dependiendo de si esta abierto el inevntario se pinta una cosa u otra
        if(this.open){

            ctx.fillStyle='rgba(218, 218, 218  ,0.5)';
            ctx.fillRect(this.dimensions_inventory_ui_open.x,this.dimensions_inventory_ui_open.y,this.dimensions_inventory_ui_open.w,this.dimensions_inventory_ui_open.h);
            for(var y = 0; y < this.spaces/this.n_items_in_down_bar; y++){
                for(var x = 0;x < this.n_items_in_down_bar;x++){
                    if(this.items[x*(y+1)] != null){
                        this.items[x*(y+1)].Draw();
                    }
                    if(this.foco == x*(y+1))
                        ctx.fillStyle='rgba(248, 245, 245  ,0.5)';
                    else
                        ctx.fillStyle='rgba(137, 137, 137  ,0.5)';
                    ctx.fillRect(this.dimensions_inventory_ui_open.x + (this.dimension_a_scuare.w + 5)*x,this.dimensions_inventory_ui_open.y + (this.dimension_a_scuare.h + 5)*y ,this.dimension_a_scuare.w,this.dimension_a_scuare.h);
    

                }

            }



        }else{
            ctx.fillStyle='rgba(218, 218, 218  ,0.5)';
            ctx.fillRect(this.dimensions_inventory_ui.x,this.dimensions_inventory_ui.y,this.dimensions_inventory_ui.w,this.dimensions_inventory_ui.h);
            for(var i = 0;i < this.n_items_in_down_bar;i++){
                if(this.items[i] != null){
                    this.items[i].Draw();
                }
                if(this.foco == i)
                    ctx.fillStyle='rgba(248, 245, 245  ,0.5)';
                else
                    ctx.fillStyle='rgba(137, 137, 137  ,0.5)';
                ctx.fillRect(this.dimensions_inventory_ui.x + (this.dimension_a_scuare.w + 5)*i,this.dimensions_inventory_ui.y,this.dimension_a_scuare.w,this.dimension_a_scuare.h);

            }
        }
        
    };
}