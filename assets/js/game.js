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
    
    playerSymbol !=null ? alert(`Cool! ${playerSymbol}! Your token will be ${playerSymbol}`): null;   
    let index = tokens.indexOf(playerSymbol);
    tokens.splice(index, 1);

    let player = Player(playerName, playerSymbol);
    return player
  }
  
  const reset = () => {
    player1 = null;
    player2 = null;
    tokens = ['x', 'o', '#', '$', '@', '!'];
    winner = null;
    movesArray = [,,,,,,,,];
    currentPlayer = null;
  }
  
  const start = () => {
    GameBoard.deleteBoard();
    reset();
    GameBoard.displayBoard();
    player1 = _getPlayerVariables(tokens);
    player2 = _getPlayerVariables(tokens);
    currentPlayer = player1;
    update(player1, player2);
    
  };

  const beginTurn = () => {
    message.innerHTML = `Hello player ${currentPlayer.name}, this is your turn.<br>`;
    message.innerHTML += 'Please, click on the cell you want to play.';
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
      }
    })
    if (!endGame(winner)) {
      console.log('Are you going here after winning?')
      switchPlayer();
      beginTurn();
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  const endGame = (winner) => {

    if (winner) {
      message.innerHTML = `We have a winner! Congratulations ${currentPlayer.name}.`;
      document.getElementById('instructions').classList.toggle('winner');
      return true;
    } else if (movesArray.every ((el) => {el !== null})) {
      finalMessage.innerHTML = `We have a tie! Start a new game.`;
      document.getElementById('instructions').classList.toggle('information');
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
    let currentCell = document.getElementById(i);
    
    if (currentCell.innerHTML === '') {
      currentCell.innerHTML =  currentPlayer.token;
      currentCell.classList.toggle('selected-cell');
      movesArray[i] = currentPlayer.token
      evaluateWinner();
    } else {
      alert('This option has been taken. Please select an empty option.')
    }
  }

  return {
    start,
    playerInput
  }
})();

export default GameLogic;