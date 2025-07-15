const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

function createBoard() {
  board.innerHTML = '';
  gameBoard.forEach((cell, index) => {
    const cellBtn = document.createElement('button');
    cellBtn.classList.add('cell');
    cellBtn.setAttribute('data-index', index);
    cellBtn.textContent = cell;
    cellBtn.disabled = cell !== '' || isGameOver;
    board.appendChild(cellBtn);
  });
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      return gameBoard[a];
    }
  }

  if (!gameBoard.includes('')) return 'Draw';
  return null;
}

function handleClick(e) {
  const index = e.target.getAttribute('data-index');
  if (gameBoard[index] !== '' || isGameOver) return;

  gameBoard[index] = currentPlayer;
  const winner = checkWinner();

  if (winner) {
    isGameOver = true;
    statusText.textContent = winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }

  createBoard();
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameOver = false;
  statusText.textContent = `Player X's turn`;
  createBoard();
}

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('cell')) {
    handleClick(e);
  }
});

resetBtn.addEventListener('click', resetGame);

createBoard();
