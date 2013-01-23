function Blob(blobX, blobY) {
	this.x = blobX;
	this.y = blobY;
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

	this.update = function(player) {
                distX = Math.abs(player.x - this.x);
                distY = Math.abs(player.y - this.y);
                if(distX < 100 && dist Y < 100) {
                        if(player.x < this.x)
                                this.moveLeft();
                        if(player.x > this.x)
                                this.moveRight();
                        if(player.y < this.y)
                                this.moveUp();
                        if(player.y > this.y)
                                this.moveDown();
                }	
	}
	
	this.draw = function() {
		
	}
}
