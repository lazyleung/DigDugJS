function Dragon(dragonX, dragonY) {
    this.x = dragonX;
    this.y = dragonY;
    this.width = 25;
    this.height = 25;
    this.speed = 1;
    this.rightlimit = 600-this.width;
    this.leftlimit = 0;
    this.downlimit = 600-this.height;
    this.uplimit = 0;
    this.direction = "right";
    this.image = new Image();
    this.image.src = "digdugsprite.png";
    this.fireCooldown = 100;

    function Fire(x, y) {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
    }

    this.moveRight = function() {
        var futureX = this.x + blockSize/2;
        if (overlay[getArrayPosition(futureX, this.y)] !== 0000) {
            if(this.x + this.speed < this.rightlimit) {
                this.x += this.speed;
                this.direction = "right";
            }
        }
            
    }

    this.moveLeft = function() {
        var futureX = this.x - blockSize/2;
        if (overlay[getArrayPosition(futureX, this.y)] !== 0000) {
                if(this.x - this.speed > this.leftlimit) {
                    this.x -= this.speed;
                    this.direction = "left";
                }
            }
    }

    this.moveUp = function() {
        var futureY = this.y - blockSize/2;
            if (overlay[getArrayPosition(this.x, futureY)] !== 0000) {
                if(this.y - this.speed > this.uplimit) {
                    this.y -= this.speed;
                    this.direction = "up";
                }
            }
    }

    this.moveDown = function() {
        var futureY = this.y + blockSize/2;
            if (overlay[getArrayPosition(this.x, futureY)] !== 0000) {
                if(this.y + this.speed < this.downlimit) {
                    this.y += this.speed;
                    this.direction = "down";
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

        // Breath fire
        if (this.fireCooldown <= 1) {
            console.log("breathing Fire");
            this.breathFire();
            this.fireCooldown = 100;
        }
        else {
            this.fireCooldown -= 1;
        }
    }
    
    this.breathFire = function() {
        var fire = new Fire();
        fire.x = this.x;
        fire.y = this.y;
        console.log(fire);
        switch (this.direction) {
            case "left":
                fire.x -= 25;
                if (hasCollided(player, fire) === true) {
                    player.wasHit = 1;
                    break;
                }
                fire.x -= 25;
                if (hasCollided(player, fire) === true) {
                    player.wasHit = 1;
                    break;
                }
                break;

            case "right":
                fire.x += 25;
                if (hasCollided(player, fire) === true) {
                    player.wasHit = 1;
                    break;
                }
                fire.x += 25;
                if (hasCollided(player, fire) === true) {
                    player.wasHit = 1;
                    break;
                }
                break;

            case "up":
                fire.y -= 25;
                if (hasCollided(player, fire) === true) {
                    player.wasHit = 1;
                    break;
                }
                fire.y -= 25;
                if (hasCollided(player, fire) === true) {
                    player.wasHit = 1;
                    break;
                }
                break;

            case "down":
                fire.y += 25;
                if (hasCollided(player, fire) === true) {
                    player.wasHit = 1;
                    break;
                }
                fire.y += 25;
                if (hasCollided(player, fire) === true) {
                    player.wasHit = 1;
                    break;
                }
        }

    }

    this.draw = function(ctx) {
        var x = this.x;
        var y = this.y;
        ctx.drawImage(this.image, 314, 90, 14, 14, x, y, 25, 25);
        
    }

    function getArrayPosition(x, y) {
            return Math.floor((x + (blockSize/2)) / blockSize) + Math.floor((y + (blockSize/2)) / blockSize) * xGridSize;
    }
    

}
