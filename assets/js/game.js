/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import Player from './player.js';
import GameBoard from './board.js';

const GameLogic = (() => {
  let player1;
  let player2;
  let currentPlayer;
  let winner;
  let tokens = ['x', 'o', '#', '$', '@', '!'];
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];
  let movesArray = ['', '', '', '', '', '', '', '', ''];
  const message = document.querySelector('#instructions');

  const disableCells = () => {
    for (let i = 0; i <= 8; i += 1) {
      const cell = document.getElementById(`${i}`);
      cell.style.pointerEvents = 'none';
    }
  };

  const togglePlayerClass = (player, element) => {
    if (currentPlayer === player) {
      element.classList.toggle('player-1-cell');
    } else {
      element.classList.toggle('player-2-cell');
    }
  };

  const getPlayerVariables = (tokens) => {
    let playerName = prompt('Please enter your name', '');
    while (playerName === '') {
      playerName = prompt('Name cannot be empty, please provide one', '');
    }

    if (playerName !== null) {
      alert(`Hello ${playerName}! Welcome to your tic-tac-toe game`);
    }

    let playerSymbol = prompt(`Choose your token from the following options: ${tokens.join(' ')}.`, '').toLowerCase();
    while (!tokens.includes(playerSymbol)) {
      playerSymbol = prompt(`Please select a valid option. Choose from: ${tokens.join(' ')}.`, '');
    }

    if (playerSymbol != null) {
      alert(`Cool! ${playerSymbol}! Your token will be ${playerSymbol}`);
    }

    const index = tokens.indexOf(playerSymbol);
    tokens.splice(index, 1);

    const player = Player(playerName, playerSymbol);
    return player;
  };

  const reset = () => {
    GameBoard.deleteBoard();
    GameBoard.deletePlayers();
    player1 = null;
    player2 = null;
    tokens = ['x', 'o', '#', '$', '@', '!'];
    winner = null;
    movesArray = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = null;
  };

  const beginTurn = () => {
    message.innerHTML = `Hello ${currentPlayer.name}, this is your turn.<br>`;
    message.innerHTML += '<span>Please, click on the cell you want to play.</span>';
    document.getElementById('instructions').classList.toggle('information');
    document.getElementById('instructions').classList.toggle('information');
  };

  const start = () => {
    reset();
    player1 = getPlayerVariables(tokens);
    player2 = getPlayerVariables(tokens);
    currentPlayer = player1;
    beginTurn(currentPlayer);
    GameBoard.displayBoard();
    GameBoard.displayPlayers(player1, player2);
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const endGame = (winner) => {
    if (winner) {
      message.innerHTML = `We have a winner! Congratulations ${currentPlayer.name}.`;
      document.getElementById('instructions').classList.toggle('winner');
      disableCells();
      return true;
    } if (movesArray.every(el => el !== '')) {
      message.innerHTML = 'We have a tie! Start a new game.';
      document.getElementById('instructions').classList.toggle('information');
      disableCells();
      return true;
    }
    return false;
  };

  const evaluateWinner = () => {
    let doWeHaveAWinner;
    winningPatterns.forEach((pattern) => {
      doWeHaveAWinner = pattern.every((index) => movesArray[index] === currentPlayer.token);

      if (doWeHaveAWinner) {
        winner = currentPlayer;
      }
    });

    if (!endGame(winner)) {
      switchPlayer();
      beginTurn();
    }
  };

  const playerInput = (i) => {
    const currentCell = document.getElementById(`${i}`);
    if (currentCell.innerHTML === '') {
      currentCell.innerHTML = currentPlayer.token;
      currentCell.classList.toggle('selected-cell');
      togglePlayerClass(player1, currentCell);
      movesArray[i] = currentPlayer.token;
      evaluateWinner();
    } else {
      alert('This option has been taken. Please select an empty option.');
    }
  };

  const toggleStartElements = () => {
    const startScreen = document.getElementById('start-screen');
    const newGameBtn = document.getElementById('new-game-btn');
    startScreen.className += ' float-game-title';
    newGameBtn.className += ' float-new-game-btn';
  };

  return {
    start,
    playerInput,
    toggleStartElements,
  };
})();

export default GameLogic;