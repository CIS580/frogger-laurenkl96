"use strict";

const MS_PER_FRAME = 1000/8;

/**
 * @module exports the Player class
 */
module.exports = exports = Player;

/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Player(position) {
  this.state = "idle";
  this.x = position.x;
  this.y = position.y;
  this.width  = 64;
  this.height = 64;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/PlayerSprite2.png');
  this.timer = 0;
  this.frame = 0;
  this.lives = 3;
  this.level = 1;
}


/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Player.prototype.update = function(time, m) {
  switch(this.state) {
    case "idle":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
    // TODO: Implement your player's update by state
    case "leap":
      this.timer +=time;
      if(this.timer > MS_PER_FRAME){
        this.timer = 0;
        this.frame += 1;
        if(this.frame > 3) this.state = "idle";
      }
      if(m == "right")this.x++;
      else if(m == "left")this.x--;
      else if(m == "up")this.y--;
      else if(m == "down")this.y++;
      break;
    case "win":
      if(this.level ==1){
        print("Level up!");
        this.x = position.x;
        this.y = position.y;
        this.level++;
      }
      else{
        print("game over! You win!");
      }
      break;
  }
}


/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Player.prototype.render = function(time, ctx) {
  switch(this.state) {
    case "idle":
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64, 64, this.width, this.height,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
      break;
    // TODO: Implement your player's redering according to state
    case "leap":
      ctx.drawImage(this.spritesheet, 
      this.frame * 64, 0, this.width, this.height, 
      this.x, this.y, this.width, this.height)
      break;
    case "win":
      ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64, 64, this.width, this.height,
        // destination rectangle
        this.x, this.y, this.width, this.height);
        break;
  }
}
