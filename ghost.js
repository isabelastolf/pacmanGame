class Ghosts {
    constructor(
        x, 
        y, 
        width, 
        height, 
        speed, 
        imageX, 
        imageY, 
        imageWidth, 
        imageHeight, 
        range
    ) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.speed = speed;
            this.direction = DIRECTION_RIGHT;
            this.imageX = imageX;
            this.imageY = imageY;
            this.imageWidth = imageWidth;
            this.imageHeight = imageHeight;
            this.range = range;
            this.randomTargetIndex = parseInt(Math.random() * 4);
            this.target = randomTargetForGhosts[this.randomTargetIndex];
            setInterval(() => {
                this.changeRandomDirection();
            }, 10000)
    }

    isInRange() {
        let xDistance = Math.abs(pacman.getMapX() - this.getMapX());    
        let yDistance = Math.abs(pacman.getMapY() - this.getMapY());
        if (
            Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= 
            this.range)
            {
                return true;
            } return false;
    }

    changeRandomDirection () {
        if (this.isInRange()) {
            this.target = pacman;
        } else {
            this.target = randomTargetsForGhosts[this.randomTargetIndex];
        }
    }

    moveProcess() {
        if (this.isInRange()) {
            this.target = pacman;
        } else {
            this.target = randomTargetsForGhosts[this.randomTargetIndex];
        }
        this.changeDirectionIfPossible();
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackwards();
        }
    }

    moveBackwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x -= this.speed;
            break;
            case DIRECTION_UP:
                this.y += this.speed;
            break;
            case DIRECTION_LEFT:
                this.x += this.speed;
            break;
            case DIRECTION_BOTTOM:
                this.y -= this.speed;
            break;
        }
    }

    moveForwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed;
            break;
            case DIRECTION_UP:
                this.y -= this.speed;
            break;
            case DIRECTION_LEFT:
                this.x -= this.speed;
            break;
            case DIRECTION_BOTTOM:
                this.y += this.speed;
            break;
        }
    }

    checkCollision() {
        let isCollided = false;
        if (
            map[this.getMapY()][this.getMapX()] == 1 ||
            map[this.getMapYRightSide()][this.getMapX()] == 1 ||
            map[this.getMapYRightSide()][this.getMapXRightSide()] == 1 ||
            map[this.getMapY()][this.getMapXRightSide()] == 1
        ) {
            isCollided = true;
        }
        return isCollided;
    }

    changeDirectionIfPossible() {
        let tempDirection = this.direction;
        this.direction = this.newDirection;
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackwards();
            this.direction = tempDirection;
        } else {
            this.moveBackwards();
        }
    }

    NewDirection(map, destX, destY) {
        let mp = [];
        for (let i = 0; i < map.length; i++) {
            mp[i] = map[i].slice();
        }
    }

    // addNeighbors() {
    // }

    getMapX() {
        return parseInt(this.x / oneBlockSize);
    }

    getMapY() {
        return parseInt(this.y / oneBlockSize);
    }

    getMapXRightSide() {
        return parseInt((this.x + 0.9999 * oneBlockSize) / oneBlockSize);
    }

    getMapYRightSide() {
      return parseInt((this.y + 0.9999 * oneBlockSize) / oneBlockSize);
    }
}

changeAnimation(){
    this.currentFrame = 
        this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
}

draw() {
    canvasContext.save();
    canvasContext.drawImage(
        ghostFrames,
        this.imageX,
        this.imageY,
        this.imageWidth,
        this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height
    );
    canvasContext.restore();
}

let updateGhosts = () {
    for (let i = 0, i < ghosts.length, i++) {
        ghosts[i].moveProcess();
    }
};

// let drawGhosts = () => {
// }