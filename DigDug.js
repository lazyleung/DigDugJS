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
var timer = 120;
var menuSelector = 0;
// Array to keep track of the monsters
var monstersArray = new Array();
var rockArray = new Array();
var itemArray = new Array();
var cloudArray = new Array();
var highScores = new Array(4056,345,63467);
// ********** END GLOBAL VARIABLES **********


function startMainMenu() {
	// Clear context and set menu EventListeners and draw menu
	mode = "menu";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.addEventListener('mousedown', inMenuMouseDown, false);
	canvas.addEventListener('keydown', inMenuKeyDown, false);

	// make canvas focusable, then give it focus!
	canvas.setAttribute('tabindex','0');
	canvas.focus();
	drawMenu();
	drawLevel();
}

var updateMenu = function(keyPress) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawMenu();
	drawMenuSelection(keyPress);
}


// ********** MENU ***********

var drawMenu = function() {
	var img = new Image();
	img.src = "digdugsprite.png";
	drawLevel();
	img.onload = function(){
		window.ctx.drawImage(img, 183, 236, 160, 48, 140, 25, 320, 96);
		window.ctx.drawImage(img, 243, 384, 52, 8, 248, 500, 104, 16);
		window.ctx.drawImage(img, 184, 291, 150, 70, 150, 150, 300, 140);
	}
	ctx.fillStyle = "black";
	ctx.font = "55px Arial";
	ctx.textAlign = "center";
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
		menuSelector = 0;
	}
	else if (direction == 40 && y != 420) {
		var x = 170;
		var y = 410;
		ctx.fillRect(x, y, 250, 70);
		menuSelector = 1;
	}
	else {
		ctx.fillRect(x, y, 250, 70);
	}
}

function startGame() {
	mode = "game";
	
	player = new Player(50,200);
	// load some objects
	monstersArray.push(new Blob(200,200));
    monstersArray.push(new Dragon(300,300));

	rockArray.push(new Rock(275,100));
	rockArray.push(new Rock(400, 475));
	
	cloudArray.push(new Cloud());

	itemArray.push(new Mushroom(100,100));
	itemArray.push(new Carrot(175, 175));
	itemArray.push(new Watermelon(440, 400));
	itemArray.push(new Eggplant(325, 300)); 
	createLevel();
	intervalId = setInterval(updateGame, timerDelay);
	timerInterval = setInterval(countDown, 1000); 
}

function openHighScores() {
	ctx.clearRect(0, 236, 600, 600);	
	for (var i = 1; i <= highScores.length; i++) {
		ctx.font = "30px Arial";
		ctx.textAlign = 'left';
		ctx.fillText(new String(i) + ": "+ new String(highScores[i-1]), 150, 300 + i*30);
	}
	
}

// ********** END MENU **********

// ********** PAUSE MENU **********

function openPauseMenu() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	ctx.font = "30px Arial";
	ctx.textAlign = 'left';
	ctx.fillText("Paused", 250,300);

}



// ********** END PAUSE MENU **********


// ********** GAME ***********
var spriteSheet = new Image();
spriteSheet.src = "digdugsprite.png";

//24x24 array to indicate sides that player have digged in a 4 bit mask, goes: top right bottom left
var overlay = [0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000]

var spriteArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 
                3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 
                3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 
                3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 
                3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 
                4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

function createLevel() {
	for (var i = 0; i < monstersArray.length; i++) {
		var monster = monstersArray[i];
		var monsterPos = Math.floor((monster.x + (blockSize/2)) / blockSize) + Math.floor((monster.y + (blockSize/2)) / blockSize) * xGridSize;
		for (var index = monsterPos-2; index < monsterPos+3; index++) {
			spriteArray[index] = 5;
		}
	}
}

function drawGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawLevel();
	drawOverlay();
	player.draw(window.ctx);
	// Draw all monsters
	for (var i = 0; i < monstersArray.length; i++) {
		var aMonster = monstersArray[i];
		aMonster.draw(window.ctx);
	}
	// Draw all rocks
	for (var i = 0; i < rockArray.length; i++) {
		var aRock = rockArray[i];
		aRock.draw(window.ctx);
	}
	// Draw all items
	for (var i = 0; i < itemArray.length; i++) {
		var aItem = itemArray[i];
		aItem.draw(window.ctx);
	}
	drawScore();
	
}

function updateGame() {
	player.update();
	updateOverlay();
	// Update monsters
	for (var i = 0; i < monstersArray.length; i++) {
		var aMonster = monstersArray[i];
		aMonster.update(player);
		
	}
	// Update rocks
	for (var i = 0; i < rockArray.length; i++) {
		var aRock = rockArray[i];
		aRock.update();
	}
	// Check for object collisions
	if (player.invincible != 1) {
		checkMonsterCollision();
		checkItemCollision();
	}
	drawGame();
	animateClouds();
}

function drawLevel() {
  var img;
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
	var x_coord = blockSize*(count%24);
    var y_coord = blockSize*(Math.floor(count/24));
    if (block === 0) { img = Level0;}
    else if (block === 1) { img = Level1;}
    else if (block === 2) { img = Level2;}
    else if (block === 3) { img = Level3;}
    else if (block === 4) { img = Level4;}
    else if (block === 5) { img = Level5;}
    ctx.drawImage(img , x_coord, y_coord);
	}
}

function drawOverlay() {
	var img = new Image();
  img.src = "overlaysprite2.png";
	var k;
	
	for(var i = 0; i < 24; i++) {
		for(var j = 0; j < 24; j++) {
			if(overlay[i*24 + j] !== 0000) {
				k = (overlay[i*24 + j] - 1) * (blockSize + 5);
				ctx.drawImage(img, k, 0, 25, 25, j*blockSize, i*blockSize, blockSize, blockSize);
			}
		}
	}
}

