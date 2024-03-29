function Camera (player, world, canvas,limits)
{
    this.player = player;
    this.world = world;
    this.canvas = canvas;
    this.offset = {x: 0, y: 0};
    this.limits= limits;
    this.zoom = 3;
}

Camera.prototype.Update = function (deltaTime)
{
    //la camara trata de ir actualizando unas coordenadas que se suman a las coordenadas de todos los objetos estáticos y así dar una impresión de movimeinto por el mundo
    if(this.player.position.x > this.canvas.width/2 + this.limits.x && this.world.world_corners[2].position_with_offset.x >= this.canvas.width){
        this.offset.x -= this.player.speed * deltaTime;
        this.player.position.x -= this.player.speed * deltaTime;
    }
    if(this.player.position.x < this.canvas.width/2 - this.limits.x && this.world.world_corners[0].position_with_offset.x <= 0){
        this.offset.x += this.player.speed * deltaTime;
        this.player.position.x += this.player.speed * deltaTime;
    }
    if(this.player.position.y > this.canvas.height/2 + this.limits.y && this.world.world_corners[1].position_with_offset.y >= this.canvas.height){
        this.offset.y -= this.player.speed * deltaTime;
        this.player.position.y -= this.player.speed * deltaTime;
    }
    if(this.player.position.y < this.canvas.height/2 - this.limits.y && this.world.world_corners[0].position_with_offset.y <= 0){
        this.offset.y += this.player.speed * deltaTime;
        this.player.position.y += this.player.speed * deltaTime;
    }
}
