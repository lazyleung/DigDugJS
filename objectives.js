function Mushroom(mushroomX, mushroomY) {
	this.x = mushroomX;
	this.y = mushroomY;
    this.width = 25;
    this.height = 25;
    this.image = new Image();
    this.image.src = "digdugsprite.png";
    this.points = 50;
	this.update = function() {
    	this.draw();	
	}
	
	this.draw = function(ctx) {
		var x = this.x;
		var y = this.y;
		ctx.drawImage(this.image, 316, 141, 12, 14, x, y, 25, 25);
	}

}

function Carrot(carrotX, carrotY) {
	this.x = carrotX;
	this.y = carrotY;
    this.width = 25;
    this.height = 25;
    this.image = new Image();
    this.image.src = "digdugsprite.png";
    this.points = 75;
	this.update = function() {
    	this.draw();	
	}
	
	this.draw = function(ctx) {
		var x = this.x;
		var y = this.y;
		ctx.drawImage(this.image, 178, 123, 12, 14, x, y, 25, 25);
	}

}

function Watermelon(watermelonX, watermelonY) {
	this.x = watermelonX;
	this.y = watermelonY;
    this.width = 25;
    this.height = 25;
    this.image = new Image();
    this.image.src = "digdugsprite.png";
    this.points = 100;
	this.update = function() {
    	this.draw();	
	}
	
	this.draw = function(ctx) {
		var x = this.x;
		var y = this.y;
		ctx.drawImage(this.image, 210, 144, 20, 14, x, y, 25, 25);
	}

}

function Eggplant(eggplantX, eggplantY) {
	this.x = eggplantX;
	this.y = eggplantY;
    this.width = 25;
    this.height = 25;
    this.image = new Image();
    this.image.src = "digdugsprite.png";
    this.points = 150;
	this.update = function() {
    	this.draw();	
	}
	
	this.draw = function(ctx) {
		var x = this.x;
		var y = this.y;
		ctx.drawImage(this.image, 278, 140, 20, 14, x, y, 25, 25);
	}

}

function Flower(flowerX, flowerY) {
	this.x = flowerX;
	this.y = flowerY;
    this.width = 25;
    this.height = 25;
    this.image = new Image();
    this.image.src = "digdugsprite.png";
    this.points = 250;
	this.update = function() {
    	this.draw();	
	}
	
	this.draw = function(ctx) {
		var x = this.x;
		var y = this.y;
		ctx.drawImage(this.image, 105, 340, 16, 24, x, y, 25, 25);
	}

}

function Cucumber(cucumberX, cucumberY) {
	this.x = cucumberX;
	this.y = cucumberY;
    this.width = 25;
    this.height = 25;
    this.image = new Image();
    this.image.src = "digdugsprite.png";
    this.points = 25;
	this.update = function() {
    	this.draw();	
	}
	
	this.draw = function(ctx) {
		var x = this.x;
		var y = this.y;
		ctx.drawImage(this.image, 39, 366, 16, 16, x, y, 25, 25);
	}

}
