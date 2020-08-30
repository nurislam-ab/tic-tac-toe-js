import Player from './player.js';
import GameBoard from './board.js';

const GameLogic = (() => {
  let player1;
  let player2;
  let currentPlayer;
  let winner;
  let tokens = ['x', 'o', '#', '$', '@', '!'];
  let winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  let movesArray = [,,,,,,,,];
  let message = document.querySelector("#instructions");

  const _getPlayerVariables = (tokens) => {
    let playerName = prompt('Please enter your name', '');
    while (playerName == '') {
      playerName = prompt('Name cannot be empty, please provide one', '');
    }
    playerName != null ? alert(`Hello ${playerName}! Welcome to your tic-tac-toe game`): null;

    var playerSymbol = prompt(`Choose your token from the following options: ${tokens.join(' ')}.`, '').toLowerCase();
    while (!tokens.includes(playerSymbol)) {
      playerSymbol = prompt(`Please select a valid option. Choose from: ${tokens.join(' ')}.`, '');
    }
    
    playerSymbol != null ? alert(`Cool! ${playerSymbol}! Your token will be ${playerSymbol}`): null;   
    let index = tokens.indexOf(playerSymbol);
    tokens.splice(index, 1);

    let player = Player(playerName, playerSymbol);
    return player
  }
  
  const reset = () => {
    GameBoard.deleteBoard();
    GameBoard.deletePlayers();
    player1 = null;
    player2 = null;
    tokens = ['x', 'o', '#', '$', '@', '!'];
    winner = null;
    movesArray = [,,,,,,,,];
    currentPlayer = null;
  }
  
  const start = () => {
    reset();
    player1 = _getPlayerVariables(tokens);
    player2 = _getPlayerVariables(tokens);
    currentPlayer = player1;
    update(player1, player2);
    GameBoard.displayBoard();
    GameBoard.displayPlayers(player1, player2);
  };

  const beginTurn = () => {
    message.innerHTML = `Hello ${currentPlayer.name}, this is your turn.<br>`;
    message.innerHTML += '<span>Please, click on the cell you want to play.</span>';
    document.getElementById('instructions').classList.toggle('information');
    document.getElementById('instructions').classList.toggle('information');
  }

  const evaluateWinner = () => {
    let doWeHaveAWinner;
    winningPatterns.forEach ((pattern) => {
      doWeHaveAWinner = pattern.every((index) => 
        movesArray[index] === currentPlayer.token
      );

      if (doWeHaveAWinner) {
        winner = currentPlayer;
        console.log(`${currentPlayer.name}`);
      }
    });

    if (!endGame(winner)) {
      switchPlayer();
      beginTurn();
    }
  };

  const disableCells = () => {
    for(let i = 0; i <= 8; i++){
      let cell = document.getElementById(`${i}`);
      cell.style.pointerEvents = 'none';
    }
  }

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  const endGame = (winner) => {
    if (winner) {
      message.innerHTML = `We have a winner! Congratulations ${currentPlayer.name}.`;
      document.getElementById('instructions').classList.toggle('winner');
      disableCells();
      return true;
    } else if (movesArray.every ((el) => {el !== null})) {
      finalMessage.innerHTML = `We have a tie! Start a new game.`;
      document.getElementById('instructions').classList.toggle('information');
      disableCells();
      return true;
    } else {
      return false;
    }
  }
  
  const update = (currentPlayer, otherPlayer) => {
    currentPlayer = currentPlayer;
    beginTurn(currentPlayer);
  };

  const playerInput = (i) => {
    let currentCell = document.getElementById(`${i}`);
    if (currentCell.innerHTML === '') {
      currentCell.innerHTML =  currentPlayer.token;
      currentCell.classList.toggle('selected-cell');
      togglePlayerClass(player1, currentCell);
      movesArray[i] = currentPlayer.token;
      evaluateWinner();
    } else {
      alert('This option has been taken. Please select an empty option.');
    }
  }

  const togglePlayerClass = (player, element) => {
    if (currentPlayer === player) {
      element.classList.toggle('player-1-cell');
    } else {
      element.classList.toggle('player-2-cell');
    }
  }

  return {
    start,
    playerInput,
    playerInput
  }
})();

export default GameLogic;