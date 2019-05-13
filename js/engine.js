let startGame = () => {
  let Engine = (function(global) {
    var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    lastTime;
  
    canvas.width = 909;
    canvas.height = 606;
    doc.body.appendChild(canvas);
  
    function main() {
      var now = Date.now(),

      dt = (now - lastTime) / 1000.0;
      update(dt);
      render();  
      
      lastTime = now;
      win.requestAnimationFrame(main);
    }
  
    function init() {
      lastTime = Date.now();
      main();
    }
  
    function update(dt) {
      updateEntities(dt);
      if (!levelOver) {
        checkCollisions();
      } 
    }
  
    function updateEntities(dt) {
      if (levelOver == false) {
        Enemy.allEnemies.forEach(function(enemy) {
        enemy.update(dt);
        });
      }
    }
  

    function render() {
      var rowImages = [
        'images/water-block.png',   // Top row is water
        'images/stone-block.png',   // Row 1 of 3 of stone
        'images/stone-block.png',   // Row 2 of 3 of stone
        'images/stone-block.png',   // Row 3 of 3 of stone
        'images/grass-block.png',   // Row 1 of 2 of grass
        'images/grass-block.png'    // Row 2 of 2 of grass
      ],

      numRows = 6,
      numCols = 9,
      row, col;
  
      // Before drawing, clear existing canvas
      ctx.clearRect(0,0,canvas.width,canvas.height);

      for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {
          ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
        }
      }
      renderEntities();
    }
  
    function renderEntities() {
      Enemy.allEnemies.forEach(function(enemy) {
        enemy.render();
      });
      player.render();
    }
  
    Resources.load([
      'images/stone-block.png',
      'images/water-block.png',
      'images/grass-block.png',
      'images/enemy-bug.png',
      'images/char-boy.png',
      `images/enemy-bug-flip.png`,
    ]);

    Resources.onReady(init);
    global.ctx = ctx;
  })(this);
}

document.querySelector(".start-button").addEventListener("click", () => { 
  document.querySelector(".start-button").style.display = "none";
  document.querySelector("header").style.display = "flex";
  document.querySelector("header").style.alignContent = "space-between";
  startGame()
})