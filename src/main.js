let canvas;
let canvasContext;

let audioFormat = ".mp3";

let musicBackground = new MusicWrapper();
let soundBallHit = new SoundWrapper('/assets/sounds/hit');

let ballX = 50;
let ballSpeedX = 10;
let ballY = 50;
let ballSpeedY = 10;

let paddle1Y = 250
let paddle2Y = 250
const PADDLE_THICKNESS = 10
const PADDLE_HEIGHT = 100

let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 3;

let showingWinScreen = false;

function setAudioFormat() {
  let audio = new Audio();
  if (audio.canPlayType("audio/mp3")) {
    audioFormat = ".mp3";
  } else {
    audioFormat = ".ogg";
  }
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  let framesPerSecond = 30;
  setInterval(function() {
    animate();
    draw();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', 
    function(e) {
      let mousePos = calculateMousePos(e);
      paddle1Y = mousePos.y - PADDLE_HEIGHT/2;
    }
  );

  canvas.addEventListener('mousedown', handleMouseClick);

  musicBackground.loopMusic('/assets/sounds/music');
}

function calculateMousePos(e) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft
  let mouseY = e.clientY - rect.top - root.scrollTop

  return {
    x:mouseX,
    y:mouseY
  }
}

function handleMouseClick(e) {
  if(showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
}

function ballReset() {
if (player1Score >= WINNING_SCORE ||
    player2Score >= WINNING_SCORE) {
      showingWinScreen = true;
    }

  ballSpeedX = -ballSpeedX;
  ballX = canvas.width/2
  ballY = canvas.height/2
}

function computerMovement() {
  let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2)
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6
  }
}

function animate() {
  if(showingWinScreen) {
    return;
  }

  computerMovement()

  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if (ballX <= 0) {
    if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX
      
      let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;

      soundBallHit.play();
    } else {
      player2Score++;
      ballReset()
    }
  }
  if (ballX >= canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX

      let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;

      soundBallHit.play();
    } else {
      player1Score++;
      ballReset()
    }
  }
  if (ballY >= canvas.height || ballY <= 0) {
    ballSpeedY = -ballSpeedY
  }

}

function draw() {	
  // background
  drawRectangle(0,0,canvas.width,canvas.height,'black');

  if(showingWinScreen) {
    canvasContext.fillStyle = 'white';

    if (player1Score >= WINNING_SCORE) {
      canvasContext.fillText("Left player won!", 350, 200);
    } else if (player2Score >= WINNING_SCORE) {
      canvasContext.fillText("Right player won!", 350, 200);
    }

    canvasContext.fillText("click to continue", 350, 500);
    return;
  }

  drawNet();

  // rackets
  drawRectangle(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
  drawRectangle(canvas.width - PADDLE_THICKNESS, paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

  // ball
  drawCircle(ballX, ballY, 10, 'yellow')

  canvasContext.fillStyle = 'white';
  canvasContext.fillText(player1Score, 100, 100)
  canvasContext.fillText(player2Score, canvas.width - 100, 100)
}

function drawRectangle(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}

function drawCircle(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true)
  canvasContext.fill();
}

function drawNet() {
  for(let i=0; i<canvas.height; i+=40) {
    drawRectangle(canvas.width/2-1,i,2,20,'white');
  }
}