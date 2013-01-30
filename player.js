function Player(playerX, playerY) {
	this.x = playerX;
	this.y = playerY;
	this.width = 25;
	this.height = 25;
	this.rightlimit = 600-this.width;
	this.leftlimit = 0;
	this.downlimit = 600 - 50 - this.height;
	this.uplimit = 50;
	this.image = new Image();
	this.image.src = "digdugsprite.png";
	this.oldAnimationFrame;

	// Modifiable variables
	this.direction = "right";
	this.directionOld = "right";
	this.invincible = 0;
	this.points = 0;
	this.lives = 3;
	this.invincibleTimer = 25;
	this.animationCount = 0;
	this.speed = 5;
	this.action = "walk";
	this.wasHit = 0;
	this.wasBurned = 0;

	this.moveRight = function() {
		// Restrict movement to certain paths
		if (!almostEquals(this.y % 25, 0)) {
			if (this.direction === 'upleft' || this.direction === 'upright') {
				this.y -= this.speed;
			} else if (this.direction === 'downleft' || this.direction === 'downright') {
				this.y += this.speed;
			}
		} else if(this.x + this.speed <= this.rightlimit) {
			this.x += this.speed;
			this.direction = 'right';
			this.animationCount++;
			var arrayPosition = getArrayPosition(this.x + 25, this.y);

			if(arrayPosition > 71 && overlay[arrayPosition] === 0000) {
				this.action = "dig";
				this.speed = 2.5;
			}
			else {
					if (!almostEquals(this.x % 5, 0)) // Correct for 2.5 remainder when changing direction and changing to walk
						this.x += 2.5;
					this.action = "walk";
					this.speed = 5;
				}
			
		}
	}

	this.moveLeft = function() {
		// Restrict movement to certain paths
		if (!almostEquals(this.y % 25, 0)) {
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
			var arrayPosition = getArrayPosition(this.x - 25, this.y);

			if(arrayPosition > 71 && overlay[arrayPosition] === 0000) {
				this.action = "dig";
				this.speed = 2.5;
			}
			else {
					if (!almostEquals(this.x % 5, 0)) // Correct for 2.5 remainder when changing direction and changing to walk
						this.x -= 2.5;
					this.action = "walk";
					this.speed = 5;
				}
			
		}   	
	}

	this.moveUp = function() {
		// Restrict movement to certain paths
		if (!almostEquals(this.x % 25, 0)) {
			if (this.direction === 'left') {
				this.x -= this.speed;
			} else if (this.direction === 'right') {
				this.x += this.speed;
			}
		}
		else if(this.y - this.speed >=this.uplimit) {
			this.y -= this.speed;
			if(this.directionOld === 'left' || this.directionOld === 'downright')
				this.direction = 'upleft';
			else if(this.directionOld === 'right' || this.directionOld === 'downleft')
				this.direction = 'upright';
			
			this.animationCount++;
			var arrayPosition = getArrayPosition(this.x, this.y - 25);

			if(arrayPosition > 71 && overlay[arrayPosition] === 0000) {
				this.action = "dig";
				this.speed = 2.5;
			}
			else {
				if (!almostEquals(this.y % 5, 0)) // Correct for 2.5 remainder when changing direction and changing to walk
					this.y -= 2.5;
				this.action = "walk";
				this.speed = 5;
			}
			
		}
	}

	this.moveDown = function() {
		// Restrict movement to certain paths
		if (!almostEquals(this.x % 25, 0)) {
			if (this.direction === 'left') {
				this.x -= this.speed;
			} else if (this.direction === 'right') {
				this.x += this.speed;
			}
		} else if (this.y + this.speed <= this.downlimit) {
			this.y += this.speed;
			if(this.directionOld === 'left' || this.directionOld === 'upright') {
				this.direction = 'downleft';
			} else if(this.directionOld === 'right' || this.directionOld === 'upleft') {
				this.direction = 'downright';
			}
			this.animationCount++;

			var arrayPosition = getArrayPosition(this.x, this.y + 25);

			if(arrayPosition > 71 && overlay[arrayPosition] === 0000) {
				this.action = "dig";
				this.speed = 2.5;
			}
			else {
				console.log(this.speed);
				if (!almostEquals(this.y % 5, 0)) { // Correct for 2.5 remainder when changing direction and changing to walk
					this.y += 2.5;
				}
				this.action = "walk";
				this.speed = 5;
			}

		}
	}

	this.update = function() {
		this.directionOld = this.direction;
		if (Key.isDown(Key.UP)) this.moveUp();
		else if (Key.isDown(Key.LEFT)) this.moveLeft();
		else if (Key.isDown(Key.DOWN)) this.moveDown();
		else if (Key.isDown(Key.RIGHT)) this.moveRight();

		//  Set animation frame to 0 when direction change or when over 10
		if(this.animationCount > 10 || this.directionOld !== this.direction)
			this.animationCount = 0;

		// Handles temporary God Mode and flashing animation
		if (this.invincible == 1) {
			this.invincibleTimer -= 1;
			if (this.invincibleTimer <= 0) {
				this.invincible = 0;
				this.invincibleTimer = 25;

			}

			// Flashing animation
			if (this.oldAnimationFrame === -1) { // set to blank
				this.oldAnimationFrame = this.animationCount;
				this.animationCount = -1;
			}
			else {
				this.animationCount = this.oldAnimationFrame;
				if(this.invincibleTimer !== 1)
					this.oldAnimationFrame = -1;

			}
		}

		// Player gets hit and loses a life
		else {
			if (this.wasHit === 1) {
				console.log("GOT HIT");
				this.invincible = 1;
				this.lives--;
				this.points -= 100;
				this.wasHit = 0;
			}
			if (this.wasBurned === 1) {
				console.log("GOT BURNED");
				this.invincible = 1;
				this.lives--;
				this.points -= 250;
				this.wasBurned = 0;
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
					overlay[getArrayPosition(this.x, this.y)] = 5;
					this.draw(window.ctx);
				}
			}
			else {
				for(bounceSpeed = 5; bounceSpeed >= 0; bounceSpeed -= 1 ) {
					if (bounceSpeed > this.rightlimit - this.x)
						this.x += this.rightlimit - this.x;
					else
						this.x += bounceSpeed;
					overlay[getArrayPosition(this.x, this.y)] = 5;
					this.draw(window.ctx);
				}
			}
		} else {
			// bounce up or down
			if (diffY < 0) {
				for(bounceSpeed = 5; bounceSpeed >= 0; bounceSpeed -= 1 ) {
					if (bounceSpeed > this.y - this.uplimit)
						this.y -= this.y - this.uplimit;
					else
						this.y -= bounceSpeed;
					overlay[getArrayPosition(this.x, this.y)] = 10;
					this.draw(window.ctx);
				}
			}
			else {
				for(bounceSpeed = 5; bounceSpeed >= 0; bounceSpeed -= 1 ) {
					if (bounceSpeed > this.downlimit - this.y)
						this.y += this.downlimit - this.y;
					else
						this.y += bounceSpeed;
					overlay[getArrayPosition(this.x, this.y)] = 10;
					this.draw(window.ctx);
				}
			}
		}
	}

	this.draw = function(ctx) {

		var direction = this.direction;
		var count = this.animationCount;
		// Handles special flashing case
		if (count === -1)
			return;
		switch(direction) {
			case "right":
			if (this.action === "dig") {
				if(count < 5 && count >= 0) ctx.drawImage(this.image, 281, 5, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 298, 5, 14, 14, this.x, this.y, 25, 25);
			} else {
				if(count < 5 && count >= 0) ctx.drawImage(this.image, 213, 5, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 231, 5, 14, 14, this.x, this.y, 25, 25);
			}
			break;
			case "left":
			if(this.action === "dig") {	
				if(count < 5 && count >= 0) ctx.drawImage(this.image, 55, 230, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 38, 230, 14, 14, this.x, this.y, 25, 25);
			} else {
				if(count < 5 && count >= 0) ctx.drawImage(this.image, 125, 230, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 106, 230, 14, 14, this.x, this.y, 25, 25);
			}
			break;
			case "downright":
			if(this.action === "dig") {
				if(count < 5 && count >= 0) ctx.drawImage(this.image, 315, 5, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 332, 5, 14, 14, this.x, this.y, 25, 25);
			} else {				
				if(count < 5 && count >= 0) ctx.drawImage(this.image, 247, 5, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 264, 5, 14, 14, this.x, this.y, 25, 25);
			}
			break;
			case "downleft":
			if(this.action === "dig") {
				if(count < 5 && count >= 0) ctx.drawImage(this.image, 21, 230, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 4, 230, 14, 14, this.x, this.y, 25, 25);
			} else {
				if(count < 5 && count >= 0) ctx.drawImage(this.image, 89, 230, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 72, 230, 14, 14, this.x, this.y, 25, 25);
			}
			break;
			case "upright":
			if(this.action === "dig") {
				if(count < 5 && count >= 0) ctx.drawImage(this.image, 29, 39, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 12, 39, 14, 14, this.x, this.y, 25, 25);
			} else {
				if(count < 5 && count >= 0) ctx.drawImage(this.image, 30, 57, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 13, 57, 14, 14, this.x, this.y, 25, 25);
			}
			break;
			case "upleft":
			if(this.action === "dig") {
				if(count < 5 && count >= 0) ctx.drawImage(this.image, 57, 39, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 74, 39, 14, 14, this.x, this.y, 25, 25);
			} else {
				if(count < 5 && count >= 0) ctx.drawImage(this.image, 56, 57, 14, 14, this.x, this.y, 25, 25);
				else ctx.drawImage(this.image, 73, 57, 14, 14, this.x, this.y, 25, 25);
			}
			break;
			default:
			console.log("no direction!");
		}
	}

	function getArrayPosition(x, y) {
		return Math.floor((x + (blockSize/2)) / blockSize) + Math.floor((y + (blockSize/2)) / blockSize) * xGridSize;
	}

	function almostEquals(object1, object2) {
		if (Math.abs(object1 - object2) < 0.001)
			return true
		else return false;
	}
}
