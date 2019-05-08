function Camera (player, world)
{
    this.player = player;
    this.world = world;
    this.offset = {x: 0, y: 0};
    this.limits={
        x:{
            top:null,
            bot:null,
        },
        y:{
            top:null,
            bot:null,
        },
    }
    this.zoom = 1;
}

Camera.prototype.Start = function ()
{
    if(this.player.position.x > this.limits.x.bot && this.player.position.x < this.limits.x.top || this.limits.x.top==null && this.limits.x.bot)
        this.offset.x = this.player.position.x;

    if(this.player.position.y > this.limits.y.bot && this.player.position.y < this.limits.y.top || this.limits.y.top==null && this.limits.y.bot)
        this.offset.y = this.player.position.y;
}

Camera.prototype.Update = function (deltaTime)
{

    if(this.player.position.x > this.limits.x.bot && this.player.position.x < this.limits.x.top || this.limits.x.top==null && this.limits.x.bot)
        this.offset.x = this.player.position.x;

    if(this.player.position.y > this.limits.y.bot && this.player.position.y < this.limits.y.top || this.limits.y.top==null && this.limits.y.bot)
        this.offset.y = this.player.position.y;
    
}
