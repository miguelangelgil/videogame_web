function BulletPoolDrawer(ctx)
    {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "red";
        for(var i = 0; i < playership.bulletPool.bulletArray.length;i++) {
            if(playership.bulletPool.bulletArray[i].active)
            {
                ctx.fillRect(10 + (10 * i),60,10,10);

            }
            ctx.strokeRect( 10 + ( 10 * i), 60, 10, 10);
        }
    }


function cuadradoPerfecto(numero) {
    return (Math.sqrt(numero) % 1 === 0);

}