(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
var car1_arr = [];
var car2_arr = [];
var car3_arr = [];
var log_arr = [];
var river_arr = [];
for(var i=0; i < 20; i++) {
  var car1 = new Car1({ x: 128, y: (canvas.height-1) }); 
  car1_arr.push(car1);
  entities.addEntity(car1);
  var car2 = new Car2({x: 192, y: 0});
  car2_arr.push(car2);
  entities.addEntity(car2);
  var car3 = new Car3({x: 256, y: (canvas.height-1)});
  car3_arr.push(car3);
  entities.addEntity(car3);
  var log = new Log({x: 80, y: 300});
  log_arr.push(log);
  entities.addEntity(log);
  var river = new River({x: 80, y: 300});
  river_arr.push(river);
  entities.addEntity(river);
}
car1_arr.sort(function(c1, c2) {return c1.y - c2.y;});
car2_arr.sort(function(c1, c2) {return c1.y - c2.y;});
car3_arr.sort(function(c1, c2) {return c1.y - c2.y;});
log_arr.sort(function(c1, c2) {return c1.y - c2.y;});
river_arr.sort(function(c1, c2) {return c1.y - c2.y;});

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
  if(player.x > canvas.length){
    player.state = "win";
    if(player.level == 2){
       car1_arr.forEach(function(car1) {
      car1.state = "drive-lvl2";
      entities.updateEntity(car1);});
       car2_arr.forEach(function(car2) {
      car2.state = "drive-lvl2";
      entities.updateEntity(car2);});
       carw_arr.forEach(function(car3) {
      car3.state = "drive-lvl2";
      entities.updateEntity(car3);});
       log_arr.forEach(function(log) {
      log.state = "drive-lvl2";
      entities.updateEntity(log);});
       river_arr.forEach(function(river) {
      river.state = "drive-lvl2";
      entities.updateEntity(river);});
    }
  }
  player.update(elapsedTime, m);
  entities.updateEntity(player);
  car1_arr.forEach(function(car1) {
    car1.update(elapsedTime);
    entities.updateEntity(car1);});
   car2_arr.forEach(function(car2) {
    car2.update(elapsedTime);
    entities.updateEntity(car2);});
     car3_arr.forEach(function(car3) {
    car3.update(elapsedTime);
    entities.updateEntity(car3);});
   log_arr.forEach(function(log) {
    log.update(elapsedTime);
    entities.updateEntity(log);});
   river_arr.forEach(function(river) {
    river.update(elapsedTime);
    entities.updateEntity(river);});
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
  player.render(elapsedTime, ctx);
  car1_arr.forEach(function(car1){car1.render(elapsedTime, ctx)});
  car2_arr.forEach(function(car2){car2.render(elapsedTime, ctx)});
  car3_arr.forEach(function(car3){car3.render(elapsedTime, ctx)});
  log_arr.forEach(function(log){log.render(elapsedTime, ctx)});
  river_arr.forEach(function(river){river.render(elapsedTime, ctx)});
}

},{"./car1.js":2,"./car2.js":3,"./car3.js":4,"./entity-manager.js":5,"./game.js":6,"./log.js":7,"./player.js":8,"./river.js":9}],2:[function(require,module,exports){
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
    this.height = 128;
    this.img = new Image();
    this.img.src = encodeURI('assets/Audi.png');
}


Car1.prototype.update = function(time){
    switch(this.state){
        case "drive-lvl1":
            this.timer += time;
            this.y -= 1;
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
             70, 20, 110, 220,
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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
    this.img.src = encodeURI('assets/Mini_van.png');
}


Car1.prototype.update = function(time){
    switch(this.state){
        case "drive-lvl1":
            this.timer += time;
            this.y -= 1;
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
             75, 20, 90, 205,
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
},{}],5:[function(require,module,exports){
/* Code modified from Onetap by Nathan Bean*/

module.exports = exports = EntityManager;

function EntityManager(width, height, cellSize) {
  this.cellSize = cellSize;
  this.widthInCells = Math.ceil(width / cellSize);
  this.heightInCells = Math.ceil(height / cellSize);
  this.cells = [];
  this.numberOfCells = this.widthInCells * this.heightInCells;
  for(var i = 0; i < this.numberOfCells; i++) {
    this.cells[i] = [];
  }
  this.cells[-1] = [];
}

function getIndex(x, y) {
  var x = Math.floor(x / this.cellSize);
  var y = Math.floor(y / this.cellSize);
  if(x < 0 ||
     x >= this.widthInCells ||
     y < 0 ||
     y >= this.heightInCells
  ) return -1;
  return y * this.widthInCells + x;
}

EntityManager.prototype.addEntity = function(entity){
  var index = getIndex.call(this, entity.x, entity.y);
  this.cells[index].push(entity);
  entity._cell = index;
}

EntityManager.prototype.updateEntity = function(entity){
  var index = getIndex.call(this, entity.x, entity.y);
  // If we moved to a new cell, remove from old and add to new
  if(index != entity._cell) {
    var cellIndex = this.cells[entity._cell].indexOf(entity);
    if(cellIndex != -1) this.cells[entity._cell].splice(cellIndex, 1);
    this.cells[index].push(entity);
    entity._cell = index;
  }
}

EntityManager.prototype.removeEntity = function(entity) {
  var cellIndex = this.cells[entity._cell].indexOf(entity);
  if(cellIndex != -1) this.cells[entity._cell].splice(cellIndex, 1);
  entity._cell = undefined;
}

EntityManager.prototype.collide = function(callback) {
  var self = this;
  this.cells.forEach(function(cell, i) {
    // test for collisions
    cell.forEach(function(entity1) {
      // check for collisions with cellmates
      cell.forEach(function(entity2) {
        if(entity1 != entity2) checkForCollision(entity1, entity2, callback);

        // check for collisions in cell to the right
        if(i % (self.widthInCells - 1) != 0) {
          self.cells[i+1].forEach(function(entity2) {
            checkForCollision(entity1, entity2, callback);
          });
        }

        // check for collisions in cell below
        if(i < self.numberOfCells - self.widthInCells) {
          self.cells[i+self.widthInCells].forEach(function(entity2){
            checkForCollision(entity1, entity2, callback);
          });
        }

        // check for collisions diagionally below and right
        if(i < self.numberOfCells - self.withInCells && i % (self.widthInCells - 1) != 0) {
          self.cells[i+self.widthInCells + 1].forEach(function(entity2){
            checkForCollision(entity1, entity2, callback);
          });
        }
      });
    });
  });
}

function checkForCollision(entity1, entity2, callback) {
  var collides = !(entity1.x + entity1.width < entity2.x ||
                   entity1.x > entity2.x + entity2.width ||
                   entity1.y + entity1.height < entity2.y ||
                   entity1.y > entity2.y + entity2.height);
  if(collides) {
    callback(entity1, entity2);
  }
}

EntityManager.prototype.renderCells = function(ctx) {
  for(var x = 0; x < this.widthInCells; x++) {
    for(var y = 0; y < this.heightInCells; y++) {
      ctx.strokeStyle = '#333333';
      ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }
  }
}

},{}],6:[function(require,module,exports){
"use strict";

/**
 * @module exports the Game class
 */
module.exports = exports = Game;

/**
 * @constructor Game
 * Creates a new game object
 * @param {canvasDOMElement} screen canvas object to draw into
 * @param {function} updateFunction function to update the game
 * @param {function} renderFunction function to render the game
 */
function Game(screen, updateFunction, renderFunction) {
  this.update = updateFunction;
  this.render = renderFunction;

  // Set up buffers
  this.frontBuffer = screen;
  this.frontCtx = screen.getContext('2d');
  this.backBuffer = document.createElement('canvas');
  this.backBuffer.width = screen.width;
  this.backBuffer.height = screen.height;
  this.backCtx = this.backBuffer.getContext('2d');

  // Start the game loop
  this.oldTime = performance.now();
  this.paused = false;
}

/**
 * @function pause
 * Pause or unpause the game
 * @param {bool} pause true to pause, false to start
 */
Game.prototype.pause = function(flag) {
  this.paused = (flag == true);
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
Game.prototype.loop = function(newTime) {
  var game = this;
  var elapsedTime = newTime - this.oldTime;
  this.oldTime = newTime;

  if(!this.paused) this.update(elapsedTime);
  this.render(elapsedTime, this.frontCtx);

  // Flip the back buffer
  this.frontCtx.drawImage(this.backBuffer, 0, 0);
}

},{}],7:[function(require,module,exports){
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
        case "float-lvl1":
        ctx.fillStyle = "brown";
        ctx.fillRect(this.x, this.y, 80, 128);
        break;
    }
    ctx.strokeStyle = this.color;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
}
},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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
},{}]},{},[1]);
