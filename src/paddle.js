const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

const PADDLE_START_Y = 250;
const PADDLE_HORIZONTAL_SHIFT = 30;

class Paddle {
  constructor() {
    this.y = 0;
    this.imgSprite = null;
  }

  reset() {
    this.y = PADDLE_START_Y;
  }

  init(x, img) {
    this.y = PADDLE_START_Y;
    this.x = x;

    this.imgSprite = img;
  }

  draw() {
    drawImageCenteredAtLocationWithScaling(this.imgSprite, this.x, this.y+PADDLE_HEIGHT/2, PADDLE_THICKNESS, PADDLE_HEIGHT);
  }
}