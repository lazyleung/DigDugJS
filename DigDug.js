window.canvas = document.getElementById("myCanvas");

// Get context of the canvas
window.ctx = canvas.getContext("2d");

var update = function(keyPress) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawSelection(keyPress);

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

var drawSelection = function(direction) {
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

//Drawing Initial Level


function drawLevel() {
	console.log('what');
	
   var img;
   var count = 0;
   var x_coord = 25*(count%24);
   var y_coord = 25*(count/24);

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
      var level = spriteArray[count];
      x_coord = 25*(count%24);
      y_coord = 25*(Math.floor(count/24));
      if (level === "Level0") { img = Level0;}
      else if (level === "Level1") { img = Level1;}
      else if (level === "Level2") { img = Level2;}
      else if (level === "Level3") { img = Level3;}
      else if (level === "Level4") { img = Level4;}
      else if (level === "Level5") { img = Level5;}
      ctx.drawImage(img , x_coord, y_coord);
   }

};

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
		drawLevel();
		canvas.addEventListener('keydown', onGameKeyDown, false);
		canvas.removeEventListener('keydown', onMenuKeyDown, false);
	}
	else {
		update(event.keyCode);
	}
}

function onGameKeyDown(event) {
	console.log(event.keyCode);
}



// ********** END EVENT LISTENERS ***********


canvas.addEventListener('mousedown', onMenuMouseDown, false);


canvas.addEventListener('keydown', onMenuKeyDown, false);
// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();


drawMenu();


// Whe




