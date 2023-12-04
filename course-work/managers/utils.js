function printHist() {
    let table1 = JSON.parse(localStorage.getItem('records1'))
    let table2 = JSON.parse(localStorage.getItem('records2'))

    const tables = [table1, table2]

    for (let i = 0; i < tables.length; i++) {
        tables[i] = Array.from(Object.entries(tables[i]), ([key, value]) => [
            key,
            value
        ]).sort((a, b) => {
            if (b[1] === a[1]) {
                return a[0] < b[0] ? -1 : 1
            }
            return b[1] - a[1]
        })
    }

    console.log(tables)

    for (let j = 0; j < tables.length; j++) {
        let scoresDiv = document.querySelector('.scores-line')
        let line = document.createElement(`h1`)
        line.textContent = `Уровень ${j + 1}`
        scoresDiv.appendChild(line)

        for (let i = 0; i < Math.min(3, tables[j].length); i++) {
            let scoresDiv = document.querySelector('.scores-line')
            let line = document.createElement(`h2`)
            line.id = `line${i}`
            scoresDiv.appendChild(line)

            let el = tables[j][i]
            if (el !== undefined) {
                line.textContent = tables[j][i][0] + '. . . . . . . ' + tables[j][i][1]
            }
        }
    }
}

function restart() {
    window.location.href = 'https://localhost/level1/index.html'
}

setData = () => {
    let name = document.getElementById('playerId')
    name.textContent = 'Игрок: ' + localStorage.getItem('game.username')
}

saveResult = (score, lvl) => {
    let name = localStorage.getItem('game.username')
    let highscore = localStorage.getItem(`records${lvl}`)
    let table

    if (highscore) {
        table = JSON.parse(localStorage.getItem(`records${lvl}`))
    } else {
        table = {}
    }

    let element = [name, score]

    if (!table[element[0]] || Number(table[element[0]]) < Number(element[1])) {
        table[element[0]] = element[1]
    }

    localStorage.setItem(`records${lvl}`, JSON.stringify(table))
}

Array.prototype.parse2D = function (len) {
    const rows = []
    for (let i = 0; i < this.length; i += len) {
        rows.push(this.slice(i, i + len))
    }

    return rows
}

Array.prototype.createObjectsFrom2D = function () {
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol !== 0) {
                const block = new CollisionBlock({
                    position: {
                        x: x * 32,
                        y: y * 32
                    }
                })
                objects.push(block)
            }
        })
    })

    return objects
}

calculateInitialVelocity = ({ pos_x, pos_y }, target, gravity = 1) => {
    const deltaX = target.x - pos_x
    const deltaY = target.y - pos_y
    const time = 50 // Примерное время движения в миллисекундах

    const vx = deltaX / time / 1000

    // Вертикальная составляющая скорости с учетом гравитации
    const vy = deltaY / time + gravity * (time / 1000)

    return { vx, vy }
}

const animation = {
    PLAYER: {
        idleRight: {
            frameRate: 5,
            frameBuffer: 10,
            loop: true,
            imageSrc: 'Captain Clown Nose/Captain Clown Nose with Sword/09-Idle Sword r/Idle Sword 04.png'
        },
        idleLeft: {
            frameRate: 5,
            frameBuffer: 10,
            loop: true,
            imageSrc: 'Captain Clown Nose/Captain Clown Nose with Sword/idle l/Idle Sword 01.png'
        },
        runRight: {
            frameRate: 6,
            frameBuffer: 12,
            loop: true,
            imageSrc: 'Captain Clown Nose/Captain Clown Nose with Sword/10-Run Sword r/Run Sword 01.png'
        },
        runLeft: {
            frameRate: 6,
            frameBuffer: 12,
            loop: true,
            imageSrc: 'Captain Clown Nose/Captain Clown Nose with Sword/run l/Run Sword 01.png'
        },
        attackRight: {
            frameRate: 3,
            frameBuffer: 10,
            loop: true,
            imageSrc: 'Captain Clown Nose/Captain Clown Nose with Sword/16-Attack 2 r/Attack 2 01.png'
        },
        attackLeft: {
            frameRate: 3,
            frameBuffer: 10,
            loop: true,
            imageSrc: 'Captain Clown Nose/Captain Clown Nose with Sword/attack l/Attack 2 01.png'
        },
        hitRight: {
            frameRate: 4,
            frameBuffer: 12,
            loop: false,
            imageSrc: 'Captain Clown Nose/Captain Clown Nose with Sword/14-Hit Sword r/Hit Sword 01.png'
        },
        hitLeft: {
            frameRate: 4,
            frameBuffer: 12,
            loop: false,
            imageSrc: 'Captain Clown Nose/Captain Clown Nose with Sword/hit l/Hit Sword 01.png'
        }
    },
    ENEMY:{
        idleRight: {
            frameRate: 8,
            frameBuffer: 16,
            loop: true,
            imageSrc: 'Fierce Tooth/idle r/Idle 01.png'
        },
        idleLeft: {
            frameRate: 8,
            frameBuffer: 16,
            loop: true,
            imageSrc: 'Fierce Tooth/01-Idle l/Idle 01.png'
        },
        runRight: {
            frameRate: 6,
            frameBuffer: 12,
            loop: true,
            imageSrc: 'Fierce Tooth/run r/Run 01.png'
        },
        runLeft: {
            frameRate: 6,
            frameBuffer: 12,
            loop: true,
            imageSrc: 'Fierce Tooth/02-Run l/Run 01.png'
        },
        attackRight: {
            frameRate: 5,
            frameBuffer: 10,
            loop: false,
            imageSrc: 'Fierce Tooth/attack r/Attack 01.png'
        },
        attackLeft: {
            frameRate: 5,
            frameBuffer: 10,
            loop: false,
            imageSrc: 'Fierce Tooth/07-Attack l/Attack 01.png'
        },
        hitRight: {
            frameRate: 4,
            frameBuffer: 12,
            loop: false,
            imageSrc: "Fierce Tooth/08-Hit l/Hit 01.png"
        },
        hitLeft: {
            frameRate: 4,
            frameBuffer: 12,
            loop: false,
            imageSrc: "Fierce Tooth/08-Hit l/Hit 01.png"
        }
    },
    HEAL:{
        idle:{
            frameRate: 7,
            frameBuffer: 14,
            loop: true,
            imageSrc: 'potion/01.png'
        }
    },
    KEY:{
        idle:{
            frameRate: 8,
            frameBuffer: 16,
            loop: true,
            imageSrc: 'Chest Key/1.png'
        }
    },
    CHEST:{
        idle:{
            frameRate: 1,
            frameBuffer: 1,
            loop: true,
            imageSrc: 'chest/1.png'
        }
    }

}