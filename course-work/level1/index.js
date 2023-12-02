const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 32 * 30 // 1024
canvas.height = 32 * 20 // 576

setData()
gameManager.loadAll(c, 1)
gameManager.play()