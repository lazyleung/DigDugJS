function Player(playerX, playerY) {
	this.x = playerX;
	this.y = playerY;
	this.invincible = 0;
	this.width = 25;
    this.height = 25; 
	this.speed = 5;
	this.rightlimit = 600-this.width;
	this.leftlimit = 0;
	this.downlimit = 600-this.height;
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

	this.bounce = function(monster) {
		var diffX = this.x - monster.x;
		var diffY = this.y - monster.y;
		var bounceSpeed;
		if (Math.abs(diffX) > Math.abs(diffY)) {
			// bounce left or right
			if (diffX < 0) {
				for(bounceSpeed = 15; bounceSpeed > 0; bounceSpeed -= 2 ) {
				this.x -= bounceSpeed;
				this.draw(window.ctx);
				}
			}
			else {
				for(bounceSpeed = 20; bounceSpeed > 0; bounceSpeed -= 3 ) {
				this.x += bounceSpeed;
				this.draw(window.ctx);
				}
			}
		}
		else {
			// bounce up or down
			if (diffY < 0) {
				for(bounceSpeed = 20; bounceSpeed > 0; bounceSpeed -= 3 ) {
				this.y -= bounceSpeed;
				this.draw(window.ctx);
				}
			}
			else {
				for(bounceSpeed = 20; bounceSpeed > 0; bounceSpeed -= 3 ) {
				this.y += bounceSpeed;
				this.draw(window.ctx);
				}
			}
		}
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

