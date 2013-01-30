// Get context of the canvas
window.canvas = document.getElementById("myCanvas");
window.ctx = canvas.getContext("2d");

// ********** GLOBAL VARIABLES **********
//Variable to keep track if game is in menu or game mode
var mode;
//Variable to keeptrack of level
var stage = 0;
var intervalId;
var timerDelay = 25;
var player;
var blockSize = 25;
var xGridSize = 24;
var timer;
var menuSelector;
var randomItem = 0;
// Array to keep track of the monsters
var monstersArray = new Array();
var rockArray = new Array();
var itemArray = new Array();
var cloudArray = new Array();
var highScores = new Array(1000,500,0);

var spriteSheet = new Image();
spriteSheet.src = "digdugsprite.png";
// ********** END GLOBAL VARIABLES **********

// ********** MENU ***********

var background = new Image();
background.src = "menubackground.png";

var animatePlayerX = -60;
var animatePlayerCount = 0;

function startMainMenu() {
	// Clear context and set menu EventListeners and draw menu
	mode = "menu";
	menuSelector = 0;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.addEventListener('keydown', inMenuKeyDown, false);

	// make canvas focusable, then give it focus!
	canvas.setAttribute('tabindex','0');
	canvas.focus();
	
	intervalId = setInterval(updateMenu, timerDelay);
}

var updateMenu = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawMenu();
	if(animatePlayerCount++ > 10) animatePlayerCount = 0;
	if(animatePlayerX > 620) animatePlayerX = -60;
	else animatePlayerX += 1.5;
}

var drawMenu = function() {
	window.ctx.drawImage(background, 0, 0);
	animateClouds()
	window.ctx.drawImage(spriteSheet, 183, 236, 160, 48, 140, 25, 320, 96);
	window.ctx.drawImage(spriteSheet, 243, 384, 52, 8, 248, 535, 104, 16);
	
	if(animatePlayerCount < 5) ctx.drawImage(spriteSheet, 213, 5, 14, 14, animatePlayerX, 202, 25, 25);
	else ctx.drawImage(spriteSheet, 231, 5, 14, 14, animatePlayerX, 202, 25, 25);
	
	ctx.fillStyle = "rgba(255, 69, 0, 1)";
	if(menuSelector === 0) {
		ctx.beginPath();
		ctx.moveTo(200, 250);
		ctx.lineTo(400, 250);
		ctx.lineTo(400, 330);
		ctx.lineTo(200, 330);
		ctx.closePath();
		ctx.stroke();
		//ctx.fillRect(100, 225, 400, 125);
	} else {
		ctx.beginPath();
		ctx.moveTo(125, 370);
		ctx.lineTo(500, 370);
		ctx.lineTo(500, 460);
		ctx.lineTo(125, 460);
		ctx.closePath();
		ctx.stroke();
	}
}

function openHighScores() {
	mode = "highscore";
	ctx.fillStyle = "rgba(0,0,0,0.9)";
	ctx.fillRect(0, 225, 600, 600);
	ctx.fillStyle = "rgb(255,255,255)";	
	for (var i = 1; i <= highScores.length; i++) {
		ctx.font = "30px Arial";
		ctx.textAlign = 'left';
		ctx.fillText(new String(i) + ": "+ new String(highScores[i-1]), 150, 300 + i*30);
	}
	ctx.textAlign = 'center';
	ctx.fillText("Press Esc to exit", 300, 500);
}

// ********** END MENU **********







// ********** PAUSE MENU **********

function openPauseMenu() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	ctx.font = "30px Arial";
	ctx.textAlign = 'center';
	ctx.fillText("Paused", 300,300);
	ctx.fillText("Press P to resume", 300,400);
	ctx.fillText("Press Q to quit", 300,450);
}

// ********** END PAUSE MENU **********


// ********** GAME ***********
var arrayPosPast;
var howtoplay = new Image();
howtoplay.src = "howtoplay.png"

//24x24 array to indicate sides that player have digged in a 4 bit mask, goes: top right bottom left
var overlay = [0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000]

var spriteArrayStatic = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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

