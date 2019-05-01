//nos suscrivimos a evento de resize (cada vez que se lance se ejecutará la funcion resize)
window.addEventListener("resize", resize);
//se lanza de primeras para que el canvas tenga valores iniciales
resize();



function resize(){
    var window_width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    canvas.width = window_width;
    canvas.height = (window_width* ASPECT_RATIO.height)/ASPECT_RATIO.width;
}

