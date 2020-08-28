import GameBoard from './board.js';
import GameLogic from './game.js';

const newGame = () => {
  GameLogic.start()
}

function render() {
  GameBoard.displayBoard();
}

window.onload = () => {
  render();
};