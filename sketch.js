    let dino;
let cacti = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(600, 200);
  dino = new Dino();
}

function draw() {
  background(220);
  
  // Draw ground
  fill(100, 200, 100);
  rect(0, height - 20, width, 20);
  
  // Update and display the dino
  if (!gameOver) {
    dino.update();
    dino.display();

    // Update score
    score++;
    
    // Create cacti
    if (frameCount % 60 === 0) {
      cacti.push(new Cactus());
    }

    // Update and display cacti
    for (let i = cacti.length - 1; i >= 0; i--) {
      cacti[i].update();
      cacti[i].display();
      
      // Check for collision
      if (dino.hits(cacti[i])) {
        gameOver = true;
      }
      
      // Remove cacti that have gone off screen
      if (cacti[i].offscreen()) {
        cacti.splice(i, 1);
      }
    }
    
    // Display score
    fill(0);
    textSize(20);
    text('Score: ' + score, 10, 30);
  } else {
    textSize(32);
    fill(255, 0, 0);
    text('Game Over', width / 2 - 80, height / 2);
    textSize(20);
    fill(0);
    text('Score: ' + score, width / 2 - 40, height / 2 + 30);
  }
}

function keyPressed() {
  if (key === ' ') {
    dino.jump();
  }
}

class Dino {
  constructor() {
    this.x = 50;
    this.y = height - 40;
    this.gravity = 1;
    this.lift = -15;
    this.velocity = 0;
  }
  
  jump() {
    if (this.y === height - 40) {
      this.velocity += this.lift;
    }
  }
  
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    // Prevent dino from falling below the ground
    if (this.y > height - 40) {
      this.y = height - 40;
      this.velocity = 0;
    }
  }
  
  display() {
    fill(200, 100, 100);
    rect(this.x, this.y, 20, 20);
  }
  
  hits(cactus) {
    return (this.x + 20 > cactus.x && this.x < cactus.x + cactus.width && this.y + 20 > height - cactus.height - 20);
  }
}

class Cactus {
  constructor() {
    this.x = width;
    this.height = random(20, 50);
    this.width = 20;
    this.speed = 6;
  }
  
  update() {
    this.x -= this.speed;
  }
  
  display() {
    fill(150, 100, 100);
    rect(this.x, height - this.height - 20, this.width, this.height);
  }
  
  offscreen() {
    return this.x < -this.width;
  }
}
  