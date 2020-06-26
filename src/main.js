const FPS = 30;

let canvas;
let canvasContext;

let audioFormat = ".mp3";

let musicBackground = new MusicWrapper();
let soundBallHit = new SoundWrapper('assets/sounds/hit');
let soundBallWallHit = new SoundWrapper('assets/sounds/wall-hit');
let soundBallMiss = new SoundWrapper('assets/sounds/miss');

let isTwoPlayerMode = false;

let ball = new Ball();

let paddle1 = new Paddle();
let paddle2 = new Paddle();

let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 3;

let showingWinScreen = false;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  musicBackground.loopMusic('assets/sounds/music');

  initInput();
  loadImages();

  ball.reset();
}


function launchIfReady() {
  if (imagesToLoad === 0) {
    startGame();
  }
}

function startGame() {
  setInterval(function() {
    update();
    draw();
  }, 1000/FPS);

  paddle1.init(PADDLE_HORIZONTAL_SHIFT + PADDLE_THICKNESS, paddlePic);  
  paddle2.init(canvas.width - PADDLE_THICKNESS - PADDLE_HORIZONTAL_SHIFT, paddlePic);  
  ball.init(ballPic);
}

function computerMovement() {
  let paddle2YCenter = paddle2.y + (PADDLE_HEIGHT/2)
  if (paddle2YCenter < ball.y - 35) {
    paddle2.y += 6
  } else if (paddle2YCenter > ball.y + 35) {
    paddle2.y -= 6
  }
}

function update() {
  if(showingWinScreen) {
    return;
  }

  computerMovement()

  ball.move();
}

function draw() {	
  // background
  drawImageCenteredAtLocationWithScaling(bgPic, canvas.width/2, canvas.height/2, canvas.width, canvas.height);

  if(showingWinScreen) {
    canvasContext.fillStyle = 'white';

    if (player1Score >= WINNING_SCORE) {
      canvasContext.fillText("Left player won!", 250, 200);
    } else if (player2Score >= WINNING_SCORE) {
      canvasContext.fillText("Right player won!", 250, 200);
    }

    canvasContext.fillText("click to continue", 250, 500);
    return;
  }

  // paddles
  paddle1.draw();
  paddle2.draw();
 
  // ball
  ball.draw();

  canvasContext.fillStyle = 'white';
  
  canvasContext.font = "40px Arial bold";
  canvasContext.fillText(player1Score, 100, 120)
  canvasContext.fillText(player2Score, canvas.width - 100, 120)
}
