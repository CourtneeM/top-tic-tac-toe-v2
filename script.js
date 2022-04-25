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

  startRound: function() {
    if (this.currentPlayer === null) this.currentPlayer = this.player1;
    
    this.checkForWin(this.currentPlayer);
    this.checkForGameOver();
  },
  endRound: function() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  },
  checkForWin: function(currentPlayer) {
    const gameWon = Gameboard.winningCombos.some(combos => {
      return combos.every(i => {
        console.log(Gameboard.gameboard[i] === currentPlayer.marker);
        return Gameboard.gameboard[i] === currentPlayer.marker;
      });
    });

    if (gameWon) this.gameWon(currentPlayer);
  },
  checkForGameOver: function() {
    let fullGameboard = Gameboard.gameboard.every(square => square);

    if (fullGameboard) this.endGame();
  },
  gameWon: function(winner) {
    console.log(`${winner.name} is the winner!`)
  },
  endGame: function() {
    console.log("It's a tie! Thanks for playing!");
  }
}

const EventHandler = {
  gameboard: function() {
    const gameboardSquares = [...document.querySelectorAll('.gameboard-square')];
    gameboardSquares.forEach(function(square) {
      square.addEventListener('click', function(e) {
        const i = [...document.querySelectorAll('.gameboard-square')].indexOf(e.target);

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
  }
}

EventHandler.gameboard();