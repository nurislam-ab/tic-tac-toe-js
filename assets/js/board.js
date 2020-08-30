import GameLogic from './game.js';

const GameBoard = (() => {
  
  const displayBoard = () => {
    let mainElement = document.getElementById('game-board');
    let container = document.createElement('div');
    container.id = "player-board";
    container.id = "gameboard";
    mainElement.append(container);

    for(let i = 0; i <= 8; i++){
      let cellWrapper = document.createElement('div');
      cellWrapper.id = `${i}`;
      container.appendChild(cellWrapper);
      cellWrapper.onclick = function(){ GameLogic.playerInput(i) };
      container.append(cellWrapper);
    }
    mainElement.append(container);
  }

  const deleteBoard = (() => {
    let board = document.getElementById('player-board');
    if (board != null) {
      board.parentNode.removeChild(board);
    } 
  })

  const displayPlayers = (player1, player2) => {
    let container = document.getElementById('game-board');
  
    let player1_card = document.createElement('div');
    player1_card.id = 'player-1';
    player1_card.classList.toggle('player-card');
    player1_card.innerHTML = `<div>Player 1</div>`;
    player1_card.innerHTML += `<h3>${player1.name}</h3>`;
    player1_card.innerHTML += `<span>${player1.token}</span>`;


    let player2_card = document.createElement('div');
    player2_card.id = 'player-2';
    player2_card.classList.toggle('player-card');
    player2_card.innerHTML = `<div>Player 2</div>`;
    player2_card.innerHTML += `<h3>${player2.name}</h3>`;
    player2_card.innerHTML += `<span>${player2.token}</span>`;

    container.appendChild(player1_card);
    container.appendChild(player2_card);
  }

  const deletePlayers = (() => {
    let player1 = document.getElementById('player-1');
    let player2 = document.getElementById('player-2');

    if (player1 != null && player2 != null) {
      player1.parentNode.removeChild(player1);
      player2.parentNode.removeChild(player2);
    }
  })

  return {
    displayBoard,
    deleteBoard,
    displayPlayers,
    deletePlayers
  };
})();

export default GameBoard;