const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

const PADDLE_START_Y = 250;
const PADDLE_HORIZONTAL_SHIFT = 30;

const PADDLE_KEYBOARD_SPEED = 12;

class Paddle {
  constructor() {
    this.score = 0;
    this.y = 0;
    this.imgSprite = null;

    this.keyHeld_Up = false;
    this.keyHeld_Down = false;
  }

  setupControls(controlKeyUp, controlKeyDown) {
    this.controlKeyUp = controlKeyUp;
    this.controlKeyDown = controlKeyDown;
  }

  reset() {
    this.score = 0;
    this.y = PADDLE_START_Y;
  }

  init(x, img) {
    this.y = PADDLE_START_Y;
    this.x = x;

    this.imgSprite = img;
  }

  move() {
    if (this.keyHeld_Up) {
      this.y -= PADDLE_KEYBOARD_SPEED;
    } else if (this.keyHeld_Down) {
      this.y += PADDLE_KEYBOARD_SPEED;
    }
  }

  draw() {
    drawImageCenteredAtLocationWithScaling(this.imgSprite, this.x, this.y+PADDLE_HEIGHT/2, PADDLE_THICKNESS, PADDLE_HEIGHT);
  }
}