const Gameboard = {
  gameboard: [
               ['x', 'x', ''],
               ['x', 'x', 'x'],
               ['x', 'x', 'x']
             ],
  winningCombos: [
                   
                 ]
}

const Gameplay = {
  currentPlayer: null,
  player1: Player('Player 1', 'X'),
  player2: Player('Player 2', 'O'),

  startRound: function() {
    if (this.currentPlayer === null) this.currentPlayer = this.player1;
    Gameboard.gameboard[0][2] = this.currentPlayer.marker;
  },
  endTurn: function() {
    this.checkForWin(this.currentPlayer.marker);
    this. currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  },
  endGame: function() {
    console.log('Thanks for playing!');
  },
  checkForWin: function(marker) {
    
  },
  checkForGameOver: function() {
    let fullGameboard = Gameboard.gameboard.every(row => {
      return row.every(square => square);
    });

    if (fullGameboard) this.endGame();
  }
}

Gameplay.startGame();

function Player(name, marker) {
  return {name, marker};
}