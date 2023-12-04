const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 32 * 30 // 1024
canvas.height = 32 * 20 // 576

setData()
console.log('!!!!!true ready:', gameManager.true_ready)
gameManager.loadAll(c, 2)
console.log('!!!!!true ready:', gameManager.true_ready)
if(gameManager.true_ready)
    gameManager.play()