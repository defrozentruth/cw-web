class GameManager {
    constructor() {
        this.factory = new Factory()

        this.factory.registerType('Player', Player)
        this.factory.registerType('Enemy', Enemy)
        this.factory.registerType('Heal', Heal)
        this.factory.registerType('Key', Key)
        this.factory.registerType('Chest', Chest)

        this.entities = []
        this.player = null
        this.laterKill = []
        this.score = 0
        this.got_key = false
        this.gameOverFlag = false
        this.lvl = 1
        this.levels = ['../map1.json', '../map2.json']
        this.true_ready = false
        this.music = [
            "../sound/background.mp3", "../sound/Bullet.wav", "../sound/Collectibles.wav",
            "../sound/Hit.wav", "../sound/Jump.wav", "../sound/Steps.wav"
        ];
    }

    initPlayer(obj) {
        this.player = obj
    }

    kill(obj) {
        this.laterKill.push(obj)
    }

    update() {
        if (this.player === null) {
            return
        }

        this.player.velocity.x = 0

        if (eventManager.keys.d.pressed) this.player.velocity.x = 3
        else if (eventManager.keys.a.pressed) this.player.velocity.x = -3

        this.entities.forEach(e => {
            try {
                if (e.name === 'tooth') e.move(this.player)
                e.draw()
                e.update()
            } catch (ex) {
                console.log(ex)
            }
        })

        this.laterKill.forEach(killObj => {
            const idx = this.entities.indexOf(killObj)
            if (idx > -1) {
                this.entities.splice(idx, 1)
            }
        })

        if (this.laterKill.length > 0) {
            this.laterKill.length = 0
        }

        this.updateHeals()
        this.updateScore()

        mapManager.draw(c)
        this.draw(c)
        //mapManager.collision.forEach(elem => elem.draw())

    }

    draw(ctx) {
        this.entities.forEach(e => e.draw(ctx))
    }

    loadAll(ctx, lvl) {
        this.lvl = lvl
        console.log('lvl:', this.lvl)
        console.log(this.levels)
        console.log(this.levels[this.lvl-1])
        mapManager.loadMap(this.levels[this.lvl - 1])
        console.log('he')
        spriteManager.loadAtlas(
            '../sprites.json',
            '../spritesheet.png'
        )
        soundManager.init()
        soundManager.loadArray(this.music);
        mapManager.parseEntities()
        mapManager.draw(ctx)
        soundManager.play("../sound/background.mp3", { volume: 0.5 });

    }

    play() {
        console.log('start play')
        if (!gameManager.gameOverFlag) {
            window.requestAnimationFrame(gameManager.play)
            updateWorld()
        }
    }

    gameOver() {
        this.gameOverFlag = true
        saveResult(gameManager.score, gameManager.lvl)
        window.location.href = '/highscores/index.html'
    }

    win() {
        window.location.href = '/highscores/index.html'
    }

    newLVL() {
        gameManager.score += gameManager.player.lifetimes * 100
        saveResult(gameManager.score, gameManager.lvl)
        gameManager.lvl += 1
        if (gameManager.lvl > 2) {
            gameManager.win()
            return
        }
        window.location.href = `/level${gameManager.lvl}/index.html`
    }

    updateScore = () => {
        let score = document.getElementById('scoreId')
        score.textContent = 'Текущий счет: ' + gameManager.score
    }

    updateHeals = () => {
        let score = document.getElementById('levelId')
        score.textContent = 'Количество жизней: ' + this.player.lifetimes
    }
}

function updateWorld() {
    gameManager.update()
}

const gameManager = new GameManager()