function drawScore() {
	ctx.fillStyle = "white";
	ctx.font = "25px Arial";
	ctx.textAlign = "left";
	ctx.fillText("Lives: ", 5, 585);
	ctx.fillText("Score: " + new String(player.points), 300, 585);
	ctx.fillText("Time: " + new String(timer), 480, 585);
}

var arrayPosPast;
function updateOverlay() {
	//Updates overlay values
	var arrayPos = Math.floor((player.x + (blockSize/2)) / blockSize) + Math.floor((player.y + (blockSize/2)) / blockSize) * xGridSize;
	if(arrayPos > 71 && player.direction === "right") {
		overlay[arrayPos] = overlay[arrayPos] | 1;
		if(arrayPos - 1 === arrayPosPast) {
			overlay[arrayPos - 1] = overlay[arrayPos - 1] | 4;
		}
	} else if(arrayPos > 71 && player.direction === "left") {
		overlay[arrayPos] = overlay[arrayPos] | 4;
		if(arrayPos + 1 === arrayPosPast) {
			overlay[arrayPos + 1] = overlay[arrayPos + 1] | 1;
		}
	} else if(player.direction === "downright" || player.direction === "downleft") {
		if(arrayPos > 71) overlay[arrayPos] = overlay[arrayPos] | 8;
		if(arrayPosPast > 71 && arrayPos - 24 === arrayPosPast) {
			overlay[arrayPos - 24] = overlay[arrayPos - 24] | 2;
		}
	} else if(player.direction === "upright" || player.direction === "upleft") {
		if(arrayPos > 71) overlay[arrayPos] = overlay[arrayPos] | 2;
		if(arrayPos + 24 === arrayPosPast) {
			overlay[arrayPos + 24] = overlay[arrayPos + 24] | 8;
		}
	} else if (arrayPos > 71){
		overlay[arrayPos] = 15;
	}
	arrayPosPast = arrayPos;
}

function animateClouds() {
	// Create up to 3 clouds
	if (cloudArray.length < 3 && cloudArray[cloudArray.length -1].timeOnMap > 50)
		cloudArray.push(new Cloud());
	//  Draw and update clouds
	for (var i = 0; i < cloudArray.length; i++) {
		aCloud = cloudArray[i];
		aCloud.draw(ctx);
		aCloud.update();
	}
	// Delete clouds once they reach off screen
	for (var i = 0; i < cloudArray.length; i++) {
		var aCloud = cloudArray[i];
		if (aCloud.x < aCloud.leftSpawn || aCloud.x > aCloud.rightSpawn) {
			var startingIndex = cloudArray.indexOf(aCloud);
			cloudArray.splice(startingIndex, 1);
		}
	}
}

function hasCollided (object1, object2) {
	// Check for collision
	if ((object1.x >= object2.x && object1.x + 1 <= object2.x + object2.width) || (object1.x - 1 + object1.width >= object2.x && object1.x + object1.width <= object2.x + object2.width))
		if ((object1.y >= object2.y && object1.y + 1 <= object2.y + object2.height) || (object1.y - 1 + object1.height >= object2.y && object1.y + object1.height <= object2.y + object2.height)) {
			return true;
		}
	return false;
}

function checkMonsterCollision () {
	if (player.invincible == 1)
		return;
	for (i = 0; i < monstersArray.length; i++) {
		var aMonster = monstersArray[i];
		if (hasCollided(player, aMonster)) {
			player.wasHit = 1;
			player.bounce(aMonster);
		}
	}
}

function checkItemCollision () {
	for (i = 0; i < itemArray.length; i++) {
		var aItem = itemArray[i];
		if (hasCollided(player, aItem)) {
			player.points += aItem.points;
			removeItem(aItem);
		}
	}
}

function removeItem(aItem) {
    var startingIndex = itemArray.indexOf(aItem);
    itemArray.splice(startingIndex, 1);
}

function countDown() {
	if (timer <= 0)
		gameEnded();
	else
		timer--;
}

function gameEnded() {
	clearInterval(timerInterval);
	highScores.push(player.points);
}

// ********** END GAME ***********

// ********** EVENT LISTENERS ***********

// Handles mouse input events
function inMenuMouseDown(event) {
	var x = event.pageX - canvas.offsetLeft;
	var y = event.pageY - canvas.offsetTop;
	if(150 < x  && x < 250) {
		if(150 < y && y < 200) {
			;
		}
	}		
}

function inMenuKeyDown(event) {
	if (event.keyCode == 13) {
		if (menuSelector === 0)
			startGame();
		else if (menuSelector === 1)
			openHighScores();
		canvas.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
		canvas.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
		canvas.removeEventListener('keydown', inMenuKeyDown, false);
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
		// Pause game if 'p' is pressed
		if (event.keyCode == 80) {
			if (mode === "game") {
				mode = "pause";
				clearInterval(intervalId);
				clearInterval(timerInterval);
				openPauseMenu();
			}
			// Resume game when 'p' is pressed again
			else if (mode === "pause") {
				mode = "game";
				intervalId = setInterval(updateGame, timerDelay);
				timerInterval = setInterval(countDown, 1000);
			}
		
		}
    this.pressed[event.keyCode] = true;
	},
  
	onKeyup: function(event) {
		delete this.pressed[event.keyCode];
	}
};

// ********** END EVENT LISTENERS ***********


startMainMenu();




