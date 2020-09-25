/* eslint-disable import/extensions */
import GameLogic from './game.js';
import '../css/styles.scss';

window.newGame = () => {
  GameLogic.start();
};

window.reset = () => {
  GameLogic.resetGame();
};