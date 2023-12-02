class Chest extends Entity {
    constructor() {
        super()

        this.velocity = {
            x: 0,
            y: 0
        }

        this.hitboxOffset = {
            xOffset: 0,
            yOffset: 0
        }

        this.hitbox = {
            position: {
                x: this.position.x + this.hitboxOffset.xOffset,
                y: this.position.y + this.hitboxOffset.yOffset
            },
            width: 32,
            height: 32
        }

        this.animations = animation.CHEST

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

    update() {
        physicManager.update(this)
        const entity = physicManager.entityAtXY(this)
        if (entity !== null) {
            if (entity instanceof Player && gameManager.player.got_key) {
                entity.onTouch(this)
            }
        }
    }

}