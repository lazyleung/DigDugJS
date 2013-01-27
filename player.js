function Player(playerX, playerY) {
	this.x = playerX;
	this.y = playerY;
	this.direction;
	this.invincible = 0;
	this.points = 0;
	this.width = 25;
	this.height = 25; 
	this.speed = 5;
	this.rightlimit = 600-this.width;
	this.leftlimit = 0;
	this.downlimit = 600-this.height;
	this.uplimit = 0;
	this.animationCount = 0;

	this.moveRight = function() {
		// Restrict movement to certain paths
		if (this.y % 25 != 0) {
			console.log(this.x, this.y);
			if (this.direction === 'up') {
				this.y -= this.speed;
			}
			else if (this.direction === 'down') {
				this.y += this.speed;
			}
		}
    		else if(this.x + this.speed <= this.rightlimit) {
        		this.x += this.speed;
        		this.direction = 'right';
    		}
	}

	this.moveLeft = function() {
		// Restrict movement to certain paths
		if (this.y % 25 != 0) {
			console.log(this.x, this.y);
			if (this.direction === 'up') {
				this.y -= this.speed;
			}
			else if (this.direction === 'down') {
				this.y += this.speed;
			}
		}
    		else if(this.x - this.speed >= this.leftlimit) {
            		this.x -= this.speed;
            		this.direction = 'left';
    		}   	
	}

	this.moveUp = function() {
		// Restrict movement to certain paths
		if (this.x % 25 != 0) {
			console.log(this.x, this.y);
			if (this.direction === 'left') {
				this.x -= this.speed;
			}
			else if (this.direction === 'right') {
				this.x += this.speed;
			}
		}
    		else if(this.y - this.speed >=this.uplimit) {
        		this.y -= this.speed;
        		this.direction = 'up';
    		}
	}

	this.moveDown = function() {
		// Restrict movement to certain paths
		if (this.x % 25 != 0) {
			console.log(this.x, this.y);
			if (this.direction === 'left') {
				this.x -= this.speed;
			}
			else if (this.direction === 'right') {
				this.x += this.speed;
			}
		}
    		else if(this.y + this.speed <= this.downlimit) {
        		this.y += this.speed;
        		this.direction = 'down';
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
				for(bounceSpeed = 10; bounceSpeed >= 0; bounceSpeed -= 1 ) {
				this.x -= bounceSpeed;
				updateMap();
				this.draw(window.ctx);
				}
			}
			else {
				for(bounceSpeed = 10; bounceSpeed >= 0; bounceSpeed -= 1 ) {
				this.x += bounceSpeed;
				updateMap();
				this.draw(window.ctx);
				}
			}
		}
		else {
			// bounce up or down
			if (diffY < 0) {
				for(bounceSpeed = 10; bounceSpeed >= 0; bounceSpeed -= 1 ) {
				this.y -= bounceSpeed;
				updateMap();
				this.draw(window.ctx);
				}
			}
			else {
				for(bounceSpeed = 10; bounceSpeed >= 0; bounceSpeed -= 1 ) {
				this.y += bounceSpeed;
				updateMap();
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
		var direction = this.direction;
		var count = 0;
		image.onload = function() {
			switch(direction) {
				case "right":
					if(count < 10 || count > 20){
						ctx.drawImage(image, 213, 5, 14, 14, x, y, 25, 25);
						if(count > 20) count == 0;
						count ++;
					}else if(count > 10 && count < 20) {
						ctx.drawImage(image, 231, 5, 14, 14, x, y, 25, 25);
						count++;
					}
					break;
				case "left":
					ctx.drawImage(image, 125, 230, 14, 14, x, y, 25, 25);
					break;
				case "down":
					ctx.drawImage(image, 247, 5, 14, 14, x, y, 25, 25);
					break;
				case "up":
					ctx.drawImage(image, 247, 5, 14, 14, x,y, 25, 25);
					break;
				default:
					console.log("no direction!");
			}
		}
	}
}

