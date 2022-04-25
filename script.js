const Gameboard = {
  gameboard: ['', '', '',
              '', '', '',
              '', '', ''
             ],
  updateGameboard: function(marker, i) {
    this.gameboard[i] = marker;
  },
  winningCombos: [
                   [0, 1, 2],
                   [3, 4, 5],
                   [6, 7, 8],
                   [0, 3, 6],
                   [1, 4, 7],
                   [2, 5, 8],
                   [0, 4, 8],
                   [2, 4, 6]
                 ]
}

function Player(name, marker) {
  return {name, marker};
}

const Gameplay = {
  currentPlayer: null,
  player1: Player('Player 1', 'X'),
  player2: Player('Player 2', 'O'),
  gameOver: false,

  startRound: function() {
    if (this.currentPlayer === null) this.currentPlayer = this.player1;
    
  },
  endRound: function() {
    this.checkForWin(this.currentPlayer);
    if (this.gameOver) return;
    this.checkForGameOver();
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  },
  checkForWin: function(currentPlayer) {
    const gameWon = Gameboard.winningCombos.some(combo => {
      return combo.every(i => {
        return Gameboard.gameboard[i] === currentPlayer.marker;
      });
    });

    if (gameWon) {
      this.gameOver = true;
      this.gameWon(currentPlayer);
    }
  },
  checkForGameOver: function() {
    let fullGameboard = Gameboard.gameboard.every(square => square);

    if (fullGameboard) {
      this.gameOver = true;
      this.endGame();
    }
  },
  gameWon: function(winner) {
    DisplayController.results(`${winner.name} is the winner!`);
  },
  endGame: function() {
    DisplayController.results("It's a tie! Thanks for playing!")
  }
}

const EventHandler = {
  gameboard: function() {
    const gameboardSquares = [...document.querySelectorAll('.gameboard-square')];
    gameboardSquares.forEach(function(square) {
      square.addEventListener('click', function(e) {
        if (!e.target.classList.contains('gameboard-square')) return;

        const i = [...document.querySelectorAll('.gameboard-square')].indexOf(e.target);

        if (Gameboard.gameboard[i] || Gameplay.gameOver) return;

        Gameplay.startRound();
        DisplayController.updateGameboard(i);
        Gameboard.updateGameboard(Gameplay.currentPlayer.marker, i);
        Gameplay.endRound();
      });
    });
  }
}

const DisplayController = {
  updateGameboard: function(i) {
    const gameboardSquares = [...document.querySelectorAll('.gameboard-square')];
    const squareP = document.createElement('p');

    squareP.textContent = Gameplay.currentPlayer.marker;
    gameboardSquares[i].appendChild(squareP);
  },
  results: function(winner) {
    const resultsContainer = document.querySelector('#results-container');
    const resultsP = document.createElement('p');

    resultsP.textContent = winner;

    resultsContainer.appendChild(resultsP);
  }
}

EventHandler.gameboard();