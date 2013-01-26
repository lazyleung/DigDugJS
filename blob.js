function Blob(blobX, blobY) {
	this.x = blobX;
	this.y = blobY;
	this.speed = 1;
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

	this.update = function(player) {
                var distX = Math.abs(player.x - this.x);
                var distY = Math.abs(player.y - this.y);
                if(distX < 100 && distY < 100) {
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
	
	this.draw = function(ctx) {
		var image = new Image();
		image.src = "digdugsprite.png";
		var x = this.x;
		var y = this.y;
		image.onload = function(){
			ctx.drawImage(image, 332, 58, 14, 14, x, y, 25, 25);
		}
	}
}
