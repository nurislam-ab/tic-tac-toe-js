const GameBoard = (() => {
  
  let movesArray = ['', '', '', '', '', '', '', '', ''];
  const message = document.querySelector('#instructions');

  const beginTurn = (currentPlayer) => {
    message.innerHTML = `Hello ${currentPlayer.name}, this is your turn.<br>`;
    message.innerHTML += '<span>Please, click on the cell you want to play.</span>';
    document.getElementById('instructions').classList.toggle('information');
    document.getElementById('instructions').classList.toggle('information');
  };

  const getWinnerMessage = (currentPlayer) => {
    message.innerHTML = `We have a winner! Congratulations ${currentPlayer.name}.`;
    document.getElementById('instructions').classList.toggle('winner');
  }

  const getTieMessage = () => {
    message.innerHTML = 'We have a tie! Start a new game.';
    document.getElementById('instructions').classList.toggle('information');
  }

  const disableCells = () => {
    for (let i = 0; i <= 8; i += 1) {
      const cell = document.getElementById(`${i}`);
      cell.style.pointerEvents = 'none';
    }
  };

  const togglePlayerClass = (currentPlayer, player, element) => {
    if (currentPlayer === player) {
      element.classList.toggle('player-1-cell');
    } else {
      element.classList.toggle('player-2-cell');
    }
  };

  const getPlayerSymbol = (tokens) => {
    let playerSymbol = prompt(`Choose your token from the following options: ${tokens.join(' ')}.`, '').toLowerCase();
    while (!tokens.includes(playerSymbol)) {
      playerSymbol = prompt(`Please select a valid option. Choose from: ${tokens.join(' ')}.`, '');
    }

    if (playerSymbol != null) {
      alert(`Cool! ${playerSymbol}! Your token will be ${playerSymbol}`);
    }

    return playerSymbol;


    // const player = Player(playerName, playerSymbol);
    // return player;
  };

  const getPlayerName = () => {
    let playerName = prompt('Please enter your name', '');
    while (playerName === '') {
      playerName = prompt('Name cannot be empty, please provide one', '');
    }

    if (playerName !== null) {
      alert(`Hello ${playerName}! Welcome to your tic-tac-toe game`);
    }

    return playerName;
  }

  const playerInput = (i) => {
    const currentCell = document.getElementById(`${i}`);
    if (currentCell.innerHTML === '') {
      currentCell.innerHTML = currentPlayer.token;
      currentCell.classList.toggle('selected-cell');
      togglePlayerClass(player1, currentCell);
      movesArray[i] = currentPlayer.token;
      evaluateWinner();
    } else {
      alert('This option has been taken. Please select an empty option.');
    }
  };

  const toggleStartElements = () => {
    const startScreen = document.getElementById('start-screen');
    const newGameBtn = document.getElementById('new-game-btn');
    startScreen.className += ' float-game-title';
    newGameBtn.className += ' float-new-game-btn';
  };


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
    getWinnerMessage,
    getTieMessage
  };
})();

export default GameBoard;