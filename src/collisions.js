

function PointInsideCircle (circlePosition, circleRadius2, point)
{
    var pointToCircleDistance2 = Math.sqrt(
    ((point.x - circlePosition.x) * (point.x - circlePosition.x)) +
    ((point.y - circlePosition.y) * (point.y - circlePosition.y)));
    return (pointToCircleDistance2 <= circleRadius2);
}

function CheckCollisionRect (point, rectangle)
{
    return point.x >= (rectangle.coord.x) &&
           point.x <= (rectangle.coord.x + rectangle.width) &&
           point.y >= (rectangle.coord.y) &&
           point.y <= (rectangle.coord.y + rectangle.height);
}
function CheckCollisionRectToRect(rect1, rect2)
{
    return (rect1.x >= (rect2.x) &&
    rect1.x <= (rect2.x + rect2.w) &&
    rect1.y >= (rect2.y) &&
    rect1.y <= (rect2.y + rect2.h))||
    (rect1.x + rect1.w >= (rect2.x) &&
    rect1.x + rect1.w <= (rect2.x + rect2.w) &&
    rect1.y >= (rect2.y) &&
    rect1.y <= (rect2.y + rect2.h))||
    (rect1.x >= (rect2.x) &&
    rect1.x <= (rect2.x + rect2.w) &&
    rect1.y + rect1.h >= (rect2.y) &&
    rect1.y + rect1.h <= (rect2.y + rect2.h))||
    (rect1.x + rect1.w >= (rect2.x) &&
    rect1.x + rect1.w <= (rect2.x + rect2.w) &&
    rect1.y + rect1.h >= (rect2.y) &&
    rect1.y + rect1.h <= (rect2.y + rect2.h));

}

function CheckCollisionPolygon (shot, polygon)
{
    // polygon es un array de puntos
    var count = polygon.length;
    for (var i = 0; i < polygon.length; i++)
    {
        var d = DistancePointToSegment(polygon[i], polygon[(i + 1) % polygon.length], shot.coord);
        if (d < 0)
            count--;
    }
    return (count == 0);
}
 
function DistancePointToSegment (A, B, p)
{
    // A y B son los puntos de la recta
    return (((B.x - A.x)*(A.y - p.y) - (A.x - p.x)*(B.y - A.y)) /
            (Math.sqrt((B.x - A.x)*(B.x - A.x) + (B.y - A.y)*(B.y - A.y))));
}
