import GameLogic from './game';

window.newGame = () => {
  GameLogic.start();
};

window.reset = () => {
  GameLogic.resetGame();
};