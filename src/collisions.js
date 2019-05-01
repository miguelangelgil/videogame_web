function PointInsideCircle (circlePosition, circleRadious2, point ) {

    var pointToCircleDistance2 = ((point.x - circlePosition.x) * (point.x - circlePosition.x))+((point.y - circlePosition.y) * (point.y - circlePosition.y));
    return (pointToCircleDistance2 < circleRadious2);
}
function CheckCollisionRect (point, rectangle)
{
    return point.x >= (rectangle.coord.x) &&
    point.x <= (rectangle.coord.x + rectangle.width) &&
    point.y >= (rectangle.coord.y) &&
    point.y <= (rectangle.coord.y + rectangle.height);
}








