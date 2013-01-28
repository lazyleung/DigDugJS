function Mushroom(mushroomX, mushroomY) {
	this.x = mushroomX;
	this.y = mushroomY;
    this.width = 25;
    this.height = 25;
    this.image = new Image();
    this.image.src = "digdugsprite.png";

	this.update = function() {
    	this.draw();	
	}
	
	this.draw = function(ctx) {
		var x = this.x;
		var y = this.y;
		ctx.drawImage(this.image, 316, 141, 12, 14, x, y, 25, 25);
	}

}
