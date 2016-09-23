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
    this.img.src = encodeURI('assets/Mini_truck.png');
}


Car1.prototype.update = function(time){
    switch(this.state){
        case "drive-lvl1":
            this.timer += time;
            this.y += 1;
        break;
         case "drive-lvl2":
            this.timer += time;
            this.y -= 2;
        break;
    }
    

}

Car1.prototype.render = function(time,ctx){
    switch(this.state){
        case "drive-lvl1":
        ctx.drawImage(
            this.img,
        // source Image
             70, 15, 105, 210,
        // destination rectangle
            this.x, this.y, this.width, this.height
            );
        break;
        case "drive-lvl2":
        ctx.drawImage(
            this.img,
        // source Image
             70, 20, 110, 220,
        // destination rectangle
            this.x, this.y, this.width, this.height
            );
        break;
    }
}