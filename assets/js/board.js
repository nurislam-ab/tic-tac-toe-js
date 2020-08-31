/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import GameLogic from './game.js';

const GameBoard = (() => {
  const displayBoard = () => {
    const mainElement = document.getElementById('game-board');
    const container = document.createElement('div');
    container.id = 'player-board';
    container.classList.toggle('board-wrapper');


    for (let i = 0; i <= 8; i += 1) {
      const cellWrapper = document.createElement('div');
      cellWrapper.id = `${i}`;
      cellWrapper.classList.toggle('token-wrapper');
      cellWrapper.setAttribute('data-text', '+');
      cellWrapper.onclick = () => { GameLogic.playerInput(i); };
      container.append(cellWrapper);
    }
    mainElement.append(container);
  };

  const deleteBoard = (() => {
    const board = document.getElementById('player-board');
    if (board != null) {
      board.parentNode.removeChild(board);
    }
  });

  const displayPlayers = (player1, player2) => {
    const container = document.getElementById('game-board');

    const player1Card = document.createElement('div');
    player1Card.id = 'player-1';
    player1Card.classList.toggle('player-card');
    player1Card.innerHTML = '<div>Player 1</div>';
    player1Card.innerHTML += `<h3>${player1.name}</h3>`;
    player1Card.innerHTML += `<span>${player1.token}</span>`;


    const player2Card = document.createElement('div');
    player2Card.id = 'player-2';
    player2Card.classList.toggle('player-card');
    player2Card.innerHTML = '<div>Player 2</div>';
    player2Card.innerHTML += `<h3>${player2.name}</h3>`;
    player2Card.innerHTML += `<span>${player2.token}</span>`;

    container.appendChild(player1Card);
    container.appendChild(player2Card);
  };

  const deletePlayers = (() => {
    const player1 = document.getElementById('player-1');
    const player2 = document.getElementById('player-2');

    if (player1 != null && player2 != null) {
      player1.parentNode.removeChild(player1);
      player2.parentNode.removeChild(player2);
    }
  });

  return {
    displayBoard,
    deleteBoard,
    displayPlayers,
    deletePlayers,
  };
})();

export default GameBoard;