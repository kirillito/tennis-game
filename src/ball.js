const BALL_SPEED_START = 8;
const BALL_SPEED_UP_RATE = 0.1;

const BALL_SIZE = 14;

const BALL_TRAIL_SIZE = 5;

class Ball {
  constructor() {
    this.x = 50;
    this.speedX = BALL_SPEED_START;
    this.y = 50;
    this.speedY = 10;
    this.speedYMin = 5;
    this.speedYMax = 9;

    this.trail = new Array(BALL_TRAIL_SIZE);

    this.imgSprite = null;
  }

  init(img) {
    this.imgSprite = img;
    this.reset();
  }

  reset() {
    if (paddle1.score >= WINNING_SCORE ||
      paddle2.score >= WINNING_SCORE) {
        showingMenuScreen = true;
    }
      
    this.speedX = (this.speedX > 0 ? -1 : 1) * BALL_SPEED_START;
    this.speedY = (Math.random()<0.5 ? -1 : 1)*(Math.random()*(this.speedYMax - this.speedYMin) + this.speedYMin);
    this.x = canvas.width/2
    this.y = canvas.height/2

    this.trail = this.trail.fill({x: this.x, y: this.y});
  }

  move() {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
  
    if (this.x <= paddle1.x) {
      if (this.x >= (paddle1.x-PADDLE_THICKNESS) && this.y > paddle1.y && this.y < paddle1.y+PADDLE_HEIGHT) {
        this.speedX = -(this.speedX + BALL_SPEED_UP_RATE);
        
        let deltaY = this.y - (paddle1.y + PADDLE_HEIGHT/2);
        this.speedY = deltaY * 0.35;
  
        soundBallHit.play();
      } else if (this.x < 0) {
        paddle2.score++;
        soundBallMiss.play();
        this.reset();
      }
    }
    if (this.x >= paddle2.x) {
      if (this.x <= (paddle2.x+PADDLE_THICKNESS) && this.y > paddle2.y && this.y < paddle2.y+PADDLE_HEIGHT) {
        this.speedX = -(this.speedX + BALL_SPEED_UP_RATE);
  
        let deltaY = this.y - (paddle2.y + PADDLE_HEIGHT/2);
        this.speedY = deltaY * 0.35;
  
        soundBallHit.play();
      } else if (this.x > canvas.width)  {
        paddle1.score++;
        soundBallMiss.play();
        this.reset();
      }
    }
    if (this.y >= canvas.height || this.y <= 0) {
      soundBallWallHit.play();
      this.speedY = -this.speedY
    }

    this.trail.shift();
    this.trail.push({x: this.x, y: this.y});
  }

  draw() {
    // trail
    for (let i=this.trail.length-1; i>=0; i--) {
      canvasContext.globalAlpha = 0.1*i;
      drawImageCenteredAtLocationWithScaling(this.imgSprite, this.trail[i].x, this.trail[i].y, BALL_SIZE, BALL_SIZE);
    }

    canvasContext.globalAlpha = 1;
    drawImageCenteredAtLocationWithScaling(this.imgSprite, this.x, this.y, BALL_SIZE, BALL_SIZE);
  }
}