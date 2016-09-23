"Use strict";

module.exports = exports = Car1;
const MS_PER_FRAME = 1000/8;
/**
 * @constructor Car1
 * Creates a new car1 object
 * @param {Postition} position object specifying an x and y
 */
function Car1(position) {
    this.state= "drive-lvl1";
    this.timer = 0;
    this.x = position.x;
    this.y = position.y;
    this. width = 64;
    this.heigth = 128;
    this.img = new Image();
    this.img.src = encodeURI('assets/Car.png');
}


Car1.prototype.update = function(time){
    switch(this.state){
        case "drive-lvl1":
            this.timer += time;
            this.y -= 1;
        break;
    }
    

}

Car1.prototype.render = function(time,ctx){
    switch(this.state){
        case "driving-lvl1":
        ctx.fillStyle = "blue";
        ctx.fillRect = (this.x, this.y, 80, 192);
        break;
    }
    ctx.strokeStyle = this.color;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
}