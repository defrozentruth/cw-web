class Player extends Entity {
    constructor() {
        super()

        this.lifetimes = 3

        this.velocity = {
            x: 0,
            y: 0
        }

        this.hitboxOffset = {
            xOffset: 18,
            yOffset: 0
        }

        this.hitbox = {
            position: {
                x: this.position.x + this.hitboxOffset.xOffset,
                y: this.position.y + this.hitboxOffset.yOffset
            },
            width: 38,
            height: 32
        }

        this.animations = animation.PLAYER

        this.frames = {
            elapsedFrames: 0,
            currentFrame: 0
        }

        this.currentAnimation = this.animations.idleRight

        this.direction = 'right'
    }

    draw() {
        spriteManager.drawSprite(c, this, this.position.x, this.position.y)
        c.fillStyle = 'rgba(0, 255, 0, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        if (this.currentAnimation.finished) {
            this.switchAnimation(
                this.direction === 'right' ? 'idleRight' : 'idleLeft'
            )
        }
    }

    update() {
        physicManager.update(this)
    }

    switchAnimation(type) {
        if (this.currentAnimation.imageSrc === this.animations[type].imageSrc)
            return
        this.currentAnimation = this.animations[type]
        this.currentFrame = 0
    }

    attack() {
        const entity = physicManager.entityAtXY(
            this,
            this.position.x,
            this.position.y
        )
        if (entity && entity instanceof Enemy) {
            entity.onTouch(this) // Допустим, что у врага есть метод takeDamage()
        }
    }

    onTouch(obj) {
        if (obj instanceof Enemy) {
            this.switchAnimation(this.direction === 'right' ? 'hitRight' : 'hitLeft')
            this.lifetimes--
        }

        if (obj instanceof Chest) {
            if (eventManager.keys.spacePressed && gameManager.got_key === true) {
                eventManager.preventInput = true
                eventManager.keys.spacePressed = false
                gameManager.score += 500
                this.position.x = obj.position.x - 15
                gameManager.newLVL()
            }
        }

        if (obj instanceof Heal) {
            this.lifetimes++
            gameManager.score += 50
        }

        if (obj instanceof Key) {
            gameManager.got_key = true
            gameManager.score += 200
        }


        if (this.lifetimes === 0) {
            gameManager.gameOver()
        }
    }
}