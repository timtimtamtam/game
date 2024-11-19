const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

let paddleHeight = 100, paddleWidth = 10, ballSize = 10;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 4, ballSpeedY = 4;
let player1Y = canvas.height / 2 - paddleHeight / 2, player2Y = player1Y;
let score1 = 0, score2 = 0;

// Draw game elements
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = "white";
  ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  // Draw scores
  ctx.font = "20px Arial";
  ctx.fillText(`Player 1: ${score1}`, 50, 30);
  ctx.fillText(`Player 2: ${score2}`, canvas.width - 150, 30);
}

// Update game logic
function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with walls
  if (ballY <= 0 || ballY >= canvas.height) ballSpeedY *= -1;

  // Ball collision with paddles
  if (
    (ballX <= paddleWidth && ballY >= player1Y && ballY <= player1Y + paddleHeight) ||
    (ballX >= canvas.width - paddleWidth && ballY >= player2Y && ballY <= player2Y + paddleHeight)
  ) {
    ballSpeedX *= -1;
  }

  // Ball out of bounds
  if (ballX <= 0) {
    score2++;
    resetBall();
  } else if (ballX >= canvas.width) {
    score1++;
    resetBall();
  }
}

// Reset ball position
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX *= -1;
}

// Control paddles
document.addEventListener("keydown", (e) => {
  if (e.key === "w" && player1Y > 0) player1Y -= 20;
  if (e.key === "s" && player1Y < canvas.height - paddleHeight) player1Y += 20;
  if (e.key === "ArrowUp" && player2Y > 0) player2Y -= 20;
  if (e.key === "ArrowDown" && player2Y < canvas.height - paddleHeight) player2Y += 20;
});

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
