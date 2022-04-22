const Gameboard = {
  gameboard: [
               ['X', 'X', 'O'],
               ['O', 'O', 'X'],
               ['X', 'O', 'O']
             ],
  winningCombos: [
                   [ [[0], [0]], [[0], [1]], [[0], [2]] ],
                   [ [[1], [0]], [[1], [1]], [[1], [2]] ],
                   [ [[2], [0]], [[2], [1]], [[2], [2]] ],
                   [ [[0], [0]], [[1], [0]], [[2], [0]] ],
                   [ [[0], [1]], [[1], [1]], [[2], [1]] ],
                   [ [[0], [2]], [[1], [2]], [[2], [2]] ],
                   [ [[0], [0]], [[1], [1]], [[2], [2]] ],
                   [ [[0], [2]], [[1], [1]], [[2], [0]] ]
                 ]
}

const Gameplay = {
  currentPlayer: null,
  player1: Player('Player 1', 'X'),
  player2: Player('Player 2', 'O'),

  startRound: function() {
    if (this.currentPlayer === null) this.currentPlayer = this.player1;
    // Gameboard.gameboard[0][2] = this.currentPlayer.marker;
  },
  endTurn: function() {
    this.checkForWin(this.currentPlayer);
    this.checkForGameOver();

    this. currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  },
  checkForWin: function(currentPlayer) {
    const gameWon = Gameboard.winningCombos.some(combos => {
      return combos.every(([i, j]) => {
        return Gameboard.gameboard[i][j] === currentPlayer.marker;
      });
    });

    if (gameWon) this.gameWon(currentPlayer);
  },
  checkForGameOver: function() {
    let fullGameboard = Gameboard.gameboard.every(row => {
      return row.every(square => square);
    });

    if (fullGameboard) this.endGame();
  },
  gameWon: function(winner) {
    console.log(`${winner.name} is the winner!`)
  },
  endGame: function() {
    console.log("It's a tie! Thanks for playing!");
  }
}

Gameplay.startRound();

function Player(name, marker) {
  return {name, marker};
}