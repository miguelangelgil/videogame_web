class inventory{
    clicks = 0;
    spaces= 18;
    items=Array(18);
    n_items_in_down_bar = 6;
    foco = 0;
    open = false;
    dimensions_inventory_ui={
        x:0,
        y:0,
        w:0,
        h:0,
    };
    dimensions_inventory_ui_open={
        x:0,
        y:0,
        w:0,
        h:0,
    }
    dimension_a_scuare ={
        w:0,
        h:0,
    }; 
    constructor(dimensions_inventory_ui){
        this.dimensions_inventory_ui = dimensions_inventory_ui;
        this.dimension_a_scuare.w = (dimensions_inventory_ui.w/this.n_items_in_down_bar)-5 * this.n_items_in_down_bar; 
        this.dimension_a_scuare.h = dimensions_inventory_ui.h - 10;
    }

    Update = function(deltaTime){

    };

    Draw = function(ctx){
        if(open){

            ctx.fillStyle='rgba(218, 218, 218  ,0.5)';
            ctx.fillRect(this.dimensions_inventory_ui.x,this.dimensions_inventory_ui.y,this.dimensions_inventory_ui.w,this.dimensions_inventory_ui.h);



        }else{
            ctx.fillStyle='rgba(218, 218, 218  ,0.5)';
            ctx.fillRect(this.dimensions_inventory_ui.x,this.dimensions_inventory_ui.y,this.dimensions_inventory_ui.w,this.dimensions_inventory_ui.h);
            for(var i=0;i < this.n_items_in_down_bar;i++){
                if(this.items[i] != null){
                    this.items[i].Draw();
                }
                if(this.foco == i)
                    ctx.fillStyle='rgba(248, 245, 245  ,0.5)';
                else
                    ctx.fillStyle='rgba(137, 137, 137  ,0.5)';
                ctx.fillRect(this.dimensions_inventory_ui.x + (dimension_a_scuare + 5)*i,this.dimensions_inventory_ui.y,this.dimension_a_scuare.w,this.dimension_a_scuare.h);

            }
        }
        
    };
}