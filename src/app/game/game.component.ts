import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Game} from './../interfaces/game';
import {Router} from '@angular/router';
import {GameService} from '../services/game.service';

@Component({
  selector: '[app-game]',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() game: Game;
  @Input() isPlay: boolean;
  @Output() updateNumber = new EventEmitter();
  @Output() completeGame = new EventEmitter();
  matrix: Array<any> = [];
  arr = [];
  firstRow = 0;
  secondRow = 0;
  thirdRow = 0;
  full = 0;
  showHideTicket = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  generateTicket() {
    // console.log('hi');
    while (this.arr.length < 21) {
      var r = Math.floor(Math.random() * 90) + 1;
      if (this.arr.indexOf(r) === -1) {
        this.arr.push(r);
      }
    }
    this.matrixify(this.arr, 3, 7);
    this.showHideTicket = true;
  }

  isCompleted(n: number): boolean {
    return this.game.completedNumbers.indexOf(n) != -1;
  }

  matrixify(arr, rows, cols) {
    if (rows * cols === arr.length) {
      for (var i = 0; i < arr.length; i += cols) {
        this.matrix.push(arr.slice(i, cols + i));
      }
    }
  }

  startGame(event) {
    event.stopPropagation();
    this.router.navigate(['/games', this.game.id]);
  }

  onUpdateNumber() {
    if (this.showHideTicket == true) {
      if (this.matrix[0].includes(this.game.lastNumber) == true) {
        this.firstRow += 1;
        this.full += 1;
        if (this.firstRow >= 7) {
          alert('First row winner');
          console.log('First row winner');
        }
      }
      if (this.matrix[1].includes(this.game.lastNumber) == true) {
        this.secondRow += 1;
        this.full += 1;
        if (this.secondRow >= 7) {
          alert('Second row winner');
          console.log('Second row winner');
        }
      }
      if (this.matrix[2].includes(this.game.lastNumber) == true) {
        this.thirdRow += 1;
        this.full += 1;
        if (this.thirdRow >= 7) {
          alert('Third row winner');
          console.log('Third row winner');
        }
      }
      if (this.firstRow >= 7 && this.secondRow >= 7 && this.thirdRow >= 7) {
        alert('Full Housie winner');
        console.log('Full Housie winner');
      }
      console.log('includes 1', this.matrix[0].includes(this.game.lastNumber));
      console.log('includes 2', this.matrix[1].includes(this.game.lastNumber));
      console.log('includes 3', this.matrix[2].includes(this.game.lastNumber));
      console.log('this.game', this.game.lastNumber);
      console.log('this.matrix', this.matrix);
      console.log('this.firstRow ', this.firstRow);
      console.log('this.secondRow ', this.secondRow);
      console.log('this.thirdRow ', this.thirdRow);
    } else {
      alert('No Tickets generated');
    }
    /*setTimeout(() => {
      document.getElementById('hideDiv').style.display = 'disable';
      console.log('Hello from setTimeout');
    }, 3000);
*/
    this.updateNumber.emit();
  }

  onCompleteGame() {
    this.completeGame.emit();
  }

}
