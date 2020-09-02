/* eslint-disable import/extensions */
import Player from './player.js';
import GameBoard from './board.js';

const GameLogic = (() => {
  let currentPlayer;
  let winner;
  let tokens = ['x', 'o', '#', '$', '@', '!'];
  let player1;
  let player2;
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

  const reset = () => {
    GameBoard.deleteBoard();
    GameBoard.deletePlayers();
    GameBoard.resetMovesArray();
    player1 = null;
    player2 = null;
    tokens = ['x', 'o', '#', '$', '@', '!'];
    winner = null;
    currentPlayer = null;
  };

  const updateTokens = (selectedToken, tokensArr) => {
    const index = tokensArr.indexOf(selectedToken);
    tokensArr.splice(index, 1);
    return tokensArr;
  };

  const endGame = (boardArray, winner) => {
    if (winner) {
      GameBoard.setMessage(`We have a winner! Congratulations ${currentPlayer.name}.`, 'winner');
      GameBoard.disableCells();
      return true;
    } if (boardArray.every(el => el !== '')) {
      GameBoard.setMessage('We have a tie! Start a new game.', 'information');
      GameBoard.disableCells();
      return true;
    }
    return false;
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const evaluateWinner = () => {
    let doWeHaveAWinner;
    const boardArray = GameBoard.getMovesArray();
    winningPatterns.forEach((pattern) => {
      doWeHaveAWinner = pattern.every((index) => boardArray[index] === currentPlayer.token);

      if (doWeHaveAWinner) {
        winner = currentPlayer;
      }
    });

    if (!endGame(boardArray, winner)) {
      switchPlayer();
      let firstString = `Hello ${currentPlayer.name}, this is your turn.<br>`;
      firstString += '<span>Please, click on the cell you want to play.</span>';
      GameBoard.setMessage(firstString, 'information');
    }
  };

  const playerInput = (i) => {
    const currentCell = document.getElementById(`${i}`);
    if (currentCell.innerHTML === '') {
      currentCell.innerHTML = currentPlayer.token;
      currentCell.classList.toggle('selected-cell');
      GameBoard.togglePlayerClass(currentPlayer, player1, currentCell);
      GameBoard.updateMovesArray(i, currentPlayer.token);
      evaluateWinner();
    } else {
      alert('This option has been taken. Please select an empty option.');
    }
  };

  const setEventListeners = () => {
    for (let i = 0; i <= 8; i += 1) {
      document.getElementById(`${i}`).onclick = () => { playerInput(i); };
    }
  };

  const start = () => {
    reset();
    GameBoard.toggleStartElements();
    player1 = Player(GameBoard.getPlayerName(), GameBoard.getPlayerSymbol(tokens));
    tokens = updateTokens(player1.token, tokens);
    player2 = Player(GameBoard.getPlayerName(), GameBoard.getPlayerSymbol(tokens));
    currentPlayer = player1;
    let firstString = `Hello ${currentPlayer.name}, this is your turn.<br>`;
    firstString += '<span>Please, click on the cell you want to play.</span>';
    GameBoard.setMessage(firstString, 'information');
    GameBoard.displayBoard();
    setEventListeners();
    GameBoard.displayPlayers(player1, player2);
  };

  const resetGame = () => {
    GameBoard.deleteBoard();
    GameBoard.resetMovesArray();
    winner = null;
    currentPlayer = player1;
    let firstString = `Hello ${currentPlayer.name}, this is your turn.<br>`;
    firstString += '<span>Please, click on the cell you want to play.</span>';
    GameBoard.setMessage(firstString, 'information');
    GameBoard.displayBoard();
    setEventListeners();
  };

  return {
    start,
    resetGame,
  };
})();

export default GameLogic;