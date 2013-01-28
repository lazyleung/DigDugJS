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
                        if(this.x - this.speed > this.leftlimit) {
                                this.x -= this.speed;
                        }
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
                }	
	}
	
	this.draw = function(ctx) {
		var x = this.x;
		var y = this.y;
		ctx.drawImage(this.image, 332, 58, 14, 14, x, y, 25, 25);
		
	}

        function getArrayPosition(x, y) {
                return Math.floor((x + (blockSize/2)) / blockSize) + Math.floor((y + (blockSize/2)) / blockSize) * xGridSize;
        }
}
