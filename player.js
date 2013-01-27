function Player(playerX, playerY) {
	this.x = playerX;
	this.y = playerY;
	this.speed = 3;
	this.rightlimit = 600-25;
	this.leftlimit = 0;
	this.downlimit = 600-25;
	this.uplimit = 0;

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
        	if(this.y - this.speed > this.uplimit) {
                	this.y -= this.speed;
        	}
	}

	this.moveDown = function() {
        	if(this.y + this.speed < this.downlimit) {
                	this.y += this.speed;
        	}
	}
	
	this.update = function() {
		if (Key.isDown(Key.UP)) this.moveUp();
		else if (Key.isDown(Key.LEFT)) this.moveLeft();
		else if (Key.isDown(Key.DOWN)) this.moveDown();
		else if (Key.isDown(Key.RIGHT)) this.moveRight();
	}
	
	this.draw = function(ctx) {
		var image = new Image();
		image.src = "digdugsprite.png";
		var x = this.x;
		var y = this.y;
		image.onload = function(){
			ctx.drawImage(image, 213, 5, 14, 14, x, y, 25, 25);
		}
	}
}

