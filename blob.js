function Blob(blobX, blobY) {
	this.x = blobX;
	this.y = blobY;
  this.width = 25;
  this.height = 25;
	this.speed = 1;
	this.rightlimit = 600-this.width;
	this.leftlimit = 0;
	this.downlimit = 600-this.height;
	this.uplimit = 0;
  this.image = new Image();
  this.image.src = "digdugsprite.png";
  this.direction = "right";
	this.animationCount = 0;
	this.waitCount = 0;

	this.moveRight = function() {
                futureX = this.x + blockSize/2;
                if (overlay[getArrayPosition(futureX, this.y)] !== 0000) {
                        if(this.x + this.speed < this.rightlimit) {
                                this.x += this.speed;
                        }
                        this.direction = "right";
                }
	}

	this.moveLeft = function() {
        	futureX = this.x - blockSize/2;
                if (overlay[getArrayPosition(futureX, this.y)] !== 0000) {
                        if(this.x - this.speed > this.leftlimit) {
                                this.x -= this.speed;
                        }
                        this.direction = "left";
                }
	}

	this.moveUp = function() {
        	futureY = this.y - blockSize/2;
                if (overlay[getArrayPosition(this.x, futureY)] !== 0000) {
                        if(this.y - this.speed > this.uplimit) {
                                this.y -= this.speed;
                        }
                }
	}

	this.moveDown = function() {
        	futureY = this.y + blockSize/2;
                if (overlay[getArrayPosition(this.x, futureY)] !== 0000) {
                        if(this.y + this.speed < this.downlimit) {
                                this.y += this.speed;
                        }
                }
	}


	this.update = function(player) {
                var distX = Math.abs(player.x - this.x);
                var distY = Math.abs(player.y - this.y);
                if(distX < 200 && distY < 200) {
                        if(player.x < this.x)
                                this.moveLeft();
                        else if(player.x > this.x)
                                this.moveRight();
                        if(player.y < this.y)
                                this.moveUp();
                        else if(player.y > this.y)
                                this.moveDown();
                } else {
									if (this.direction === "right") {
										if (overlay[getArrayPosition(this.x + blockSize/2, this.y)] !== 0000 && this.x + this.speed < this.rightlimit) {
                        this.x += this.speed;
										} else if (overlay[getArrayPosition(this.x - blockSize/2, this.y)] !== 0000) {
                      if(this.waitCount++ < 10 && this.x - this.speed > this.leftlimit) {
                        this.x -= this.speed;
                      } else {
												this.direction = "left";
												this.waitCount = 0;
											}
										}
									} else if (this.direction === "left") {
										if (overlay[getArrayPosition(this.x - blockSize/2, this.y)] !== 0000 && this.x - this.speed > this.leftlimit) {
												this.x -= this.speed;
										} else if (overlay[getArrayPosition(this.x + blockSize/2, this.y)] !== 0000) {
											if(this.waitCount++ < 10 && this.x + this.speed < this.rightlimit) {
												this.x += this.speed;
											} else {
												this.direction = "right";
												this.waitCount = 0;
											}
										}
									}
								}
								this.animationCount++;
								if(this.animationCount > 10) this.animationCount = 0;
	}
	
	this.draw = function(ctx) {
		var x = this.x;
		var y = this.y;
    if (this.direction === "right")
			if(this.animationCount < 5 && this.animationCount >= 0) ctx.drawImage(this.image, 332, 58, 13, 12, x, y, 25, 25);
			else ctx.drawImage(this.image, 315, 56, 13, 12, x, y, 25, 25);
    if (this.direction === "left")
      if(this.animationCount < 5 && this.animationCount >= 0) ctx.drawImage(this.image, 5, 283, 13, 12, x, y, 25, 25);
			else ctx.drawImage(this.image, 22, 281, 13, 12, x, y, 25, 25);


		
	}

        function getArrayPosition(x, y) {
                return Math.floor((x + (blockSize/2)) / blockSize) + Math.floor((y + (blockSize/2)) / blockSize) * xGridSize;
        }
}