function startGame() {
	mode = "game";
	timer = 120;

	switch(stage) {
		case 0:
			ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			window.ctx.drawImage(howtoplay, 0, 0);
			break;
		case 1:
			player = new Player(300, 150);
			monstersArray.push(new Blob(150,200));
			monstersArray.push(new Blob(350,400));
		  monstersArray.push(new Dragon(500,100));
			itemArray.push(new Mushroom(100,100));
			itemArray.push(new Carrot(175, 175));
			itemArray.push(new Watermelon(440, 400));
			itemArray.push(new Eggplant(325, 300));
			itemArray.push(new Cucumber(475, 50));
			itemArray.push(new Flower(475, 200));
			rockArray.push(new Rock(275,100));
			rockArray.push(new Rock(150, 150));
			rockArray.push(new Rock(400, 475));
			break;
		case 2:
			player = new Player(100, 150);
			monstersArray.push(new Blob(150,200));
			monstersArray.push(new Blob(350,400));
		  monstersArray.push(new Dragon(450,200));
		  monstersArray.push(new Dragon(500,100));
		  monstersArray.push(new Dragon(100,500));
			itemArray.push(new Mushroom(100,100));
			itemArray.push(new Carrot(175, 175));
			itemArray.push(new Watermelon(440, 400));
			itemArray.push(new Eggplant(325, 300));
			itemArray.push(new Cucumber(475, 50));
			itemArray.push(new Flower(475, 200));
			rockArray.push(new Rock(275,100));
			rockArray.push(new Rock(150, 150));
			rockArray.push(new Rock(400, 475));
			break;
		case 3:
			player = new Player(300, 150);
			monstersArray.push(new Blob(150,200));
			monstersArray.push(new Blob(450,200));

		  monstersArray.push(new Dragon(350,400));
		  monstersArray.push(new Dragon(500,100));
		  monstersArray.push(new Dragon(300,500));
			itemArray.push(new Mushroom(100,100));
			itemArray.push(new Carrot(175, 175));
			itemArray.push(new Watermelon(440, 400));
			itemArray.push(new Eggplant(325, 300));
			itemArray.push(new Cucumber(475, 50));
			itemArray.push(new Flower(475, 200));
			rockArray.push(new Rock(275,100));
			rockArray.push(new Rock(150, 150));
			rockArray.push(new Rock(400, 475));
			break;
		case 4:
			randomItem = 1;
			player = new Player(300, 150);
			monstersArray.push(new Blob(150,200));
			monstersArray.push(new Blob(50,400));
			monstersArray.push(new Blob(500,475));
			monstersArray.push(new Dragon(450,200));
			monstersArray.push(new Dragon(500,100));
		 	monstersArray.push(new Dragon(100,500));
			itemArray.push(new Mushroom(100,100));
			itemArray.push(new Carrot(375, 175));
			itemArray.push(new Watermelon(440, 400));
			itemArray.push(new Eggplant(325, 300));
			itemArray.push(new Cucumber(175, 50));
			itemArray.push(new Flower(475, 200));
			rockArray.push(new Rock(175,270));
			rockArray.push(new Rock(350, 350));
			rockArray.push(new Rock(400, 475));
			break;
		default:
			mode = "end";
			ctx.fillStyle = "rgba(0, 0, 0, 1)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.font = "40px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "rgb(255,255,255)";
			ctx.fillText("Congratulations!", 300,250);
			ctx.fillText("You Win!", 300,350);
	}
	if(stage > 0 && mode !== "end") {
		createLevel();
		intervalId = setInterval(updateGame, timerDelay);
		timerInterval = setInterval(countDown, 1000);
	}
}

function createLevel() {
	for (var i = 0; i < monstersArray.length; i++) {
		var monster = monstersArray[i];
		var monsterPos = Math.floor((monster.x + (blockSize/2)) / blockSize) + Math.floor((monster.y + (blockSize/2)) / blockSize) * xGridSize;
		for (var index = monsterPos-2; index < monsterPos+3; index++) {
			overlay[index] = 5;
		}
	}
}

function placeItem() { 
	var itemNumber = Math.random(); 
	var x_coord = Math.floor(Math.random()*24*25);
	var y_coord = Math.floor(Math.random()*19*25+75); 
	if (itemNumber < 0.16) itemArray.push(new Mushroom(x_coord, y_coord));
  else if (itemNumber < 0.33) itemArray.push(new Carrot(x_coord, y_coord));
	else if (itemNumber < 0.49) itemArray.push(new Watermelon(x_coord, y_coord));
	else if (itemNumber < 0.65) itemArray.push(new Eggplant(x_coord, y_coord));
	else if (itemNumber < 0.81) itemArray.push(new Cucumber(x_coord, y_coord));
	else itemArray.push(new Flower(x_coord, y_coord));
	updateGame(); 
}

