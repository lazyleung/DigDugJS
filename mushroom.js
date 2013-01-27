function Mushroom(mushroomX, mushroomY) {
	this.x = mushroomX;
	this.y = mushroomY;
        this.width = 25;
        this.height = 25;

	this.update = function() {
    	this.draw();	
	}
	
	this.draw = function(ctx) {
		var image = new Image();
		image.src = "digdugsprite.png";
		var x = this.x;
		var y = this.y;
		image.onload = function(){
			ctx.drawImage(image, 316, 141, 12, 14, x, y, 25, 25);
		}
	}

}
