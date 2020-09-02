import GameLogic from './game.js';

console.log('main.js');

window.newGame = () => {
  console.log('newGame')
  GameLogic.start();
};

window.reset = () => {
  GameLogic.resetGame();
};