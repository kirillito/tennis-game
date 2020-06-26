function initInput() {
  canvas.addEventListener('mousemove', 
    function(e) {
      let mousePos = calculateMousePos(e);
      paddle1.y = mousePos.y - PADDLE_HEIGHT/2;
    }
  );

  canvas.addEventListener('mousedown', handleMouseClick);
}

function handleMouseClick(e) {
  if(showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
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
