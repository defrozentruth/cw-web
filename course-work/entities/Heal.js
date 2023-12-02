class Heal extends Entity {
    constructor() {
        super()

        this.animations = animation.HEAL

        this.velocity = {
            x: 0,
            y: 0
        }

        this.hitboxOffset = {
            xOffset: -5,
            yOffset: 0
        }

        this.hitbox = {
            position: {
                x: this.position.x + this.hitboxOffset.xOffset,
                y: this.position.y + this.hitboxOffset.yOffset
            },
            width: 24,
            height: 36
        }

        this.frames = {
            elapsedFrames: 0,
            currentFrame: 0
        }

        this.currentAnimation = this.animations.idle
    }

    draw() {
        c.fillStyle = 'rgba(0, 255, 0, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        spriteManager.drawSprite(c, this, this.position.x, this.position.y)
    }

    kill() {
        gameManager.kill(this)
    }

    update() {
        physicManager.update(this)
        const entity = physicManager.entityAtXY(this)
        if (entity !== null) {
            if (entity instanceof Player) {
                entity.onTouch(this)
                this.kill()
            }
        }
    }

    switchAnimation(type) {
        if (this.currentAnimation.imageSrc === this.animations[type].imageSrc)
            return
        this.currentAnimation = this.animations[type]
        this.currentFrame = 0
    }
}