function updateGame() {
	player.update();
	updateOverlay();
	// Update monsters
	for (var i = 0; i < monstersArray.length; i++) {
		var aMonster = monstersArray[i];
		aMonster.update(player);
		
	}
	//  Delete rocks
	for (var i = 0; i < rockArray.length; i++) {
		var aRock = rockArray[i];
		if (aRock.needToRemove === 1)
			removeRock(aRock);
	}
	// Update rocks
	for (var i = 0; i < rockArray.length; i++) {
		aRock = rockArray[i];
		aRock.update();;
	}
	// Check for object collisions
	if (player.invincible != 1) {
		checkMonsterCollision();
		checkItemCollision();
	}
	drawGame();
	animateClouds();
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
	drawInfo();
	
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

function drawInfo() {
	ctx.fillStyle = "white";
	ctx.font = "25px Arial";
	ctx.textAlign = "left";
	ctx.fillText("Lives: ", 5, 585);
	for(var i = player.lives; i > 0; i--) {
		ctx.drawImage(spriteSheet, 213, 5, 14, 14, 50 + (i*25), 565, 25, 25);
	}
	ctx.fillText("Level: " + new String(stage), 210, 585);
	ctx.fillText("Score: " + new String(player.points), 330, 585);
	ctx.fillText("Time: " + new String(timer), 480, 585);
}

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
	if (cloudArray == false)
		cloudArray.push(new Cloud());

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
    if (randomItem === 1) {
    	placeItem();
    }
}

function removeRock(aItem) {
    var startingIndex = rockArray.indexOf(aItem);
    rockArray.splice(startingIndex, 1);
}

function countDown() {
	if(player.lives <= 0 || timer <= 0) {
		mode = "lose";
		gameEnded();
	}else if(itemArray.length === 0) {
		mode = "win";
		gameEnded();
	} else 
		timer--;
}

function gameEnded() {
	clearInterval(intervalId);
	clearInterval(timerInterval);
	highScores.push(player.points);
	spriteArray = spriteArrayStatic;
	monstersArray = new Array();
	rockArray = new Array();
	itemArray = new Array();
	cloudArray = new Array();
	overlay = [0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000]
	ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	ctx.font = "30px Arial";
	ctx.textAlign = 'center';
	ctx.fillText("Score: " + new String(player.points), 300, 300);
	if(mode === "lose") {
		ctx.fillText("You lost!", 300,150);
		ctx.fillText("Press enter to restart level", 300,185);
	} else {
		ctx.fillText("You passed level " + new String(stage), 300,150);
		ctx.fillText("Press enter to continue", 300,450);
	}
}

// ********** END GAME ***********

// ********** EVENT LISTENERS ***********
var gamekeydown = function(event) { Key.onKeydown(event); };
var gamekeyup = function(event) { Key.onKeyup(event); };


function inMenuKeyDown(event) {
	//keyCode 13 = enter
	if (menuSelector === 0) {
		if(event.keyCode === 13) {
			clearInterval(intervalId);
			canvas.addEventListener('keydown', gamekeydown, false);
			canvas.addEventListener('keyup', gamekeyup, false);
			canvas.removeEventListener('keydown', inMenuKeyDown, false);
			startGame();
		}
		else if(event.keyCode === Key.UP || event.keyCode === Key.DOWN){
			menuSelector = 1;
		}
	} else if (menuSelector === 1) {
		if(mode !== "highscore") {
			if(event.keyCode === 13) {
				clearInterval(intervalId);
				openHighScores();
			}else if(event.keyCode === Key.UP || event.keyCode === Key.DOWN){
				menuSelector = 0;
			}
		}else if(event.keyCode === 27) {
			startMainMenu();
		}
		 
	} else {
		menuSelector = 0;
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
		// If q is pressed while pause menu, then quit
		if (event.keyCode === 81 && mode === "pause") {
			overlay = [0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000]
			clearInterval(intervalId);
			clearInterval(timerInterval);
			spriteArray = spriteArrayStatic;
			monstersArray = new Array();
			rockArray = new Array();
			itemArray = new Array();
			cloudArray = new Array();
			stage = 0;
			canvas.removeEventListener('keydown', gamekeydown, false);
			canvas.removeEventListener('keyup', gamekeyup, false);
			startMainMenu();
		}
		// Pause game if esc or 'p' is pressed
		if(event.keyCode === 27 || event.keyCode === 80) {
			if (mode === "game") {
				mode = "pause";
				clearInterval(intervalId);
				clearInterval(timerInterval);
				openPauseMenu();
			}
			// Resume game when esc or 'p' is pressed again
			else if (mode === "pause") {
				mode = "game";
				intervalId = setInterval(updateGame, timerDelay);
				timerInterval = setInterval(countDown, 1000);
			}
		}
		//Advances game
		if((mode === "win" || stage === 0 || mode === "lose") && event.keyCode === 13){
			if(mode === "win" || stage === 0) stage++;
			startGame();
		}
		
		//Pass level by pressing n
		if(mode === "game" && event.keyCode === 78) {
			mode = "win";
			gameEnded();
		}
		
    this.pressed[event.keyCode] = true;
	},
  
	onKeyup: function(event) {
		delete this.pressed[event.keyCode];
	},
};

// ********** END EVENT LISTENERS ***********

startMainMenu();