const GameBoard = (() => {

  const displayBoard = () => {
    let mainElement = document.getElementById('main');

    let container = document.createElement('div');
    container.id = "gameboard";
    mainElement.append(container);

    for(let i = 1; i <= 9; i++){
      let cellWrapper = document.createElement('div');
      cellWrapper.id = `${i}`;
      cellWrapper.innerHTML = `${i}`;
      container.appendChild(cellWrapper);
    }
  }


  return {
    displayBoard
  };
})();

export default GameBoard;