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
var mushroomArray = new Array();
var cloudArray = new Array();
var highScores = new Array(4056,345,63467);
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
	
	var img = new Image();
	img.src = "digdugsprite.png";
	img.onload = function(){
		window.ctx.drawImage(img, 183, 236, 160, 48, 140, 25, 320, 96);
		window.ctx.drawImage(img, 243, 384, 52, 8, 248, 500, 104, 16);
	}
	
	ctx.fillStyle = "black";
	ctx.font = "55px Arial";
	ctx.textAlign = "center";
	//ctx.fillText("Dig Dug", 300, 70);
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
	rockArray.push(new Rock(275,100));
	cloudArray.push(new Cloud());

	mushroomArray.push(new Mushroom(100,100));
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

// ********** GAME ***********
var spriteSheet = new Image();
spriteSheet.src = "digdugsprite.png";

//24x24 array to indicate sides that player have digged in a 4 bit mask, goes: top right bottom left
var overlay = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

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
	// Draw all mushrooms
	for (var i = 0; i < mushroomArray.length; i++) {
		var aMushroom = mushroomArray[i];
		aMushroom.draw(window.ctx);
	}
	drawScore();
	
}

function updateGame() {
	player.update();
	updateMap();
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
		checkMushroomCollision();
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
	
	for(var i = 0; i < 24; i++) {
		for(var j = 0; j < 24; j++) {
			if(i<3) img = Level0;
			else if(i<8) img = Level1;
			else if(i<13) img = Level2;
			else if(i<18) img = Level3;
			else if(i<22) img = Level4;
			else img = Level5;
			ctx.drawImage(img, j*blockSize, i*blockSize);
		}
	}
}

function drawOverlay() {
	var img = new Image();
  img.src = "overlaysprite.png";
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

function updateMap() {
	// Find center of player sprite and remove block beneath it
	var arrayPos = Math.floor((player.x + (blockSize/2)) / blockSize) + Math.floor((player.y + (blockSize/2)) / blockSize) * xGridSize;
	switch(player.direction){
		case "right":
			overlay[arrayPos] = overlay[arrayPos] | 1;
			if(arrayPos%24 > 0 && overlay[arrayPos - 1] & 4 === 4) overlay[arrayPos] = overlay[arrayPos] | 4;
			break;
		case "left":
			overlay[arrayPos] = overlay[arrayPos] | 4;
			if(arrayPos%24 < 24 && overlay[arrayPos + 1] & 4 === 4) overlay[arrayPos] = overlay[arrayPos] | 4;
			break;
		case "down":
			overlay[arrayPos] = overlay[arrayPos] | 8;
			break;
		case "up":
			overlay[arrayPos] = overlay[arrayPos] | 2;
			break;
		default:
			overlay[arrayPos] = 15;
	}
	console.log(overlay[arrayPos]);
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
}

function checkMonsterCollision () {
	if (player.invincible == 1)
		return;
	for (i = 0; i < monstersArray.length; i++) {
		var aMonster = monstersArray[i];
		if (hasCollided(player, aMonster)) {
			player.invincible = 1;
			player.bounce(aMonster);
			player.points -= 15;
		}
	}
}

function checkMushroomCollision () {
	for (i = 0; i < mushroomArray.length; i++) {
		var aMushroom = mushroomArray[i];
		if (hasCollided(player, aMushroom)) {
			player.points += 50;
			removeMushroom(aMushroom);
		}
	}
}

function removeMushroom(aMushroom) {
    var startingIndex = mushroomArray.indexOf(aMushroom);
    mushroomArray.splice(startingIndex, 1);
}

function countDown() {
	if (timer <= 0)
		gameEnded();
	timer--;
}

function gameEnded() {
	highScores.push(player.points);
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
		if (menuSelector === 0)
			startGame();
		else if (menuSelector === 1)
			openHighScores();
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




