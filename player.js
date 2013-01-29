function Player(playerX, playerY) {
	this.x = playerX;
	this.y = playerY;
	this.width = 25;
	this.height = 25;
	this.rightlimit = 600-this.width;
	this.leftlimit = 0;
	this.downlimit = 600 - 50 - this.height;
	this.uplimit = 50;
	this.animationCount = 0;
	this.image = new Image();
    this.image.src = "digdugsprite.png";
	// Modifiable variables
	this.direction = "right";
	this.directionOld = "right";
	this.invincible = 0;
	this.points = 0;
	this.lives = 2;
	this.invincibleTimer = 40;
	
	this.speed = 5;

	this.moveRight = function() {
		// Restrict movement to certain paths
		if (this.y % 25 != 0) {
			if (this.direction === 'upleft' || this.direction === 'upright') {
				this.y -= this.speed;
			} else if (this.direction === 'downleft' || this.direction === 'downright') {
				this.y += this.speed;
			}
		} else if(this.x + this.speed <= this.rightlimit) {
		    this.x += this.speed;
		    this.direction = 'right';
			this.animationCount++;
    	}
	}

	this.moveLeft = function() {
		// Restrict movement to certain paths
		if (this.y % 25 != 0) {
			if (this.direction === 'upleft' || this.direction === 'upright') {
				this.y -= this.speed;
			} else if (this.direction === 'downleft' || this.direction === 'downright') {
				this.y += this.speed;
			}
		} 
		else if(this.x - this.speed >= this.leftlimit) {
			this.x -= this.speed;
			this.direction = 'left';
			this.animationCount++;
    	}   	
	}

	this.moveUp = function() {
		// Restrict movement to certain paths
		if (this.x % 25 != 0) {
			if (this.direction === 'left') {
				this.x -= this.speed;
			} else if (this.direction === 'right') {
				this.x += this.speed;
			}
		}else if(this.y - this.speed >=this.uplimit) {
      this.y -= this.speed;
      if(this.directionOld === 'left') this.direction = 'upleft';
				else if(this.directionOld === 'right') this.direction = 'upright';
			this.animationCount++;
    }
	}

	this.moveDown = function() {
		// Restrict movement to certain paths
		if (this.x % 25 != 0) {
			if (this.direction === 'left') {
				this.x -= this.speed;
			} else if (this.direction === 'right') {
				this.x += this.speed;
			}
		} 
		else if (this.y + this.speed <= this.downlimit) {
				this.y += this.speed;
				if(this.directionOld === 'left') this.direction = 'downleft';
				else if(this.directionOld === 'right') this.direction = 'downright';
				this.animationCount++;
    	}
	}
	
	this.update = function() {
		this.directionOld = this.direction;
		if (Key.isDown(Key.UP)) this.moveUp();
		else if (Key.isDown(Key.LEFT)) this.moveLeft();
		else if (Key.isDown(Key.DOWN)) this.moveDown();
		else if (Key.isDown(Key.RIGHT)) this.moveRight();
		if(this.animationCount > 10 || this.directionOld !== this.direction) this.animationCount = 0;
		
		// Handles temporary God Mode
		if (this.invincible == 1) {
			this.invincibleTimer -= 1;
			if (this.invincibleTimer <= 0) {
				this.invincible = 0;
				this.invincibleTimer = 40;
			}

		}
	}

	this.bounce = function(monster) {
		var diffX = this.x - monster.x;
		var diffY = this.y - monster.y;
		var bounceSpeed;
		if (Math.abs(diffX) > Math.abs(diffY)) {
			// Bounce left or right
			if (diffX < 0) {
				for(bounceSpeed = 5; bounceSpeed >= 0; bounceSpeed -= 1 ) {
				//  Ensures you can't be bounced off screen
				if (bounceSpeed > this.x - this.leftlimit)
					this.x -= this.x - this.leftlimit;
				else
					this.x -= bounceSpeed;
				updateMap();
				this.draw(window.ctx);
				}
			}
			else {
				for(bounceSpeed = 5; bounceSpeed >= 0; bounceSpeed -= 1 ) {
				if (bounceSpeed > this.rightlimit - this.x)
					this.x += this.rightlimit - this.x;
				else
					this.x += bounceSpeed;
				updateMap();
				this.draw(window.ctx);
				}
			}
		}
		else {
			// bounce up or down
			if (diffY < 0) {
				for(bounceSpeed = 5; bounceSpeed >= 0; bounceSpeed -= 1 ) {
				this.y -= bounceSpeed;
				updateMap();
				this.draw(window.ctx);
				}
			}
			else {
				for(bounceSpeed = 5; bounceSpeed >= 0; bounceSpeed -= 1 ) {
				this.y += bounceSpeed;
				updateMap();
				this.draw(window.ctx);
				}
			}
		}
	}
	
	this.draw = function(ctx) {
		var direction = this.direction;
		var count = this.animationCount;
		switch(direction) {
			case "right":
				if(count < 5) ctx.drawImage(this.image, 213, 5, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 231, 5, 14, 14, this.x, this.y, 25, 25);
				break;
			case "left":
				if(count < 5) ctx.drawImage(this.image, 125, 230, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 106, 230, 14, 14, this.x, this.y, 25, 25);
				break;
			case "downright":
				if(count < 5) ctx.drawImage(this.image, 247, 5, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 264, 5, 14, 14, this.x, this.y, 25, 25);
				break;
			case "downleft":
				if(count < 5) ctx.drawImage(this.image, 89, 230, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 72, 230, 14, 14, this.x, this.y, 25, 25);
				break;
			case "upright":
				if(count < 5) ctx.drawImage(this.image, 30, 57, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 13, 57, 14, 14, this.x, this.y, 25, 25);
				break;
			case "upleft":
				if(count < 5) ctx.drawImage(this.image, 56, 57, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 73, 57, 14, 14, this.x, this.y, 25, 25);
				break;
			default:
				console.log("no direction!");
		}
	}
}

