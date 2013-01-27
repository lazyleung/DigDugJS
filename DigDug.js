// Get context of the canvas
window.canvas = document.getElementById("myCanvas");
window.ctx = canvas.getContext("2d");



// ********** GLOBAL VARIABLES **********
//Variable to keep track if game is in menu or game mode
var mode;
var intervalId;
var timerDelay = 25;
var player;
var blockSize = 25;
var xGridSize = 24;
// Array to keep track of the monsters
var monstersArray = new Array();
var rockArray = new Array();

// ********** END GLOBAL VARIABLES **********


function startMainMenu() {
	// Clear context and set menu EventListeners and draw menu
	mode = "menu";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.addEventListener('mousedown', onMenuMouseDown, false);
	canvas.addEventListener('keydown', onMenuKeyDown, false);

	// make canvas focusable, then give it focus!
	canvas.setAttribute('tabindex','0');
	canvas.focus();

	drawMenu();
}

var updateMenu = function(keyPress) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawMenuSelection(keyPress);

	drawMenu();
}


// ********** MENU ***********

var drawMenu = function() {
	ctx.fillStyle = "black";
	ctx.font = "55px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Dig Dug", 300, 70);
	// Draw selectable options
	ctx.font = "40px Arial";
	ctx.fillText("Play", 300, 370);
	ctx.fillText("High Scores", 300, 450);
}

var drawMenuSelection = function(direction) {
	// Draw selection rectangle
	ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
	if (direction == 38 && y != 320) {
		var x = 170;
		var y = 320;
		ctx.fillRect(x, y, 250, 70);
	}
	else if (direction == 40 && y != 420) {
		var x = 170;
		var y = 410;
		ctx.fillRect(x, y, 250, 70);
	}
	else {
		ctx.fillRect(x, y, 250, 70);
	}
}

// ********** END MENU **********

// ********** GAME ***********
var spriteSheet = new Image();
spriteSheet.src = "digdugsprite.png";

var spriteArray = ["Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0" ,"Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0",
                 "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0",
                 "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0", "Level0",
                 "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1" , "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", 
                 "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", 
                 "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", 
                 "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", 
                 "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", "Level1", 
                 "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2",
                 "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2",
                 "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2",
                "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2",
                "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2", "Level2",
                "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", 
                "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", 
                "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", 
                "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", 
                "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", "Level3", 
                "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4",
                "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4",
                "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4",
                "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4", "Level4",
                "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5",
                "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5", "Level5"];



function startGame() {
	mode = "game";
	
	player = new Player(50,200);
	monstersArray.push(new Blob(200,200));
	rockArray.push(new Rock(275,100));
	intervalId = setInterval(updateGame, timerDelay);
}

function drawGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawLevel();
	player.draw(window.ctx);
	for (var i = 0; i < monstersArray.length; i++) {
		aMonster = monstersArray[i];
		aMonster.draw(window.ctx);
	}
	for (var i = 0; i < rockArray.length; i++) {
		aRock = rockArray[i];
		aRock.draw(window.ctx);
	}
}

function updateGame() {
	player.update();
	updateMap();
	for (var i = 0; i < monstersArray.length; i++) {
		aMonster = monstersArray[i];
		aMonster.update(player);
	}
	for (var i = 0; i < rockArray.length; i++) {
		aRock = rockArray[i];
		aRock.update();
	}
	if (player.invincible != 1)
		checkMonsterCollision();
	drawGame();
}

function drawLevel() {
  var img;
  var count = 0;
  var x_coord = blockSize*(count%24);
  var y_coord = blockSize*(count/24);
  
	var Level0 = new Image(); //Sky
  Level0.src = "Level0.jpg";
  var Level1 = new Image();
  Level1.src = "Level1.jpg";
  var Level2 = new Image();
  Level2.src = "Level2.jpg";
  var Level3 = new Image();
  Level3.src = "Level3.jpg";
  var Level4 = new Image();
  Level4.src = "Level4.jpg";
  var Level5 = new Image();
  Level5.src = "Level5.jpg";
  for (var count = 0; count<spriteArray.length; count++) {
    var block = spriteArray[count];
    // If block is null, don't draw it
    if (block === null) {
    	continue;
    }
	x_coord = blockSize*(count%24);
    y_coord = blockSize*(Math.floor(count/24));
    if (block === "Level0") { img = Level0;}
    else if (block === "Level1") { img = Level1;}
    else if (block === "Level2") { img = Level2;}
    else if (block === "Level3") { img = Level3;}
    else if (block === "Level4") { img = Level4;}
    else if (block === "Level5") { img = Level5;}
    ctx.drawImage(img , x_coord, y_coord);
  }
}

function updateMap() {
	// Find center of player sprite and remove block beneath it
	var arrayPosition = Math.floor((player.x + (blockSize/2)) / blockSize) + Math.floor((player.y + (blockSize/2)) / blockSize) * xGridSize;
	if (spriteArray[arrayPosition] !== null) {
		spriteArray[arrayPosition] = null;
	}
}

function hasCollided (object1, object2) {
	// Check for collision
	if ((object1.x >= object2.x && object1.x <= object2.x + object2.width) || (object1.x + object1.width >= object2.x && object1.x + object1.width <= object2.x + object2.width) )
		if ((object1.y >= object2.y && object1.y <= object2.y + object2.height) || (object1.y + object1.height >= object2.y && object1.y + object1.height<= object2.y + object2.height)) {
			return true;
		}

}

function checkMonsterCollision () {
	for (i = 0; i < monstersArray.length; i++) {
		aMonster = monstersArray[i];
		if (hasCollided(player, aMonster)) {
			console.log('collided!!!!');
			player.invincible = 1;
			player.bounce(aMonster);
			player.invincible = 0;
		}
	}
}

// ********** END GAME ***********

// ********** EVENT LISTENERS ***********

// Handles mouse input events
function onMenuMouseDown(event) {
	var x = event.pageX - canvas.offsetLeft;
	var y = event.pageY - canvas.offsetTop;
	if(150 < x  && x < 250) {
		if(150 < y && y < 200) {
			;
		}
	}		
}

function onMenuKeyDown(event) {
	if (event.keyCode == 13) {
		startGame();
		canvas.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
		canvas.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
		canvas.removeEventListener('keydown', onMenuKeyDown, false);
	}
	else {
		updateMenu(event.keyCode);
	}
}

var Key = {
	pressed: {},

	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
  
	isDown: function(keyCode) {
    return this.pressed[keyCode];
	},
  
	onKeydown: function(event) {
    this.pressed[event.keyCode] = true;
	},
  
	onKeyup: function(event) {
		delete this.pressed[event.keyCode];
	}
};

// ********** END EVENT LISTENERS ***********


startMainMenu();




