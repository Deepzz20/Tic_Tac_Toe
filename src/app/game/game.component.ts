import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  squares: any[] = [];
  xIsNext = true;
  winner = '';
  counter = 0;
  isdraw = '';
  freshpage = true;
  line: any[] = [];

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.isdraw = '';
    this.counter = 0;
    this.freshpage = false;
    this.line = [];
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx] && !this.winner) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
      this.counter++;
    }
    const { winner, line } = this.calculateWinner();
    this.winner = winner;
    this.line = line;
    if (this.winner) {
      this.squares = this.squares.map((val, i) => (line.includes(i) ? val : null));
    }
    if (!this.winner && this.counter === 9) {
      this.isdraw = 'YES';
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return { winner: this.squares[a], line: [a, b, c] };
      }
    }
    return { winner: null, line: [] };
  }
}
