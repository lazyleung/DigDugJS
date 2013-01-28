function Cloud() {
	this.y = Math.random() * 40;
	this.speed = (Math.random()+.3)/2;
        this.cloudType = Math.random();
        this.direction = Math.random();
        this.leftSpawn = -65;
        this.rightSpawn = 601;
        this.timeOnMap = 0;
        this.image = new Image();
        this.image.src = "cloudSprite.png";

        if (this.direction < .5)
                this.x = this.rightSpawn;
        else
                this.x = this.leftSpawn;
        

	this.move = function() {
                if (this.direction < .5)
                        this.x -= this.speed;
                else
                        this.x += this.speed;
	}

	this.update = function() {
                this.move();
                this.timeOnMap += .3;	
	}
	
	this.draw = function(ctx) {
		var x = this.x;
		var y = this.y;
                if (this.cloudType < .5) {
        		ctx.drawImage(this.image, 0, 0, 32, 24, x, y, 32, 24);	
                }
                else {
                        ctx.drawImage(this.image, 34, 0, 64, 24, x, y, 64, 24);     
                }
	}
}
