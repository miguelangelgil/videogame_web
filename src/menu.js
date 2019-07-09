class Menu
{
    canvas;
    play = new Button('Play',{x:/*this.canvas.width/2*/100,y:/*this.canvas.height/2*/100},{w:30,h:10});
    

    constructor(canvas)
    {
    
        this.canvas = canvas;
    }

    Update = function()
    {
        this.play.Update();

        this.Draw();
    }

    Draw = function(ctx)
    {
        //debugger;
        this.play.Draw(ctx);
        ctx.fillStyle="blue";
        ctx.fillRect(0, 0, 100, 100);


    }

}
class Button
{
    text = '';
    position={x:0,y:0};
    dimensions ={w:0,h:0};
    foco = false;
    constructor(text,position,dimensions)
    {
        this.text = text;
        this.position = position;
        this.dimensions = dimensions;

    }
    Update = function()
    {
        if(CheckCollisionRect (input.mouse, {coord:this.position,width:this.dimensions.w, height:this.dimensions.h}))
        {
            this.foco = true;
            if(input.isMousePressed)
                Active();


        }else
        {
            this.foco = false;
        }

    }
    Draw = function(ctx)
    {
        ctx.textAlign = 'center';
        ctx.fillStyle = "white";
        ctx.font = foco ? "40px Comic Sans MS" :"30px Comic Sans MS";
        ctx.fillText(text,position);

    }
    Active = function()
    {

    }
}