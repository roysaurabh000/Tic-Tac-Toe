const cells = document.querySelectorAll('.cell');
const statusMessage = document.querySelector('.status-message');
const resetButton = document.querySelector('.reset-button');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameActive = true;

function handleCellClick(event) {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);

  if (gameBoard[index] === null && gameActive) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkGameStatus();
    switchPlayer();
  }
}

function switchPlayer() {
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `${currentPlayer}'s Turn`;
  }
}

function checkGameStatus() {
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      statusMessage.textContent = `${gameBoard[a]} Wins!`;
      gameActive = false;
      return;
    }
  }

  if (!gameBoard.includes(null)) {
    statusMessage.textContent = 'Draw';
    gameActive = false;
  }
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = Array(9).fill(null);
  gameActive = true;
  cells.forEach(cell => cell.textContent = '');
  statusMessage.textContent = `${currentPlayer}'s Turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);