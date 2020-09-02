/* eslint-disable import/extensions */
import GameLogic from './game.js';

window.newGame = () => {
  GameLogic.start();
};

window.reset = () => {
  GameLogic.resetGame();
};