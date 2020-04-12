import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Game} from './../interfaces/game';
import {Router} from '@angular/router';
import {GameService} from '../services/game.service';
import tambola from 'tambola-generator';

/* tslint:disable:component-selector */
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
  finalMatrix: Array<any> = [];
  arr = [];
  firstRow = 0;
  secondRow = 0;
  thirdRow = 0;
  full = 0;
  showHideTicket = false;

  constructor(private router: Router, private  gameService: GameService) {
  }

  ngOnInit() {
    /* let arr = [];
     for (var i = 0; i < arr.length; i++) {
       console.log('hi', arr);
     }

     while (arr.length < 90) {
       var r = +1;
       if (arr.indexOf(r) === -1) {
         arr.push(r);
         console.log('arr...', arr);
         this.matrixify(arr, 9, 3);
       }
     }*/

  }

  removeDuplicateCharacters(string) {
    return string
      .split('')
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      })
      .join('');

  }

  generateTicket() {
    this.showHideTicket = true;
    var ticket = tambola.getTickets(1);
    this.finalMatrix = ticket[0];
    // var removed = this.finalMatrix[0].splice(0, 4, "0");
    // this.finalMatrix.splice(0, 1, '')
    // console.log('found', found);
    // console.log('removed', removed);
    // this.gameService.getTicketNumbers();
    /*this.gameService.getTicketNumbers();

    var result = this.gameService.getTicketNumbers();
    this.finalMatrix = Object.keys(result).map(key => (result[key]));
    console.log(this.finalMatrix);
    /!*
    this.finalMatrix = result;
    console.log('result', result);*!/
    console.log('finalMatrix', this.finalMatrix);
    /!*  while (this.arr.length < 21) {
        var r = Math.floor(Math.random() * 90) + 1;
        if (this.arr.indexOf(r) === -1) {
          this.arr.push(r);
        }
      }*!/
    this.matrixify(this.matrix, 9, 3);
    this.showHideTicket = true;*/
  }

  isCompleted(n: number): boolean {
    return this.game.completedNumbers.indexOf(n) != -1;
  }

  matrixify(arr, rows, cols) {
    if (rows * cols === arr.length) {
      for (var i = 0; i < arr.length; i += cols) {
        /*console.log('sssss', this.matrix);
        console.log('sssss', this.matrix[21]);
        console.log('sssss', this.matrix[22]);
        console.log('sssss', this.matrix[23]);*/
        /*   this.finalMatrix.push(this.matrix[21]);
           this.finalMatrix.push(this.matrix[22]);
           this.finalMatrix.push(this.matrix[23]);
           console.log('finalMatrix', this.finalMatrix);*/
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
      console.log('this.matrix,,,', this.matrix);
      console.log('this.finalMatrix,,,', this.finalMatrix);
      if (this.finalMatrix[0].includes(this.game.lastNumber) == true) {
        this.firstRow += 1;
        this.full += 1;
        if (this.firstRow >= 7) {
          alert('First row winner');
          console.log('First row winner');
        }
      }
      if (this.finalMatrix[1].includes(this.game.lastNumber) == true) {
        this.secondRow += 1;
        this.full += 1;
        if (this.secondRow >= 7) {
          alert('Second row winner');
          console.log('Second row winner');
        }
      }
      if (this.finalMatrix[2].includes(this.game.lastNumber) == true) {
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
      /* console.log('includes 1', this.matrix[9].includes(this.game.lastNumber));
       console.log('includes 2', this.matrix[10].includes(this.game.lastNumber));
       console.log('includes 3', this.matrix[11].includes(this.game.lastNumber));*/
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
