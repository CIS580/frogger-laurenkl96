"use strict;"

/* Classes */
const Game = require('./game.js');
const Player = require('./player.js');
const Car1 = require('./car1.js');
const Car2 = require('./car2.js');
const Car3 = require('./car3.js');
const Log = require('./log.js');
const River = require('./river.js');
const EntityManager = require('./entity-manager.js');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var entities = new EntityManager(canvas.width, canvas.height, 128);
var time = 0;
var player = new Player({x: 0, y: 240});
entities.addEntity(player);

var car1 = new Car1({ x: 128, y: (canvas.height-1) }); 
entities.addEntity(car1);
var car2 = new Car2({x: 192, y: 0});
entities.addEntity(car2);
var car3 = new Car3({x: 256, y: (canvas.height-1)});
entities.addEntity(car3);
var log = new Log({x: 80, y: 300});
entities.addEntity(log);
var river = new River({x: 80, y: 300});
entities.addEntity(river);

var m="";

document.addEventListener("keypress", keydown);
function keydown(e){
  player.state="leap";
  player.frame = 0;
  var key = e.which;
  console.log('which', e.which, e.key, e.charCode, e.keyCode);
  if(key == 97) m="left";
  else if(key == 119) m="up";
  else if(key == 100) m="right";
  else if(key == 115) m="down";
}

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());



/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
  player.update(elapsedTime, m);
  entities.updateEntity(player);
  car1.update(elapsedTime);
  entities.updateEntity(car1);
  car2.update(elapsedTime);
  entities.updateEntity(car2);
  car3.update(elapsedTime);
  entities.updateEntity(car3);
  log.update(elapsedTime);
  entities.updateEntity(log);
  river.update(elapsedTime);
  entities.updateEntity(river);
  // TODO: Update the game objects
  entities.collide(function(entity1,entity2){
    if(entity1 instanceof Player){
      if(entity2 instanceof Car1 || entity2 instanceof Car2 ||
          entity2 instanceof Car3 || entity2 instanceof River){
        player.lives--;
        player.x = 0;
        player.y = 240;
      }
      else if(entity2 instanceof Log){
        player.y -=1;
      }
    }
    else if(entity2 instanceof Player){
      if(entity1 instanceof Car1 || entity1 instanceof Car2 ||
          entity1 instanceof Car3 || entity1 instanceof River){
        player.lives--;
        player.x = 0;
        player.y = 240;
      }
      else if(entity1 instanceof Log){
        player.y -=1;
      }
    }
  });
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(0, 0, 128, canvas.height);
  ctx.fillRect(320, 0, 80, canvas.height);
  ctx.fillRect(528, 0, 64, canvas.height);
  ctx.fillRect(672, 0, 100, canvas.height);
  ctx.fillStyle="gray";
  ctx.fillRect(128, 0, 192, canvas.height);
  ctx.fillRect(400, 0, 128, canvas.height);
  ctx.fillStyle = "blue";
  ctx.fillRect(592, 0, 80, canvas.height);
  entities.renderCells(ctx);
  player.render(elapsedTime, ctx);
  car1.render(elapsedTime, ctx);
  car2.render(elapsedTime, ctx);
  car3.render(elapsedTime, ctx);
  log.render(elapsedTime,ctx);
  river.render(elapsedTime,ctx);
}
