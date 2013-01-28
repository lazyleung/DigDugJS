function Rock(rockX, rockY) {
	this.x = rockX;
	this.y = rockY;
        this.width = 25;
        this.height = 25;
	this.speed = 5;
	this.downlimit = 550-this.height;
        this.image = new Image();
        this.image.src = "digdugsprite.png";
        this.animationCount = 0;
        this.hitGround = 0; // 0 = not moved, 1 = falling, 2 = hit ground

	this.moveRight = function() {
                futureX = this.x + blockSize/2;
                if (overlay[getArrayPosition(futureX, this.y)] !== 0000) {
                        if(this.x + this.speed < this.rightlimit) {
                                this.x += this.speed;
                        }
                }
        	
	}

	this.moveLeft = function() {
        	futureX = this.x - blockSize/2;
                if (overlay[getArrayPosition(futureX, this.y)] !== 0000) {
                        if(this.x - this.speed < this.rightlimit) {
                                this.x -= this.speed;
                        }
                }
	}

	this.moveUp = function() {
        	futureY = this.y - blockSize/2;
                if (overlay[getArrayPosition(this.x, futureY)] !== 0000) {
                        if(this.y - this.speed < this.rightlimit) {
                                this.y -= this.speed;
                        }
                }
	}

	this.moveDown = function() {
               if (spriteArray[getArrayPosition(this.x, this.y + this.speed)] === 0000) {
                        this.y += this.speed;
                        this.speed += 3;
                        this.hitGround = 1;
               }
               else
                if (this.hitGround === 1)
                        this.hitGround = 2;
                console.log(this.y, " + ", this.speed);
	}

	this.update = function() {
                this.moveDown();
                if (this.hitGround === 2) {
                        if(this.animationCount === 1)
                                this.animationCount = 2;
                        this.animationCount += .25;
                }
	}
	
	this.draw = function(ctx) {
		var x = this.x;
		var y = this.y;
                if (this.animationCount < 1)
                        ctx.drawImage(this.image, 297, 124, 16, 14, x, y, 25, 25);       
                else if (this.animationCount < 2)
                        ctx.drawImage(this.image, 280, 123, 16, 15, x, y, 25, 25);
                else if (this.animationCount < 3)
                        ctx.drawImage(this.image, 263, 124, 16, 14, x, y, 25, 25);
                else if (this.animationCount < 4)
                        ctx.drawImage(this.image, 247, 124, 16, 14, x, y, 25, 25);
	}

        function getArrayPosition(x, y) {
                return Math.floor((x + (blockSize/2)) / blockSize) + Math.floor((y + (blockSize/2)) / blockSize) * xGridSize;
        }
}
