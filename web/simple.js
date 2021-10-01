class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
  }

  clear() {
    this.ctx.fillStyle = '#100000'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawHorizontalCenteredText(msg, yOffset) {
    const txSize = this.ctx.measureText(msg)
    const centerOffsetX = (this.canvas.width / 2) - (txSize.width / 2)
    const centerOffsetY = this.canvas.height / 3
    this.ctx.fillText(msg, centerOffsetX, centerOffsetY + yOffset)
  }

  start() {
    setInterval(() => {
      this.clear()
      this.ctx.fillStyle = getRandomColor()
      this.ctx.font = 'bold 30px Cursive'
  
      this.drawHorizontalCenteredText('Hello world', 0)
      this.drawHorizontalCenteredText(`It's ${new Date().toLocaleString()}`, 50)
    }, 200)
  }
}

function getRandomColor() {
  // Get a random color
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function load() {
  const canvas = document.getElementById('canvas')
  // draw black background
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')
  // draw the game
  const game = new Game(canvas, ctx)
  game.start()
}

load()
