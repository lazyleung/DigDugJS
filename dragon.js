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
    this.fireState = 0;

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
                }
            }
    }

    this.moveDown = function() {
        var futureY = this.y + blockSize/2;
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

        // Breath fire
        if (this.fireCooldown <= 1) {
            console.log("breathing Fire");
            this.breathFire();
            this.fireCooldown = 100;
        }
        else {
            this.fireCooldown -= 1;
        }

        // Control fire animation frames
        if (this.fireState > 0) {
            this.fireState += .3
            if (this.fireState >= 4)
                this.fireState = 0;
        }
    }
    
    this.breathFire = function() {
        var fire = new Fire();
        fire.x = this.x;
        fire.y = this.y;
        switch (this.direction) {
            case "left":
                fire.x -= 25;
                if (hasCollided(player, fire) === true) {
                    player.wasBurned = 1;
                    break;
                }
                fire.x -= 25;
                if (hasCollided(player, fire) === true) {
                    player.wasBurned = 1;
                    break;
                }
                break;

            case "right":
                fire.x += 25;
                if (hasCollided(player, fire) === true) {
                    player.wasBurned = 1;
                    break;
                }
                fire.x += 25;
                if (hasCollided(player, fire) === true) {
                    player.wasBurned = 1;
                    break;
                }
                break;
        }
        this.fireState = .1;
    }

    this.draw = function(ctx) {
        var x = this.x;
        var y = this.y;

        //  Draw dragon
        if (this.direction === "right")
            ctx.drawImage(this.image, 315, 91, 13, 13, x, y, 25, 25);
        else if (this.direction === "left")
            ctx.drawImage(this.image, 22, 316, 13, 13, x, y, 25, 25);

        // Draw Fire
        if (this.fireState > 0) {
            if (this.direction === "left") {
                if (this.fireState < 1)
                    ctx.drawImage(this.image, 3, 333, 16, 13, x - 16, y, 16, 13);
                else if (this.fireState < 2)
                    ctx.drawImage(this.image, 3, 348, 32, 16, x - 32, y, 32, 16);
                else if (this.fireState < 3)
                    ctx.drawImage(this.image, 21, 331, 48, 16, x - 48, y, 48, 16);
            }

            else if (this.direction === "right") {
                if (this.fireState < 1)
                    ctx.drawImage(this.image, 331, 108, 16, 13, x + 25, y, 16, 13);
                else if (this.fireState < 2)
                    ctx.drawImage(this.image, 315, 123, 32, 16, x + 25, y, 32, 16);
                else if (this.fireState < 4)
                    ctx.drawImage(this.image, 281, 106, 48, 16, x + 25, y, 48, 16);
            }

        }

        
    }

    function getArrayPosition(x, y) {
            return Math.floor((x + (blockSize/2)) / blockSize) + Math.floor((y + (blockSize/2)) / blockSize) * xGridSize;
    }
    

}
