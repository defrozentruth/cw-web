const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 32 * 40 // 1024
canvas.height = 32 * 20 // 576

setData()
gameManager.loadAll(c, 2)
gameManager.play()