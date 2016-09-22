"Use strict";

module.exports = exports = Car1;
const MS_PER_FRAME = 1000/8;
/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Car1(position) {
    this.timer = 0;
    this.x = position.x;
    this.y = position.y;
    this. width = 64;
    this.heigth = 128;
}

Car1.prototype.img = new Image();
Car1.prototype.img.src = 'assets/Car.png';

Car1.prototype.update = function(time){
    this.timer += time;
    this.y -= 1;
}

Car1.prototype.render = function(time,ctx){
    ctx.drawImage(
        this.img,
        // source Image
        64, 128, this.width, this.height,
        // destination rectangle
        this.x, this.y, this.width, this.height
    )
}