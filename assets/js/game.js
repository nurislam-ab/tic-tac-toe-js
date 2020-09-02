/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import Player from './player.js';
import GameBoard from './board.js';

const GameLogic = (() => {
  
  let currentPlayer;
  let winner;
  let tokens = ['x', 'o', '#', '$', '@', '!'];
  let player1;
  let player2;

  const message = document.querySelector('#instructions');  
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
    player1 = null;
    player2 = null;
    tokens = ['x', 'o', '#', '$', '@', '!'];
    winner = null;
    movesArray = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = null;
  };

  const start = () => {
    reset();
    player1 = Player(GameBoard.getPlayerName, GameBoard.getPlayerSymbol(tokens));
    tokens = updateTokens(player1.token, tokens);
    player2 = Player(GameBoard.getPlayerName, GameBoard.getPlayerSymbol(tokens));
    currentPlayer = player1;
    beginTurn(currentPlayer);
    GameBoard.displayBoard();
    GameBoard.displayPlayers(player1, player2);
  };

  const updateTokens = (selectedToken, tokensArr) => {
    const index = tokensArr.indexOf(selectedToken);
    tokensArr.splice(index, 1);
    return tokensArr;
  }

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const endGame = (winner) => {
    if (winner) {
      disableCells();
      return true;
    } if (movesArray.every(el => el !== '')) {
      
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

  return {
    start
  };
})();

export default GameLogic;