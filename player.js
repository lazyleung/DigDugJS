window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);

function Player(playerX, playerY) {
	this.x = playerX;
	this.y = playerY;
	this.speed = 3;
	this.rightlimit = 600;
	this.leftlimit = 0;
	this.uplimit = 600;
	this.downlimit = 0;

	this.moveRight = function() {
        	if(this.x + this.speed < this.rightlimit) {
                	this.x += this.speed;
        	}
	}

	this.moveLeft = function() {
        	if(this.x - this.speed > this.leftlimit) {
                	this.x -= this.speed;
        	}
	}

	this.moveUp = function() {
        	if(this.y - this.speed > this.downlimit) {
                	this.y -= this.speed;
        	}
	}

	this.moveDown = function() {
        	if(this.y + this.speed < this.uplimit) {
                	this.y += this.speed;
        	}
	}
	
	this.update = function() {
		if (Key.isDown(Key.UP)) this.moveUp();
		if (Key.isDown(Key.LEFT)) this.moveLeft();
		if (Key.isDown(Key.DOWN)) this.moveDown();
		if (Key.isDown(Key.RIGHT)) this.moveRight();
	}
	
	this.draw = function() {
		
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