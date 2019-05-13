let allFinalSCores = [];
let initialSpeedInterval = 101 // -100 & +100
let onLevel = 1
let amountofEnemies = 3
let amountOfLives = 3

class Enemy {
  constructor(x = 10) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = 129;
    this.xv = getRandomSpeed(initialSpeedInterval - 50, initialSpeedInterval + 50)
    this.positiveDirection = true;
  }

  static allEnemies = []

  static create() {
    Enemy.allEnemies.push(new Enemy)
    Enemy.allEnemies.push(new Enemy(801))
    Enemy.allEnemies.push(new Enemy)
  
    Enemy.allEnemies[1].sprite = `images/enemy-bug-flip.png`
    Enemy.allEnemies[0].y = 47
    Enemy.allEnemies[1].y = 129
    Enemy.allEnemies[2].y = 211
  }

  update(dt) {
    if (this.positiveDirection) {
      this.x += this.xv * dt;
      if (this.x > 800) {
        this.sprite = `images/enemy-bug-flip.png`
        this.positiveDirection = false;
      }
    } else {
      this.x -= this.xv * dt;
      if (this.x < -4) {
        this.positiveDirection = true;
        this.sprite = `images/enemy-bug.png`
      }
    }
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};

class Player {
  constructor() {
    this.sprite = 'images/char-boy.png'
    this.x = 404;
    this.y = 375;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }

  handleInput(keypress) {
    if (keypress === "right" && player.x != 812) {
      player.x += 102
    } else if (keypress === "left" && player.x != -4) {
      player.x -= 102
    } else if (keypress === "up" && player.y != -35) {
      player.y -= 82
    } else if (keypress === "down" && player.y != 375) {
      player.y += 82
    }
  }
}

getRandomSpeed = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

updateLives = () => {
  document.querySelector(".lives-indicator").innerHTML = ""
  for (let x = amountOfLives; x > 0; x--) {
    document.querySelector(".lives-indicator").insertAdjacentHTML("afterbegin", `<img src="images/Heart.png" alt="heart" width="50px" height="85px">`)
  }
}

checkCollisions = () => {
  let enemyPos = [];
  
  for (let i = 0; i < amountofEnemies; i++) { // [x,y  x,y  x,y]
    enemyPos.push(Enemy.allEnemies[i].x)
    enemyPos.push(Enemy.allEnemies[i].y)

    if (Math.abs(enemyPos[i*2] - player.x) < 75 && Math.abs(enemyPos[(i*2) + 1] - player.y) < 50) { 
      levelOver = true

      setTimeout(() => {
        player.y = 375;
        player.x = 404;
        amountOfLives-- 
        levelOver = false;
        updateLives()

        if (amountOfLives === 0) { // game over
          levelOver = true
          allFinalSCores.push(onLevel);
          swal({
            title: "Game Over",
            text: `You got to stage ${onLevel}\nYour highscore is ${Math.max.apply( Math, allFinalSCores )}`,
            button: "Try Again"
          });

          document.querySelector(".swal-button").addEventListener("click", () => {
            levelOver = false;
            onLevel = 1;
            document.querySelector(".level-indicator").textContent = onLevel
            updateLives()
            updateHighscore()
            initialSpeedInterval = 101;

            Enemy.allEnemies.forEach((ene) => {
              ene.xv = getRandomSpeed(initialSpeedInterval - 50, initialSpeedInterval + 50)
            })
          })
          
          amountOfLives = 3;
        }
      }, 300)
    }
  }
}

let checkForWin = () => {
  if (player.y === -35) {
    levelOver = true

    setTimeout(() => {
      swal({
        title: "Good job!",
        text: `You beat Level ${onLevel}`,
        icon: "success",
        button: "Next level"
      });

      initialSpeedInterval += 50;

      Enemy.allEnemies.forEach((ene) => {
        ene.xv = getRandomSpeed(initialSpeedInterval - 100, initialSpeedInterval + 100)
      })

      document.querySelector(".swal-button").addEventListener("click", () => {
        player.y = 375;
        player.x = 404;
        levelOver = false
        onLevel++
        document.querySelector(".level-indicator").textContent = onLevel;
      })
    }, 300)    
  }
}

document.addEventListener('keyup', function(e) {
  if (levelOver === false) {
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    checkForWin()
  }
});

let updateHighscore = () => {
  if (allFinalSCores.length > 0) {
    document.querySelector(".highscore").textContent = `Best: ${Math.max.apply( Math, allFinalSCores )}`
  }
}


player = new Player;
Enemy.create()
let levelOver = false
updateLives()
updateHighscore()