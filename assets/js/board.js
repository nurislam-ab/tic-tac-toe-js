import GameLogic from './game.js';

const GameBoard = (() => {
  
  const displayBoard = () => {
    
    let mainElement = document.getElementById('main');
    let container = document.createElement('div');
    container.id = "gameboard";
    mainElement.append(container);

    for(let i = 0; i <= 8; i++){
      let cellWrapper = document.createElement('div');
      cellWrapper.onclick = function(){GameLogic.playerInput(i)};
      cellWrapper.id = `${i}`;
      container.appendChild(cellWrapper);
    }
  }

  const deleteBoard = (() => {
    let board = document.getElementById('gameboard');
    if (board != null) {
      board.parentNode.removeChild(board);
    } 
  })

  return {
    displayBoard,
    deleteBoard
  };
})();

export default GameBoard;