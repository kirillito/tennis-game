const BALL_SPEED_START = 8;
const BALL_SPEED_UP_RATE = 0.1;

const BALL_SIZE = 10;

class Ball {
  constructor() {
    this.x = 50;
    this.speedX = BALL_SPEED_START;
    this.y = 50;
    this.speedY = 10;
    this.speedYMin = 5;
    this.speedYMax = 9;

    this.imgSprite = null;
  }

  init(img) {
    this.imgSprite = img;
    this.reset();
  }

  reset() {
    if (player1Score >= WINNING_SCORE ||
      player2Score >= WINNING_SCORE) {
        showingWinScreen = true;
    }
      
    this.speedX = (this.speedX > 0 ? -1 : 1) * BALL_SPEED_START;
    this.speedY = (Math.random()<0.5 ? -1 : 1)*(Math.random()*(this.speedYMax - this.speedYMin) + this.speedYMin);
    this.x = canvas.width/2
    this.y = canvas.height/2
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
        player2Score++;
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
        player1Score++;
        soundBallMiss.play();
        this.reset();
      }
    }
    if (this.y >= canvas.height || this.y <= 0) {
      soundBallWallHit.play();
      this.speedY = -this.speedY
    }  
  }

  draw() {
    drawImageCenteredAtLocationWithScaling(this.imgSprite, this.x, this.y, BALL_SIZE, BALL_SIZE);
  }
}