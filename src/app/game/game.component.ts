import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Game} from './../interfaces/game';
import {Router} from '@angular/router';
import {GameService} from '../services/game.service';
import tambola from 'tambola-generator';
import {SessionStorageService} from 'ngx-webstorage';

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
  checkNumber: Array<any> = [];
  firstRowCheck: Array<any> = [];
  lastRowCheck: Array<any> = [];
  cornerWinnewCheck: Array<any> = [];


  constructor(private router: Router, private  gameService: GameService, private sessionStorageService: SessionStorageService) {
    this.finalMatrix = this.sessionStorageService.retrieve('ticket');
  }

  ngOnInit() {
  }

  generateTicket() {
    /*this.showHideTicket = true;
    var ticket = tambola.getTickets(1);
    this.finalMatrix = ticket[0];*/
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
    /*if (this.showHideTicket == true) {

      /!* console.log('includes 1', this.matrix[9].includes(this.game.lastNumber));
       console.log('includes 2', this.matrix[10].includes(this.game.lastNumber));
       console.log('includes 3', this.matrix[11].includes(this.game.lastNumber));*!/
      console.log('this.game', this.game.lastNumber);
      console.log('this.matrix', this.matrix);
      console.log('this.firstRow ', this.firstRow);
      console.log('this.secondRow ', this.secondRow);
      console.log('this.thirdRow ', this.thirdRow);
    } else {
      alert('No Tickets generated');
    }*/
    this.updateNumber.emit();
  }

  onCompleteGame() {
    this.completeGame.emit();
  }

  selectNumber(number, index) {
    console.log('number', number);
    if (number != 0) {
      if (typeof this.checkNumber[index] === 'undefined') {
        this.checkNumber[index] = [];
      }
      let findNumber = this.checkNumber[index].indexOf(number);
      findNumber !== -1 ? this.checkNumber[index].splice(findNumber, 1) : this.checkNumber[index].push(number);
      console.log('check number', this.checkNumber);
      console.log('check number of index', this.checkNumber[index]);
    }
  }

  firstRowWinner() {
    if (typeof this.checkNumber[0] === 'undefined') {
      this.checkNumber[0] = [];
    }
    console.log('..', this.finalMatrix[0]);
    console.log(',,', this.checkNumber[0]);
    console.log('length', this.checkNumber[0].length);
    let firstRowFound = this.checkNumber[0].every(ai => this.game.completedNumbers.includes(ai));
    if (firstRowFound === true && this.checkNumber[0].length == 5) {
      alert('First row winner');
    } else {
      alert('Oops... Numbers not matching... please try again');
    }
  }

  secondRowWinner() {
    if (typeof this.checkNumber[1] === 'undefined') {
      this.checkNumber[1] = [];
    }
    console.log('', this.finalMatrix[1]);
    console.log('length', this.checkNumber[1].length);
    let secondRowFound = this.checkNumber[1].every(ai => this.game.completedNumbers.includes(ai));
    if (secondRowFound === true && this.checkNumber[1].length == 5) {
      alert('Second row winner');
    } else {
      alert('Oops... Numbers not matching... please try again');
    }
  }

  ThirdRowWinner() {
    if (typeof this.checkNumber[2] === 'undefined') {
      this.checkNumber[2] = [];
    }
    console.log('', this.finalMatrix[2]);
    console.log('length', this.checkNumber[2].length);
    let thirdRowFound = this.checkNumber[2].every(ai => this.game.completedNumbers.includes(ai));
    if (thirdRowFound === true && this.checkNumber[2].length == 5) {
      alert('Third row winner');
    } else {
      alert('Oops... Numbers not matching... please try again');
    }
  }

  fullHousieWinner() {
    if (typeof this.checkNumber[0] === 'undefined' || this.checkNumber[1] === 'undefined' || this.checkNumber[2] === 'undefined') {
      this.checkNumber[0] = [];
      this.checkNumber[1] = [];
      this.checkNumber[2] = [];
    }
    let firstRowFound = this.checkNumber[0].every(ai => this.game.completedNumbers.includes(ai));
    let secondRowFound = this.checkNumber[1].every(ai => this.game.completedNumbers.includes(ai));
    let thirdRowFound = this.checkNumber[2].every(ai => this.game.completedNumbers.includes(ai));
    if (firstRowFound === true && secondRowFound === true && thirdRowFound === true &&
      this.checkNumber[0].length == 5 && this.checkNumber[1].length == 5 && this.checkNumber[2].length == 5) {
      alert('Congratulations Full housie winner');
    } else {
      alert('Oops... Numbers not matching... please try again');
    }
  }

  fourCornerWinner() {
    this.finalMatrix[0].forEach((replace: number, index: number) => {
      if (replace != 0) {
        this.firstRowCheck.push(replace);
        /*     console.log('replace', replace);
             console.log('index', index);*/
        console.log('this.firstRowCheck', this.firstRowCheck);
        return false;
      }
    });
    this.finalMatrix[2].forEach((replace: number, index: number) => {
      if (replace != 0) {
        this.lastRowCheck.push(replace);
        /*console.log('replace', replace);
        console.log('index', index);*/
        console.log('this.firstCornerCheck', this.lastRowCheck);
        return false;
      }
    });
    this.cornerWinnewCheck.push(this.firstRowCheck[0]);
    this.cornerWinnewCheck.push(this.firstRowCheck[4]);
    this.cornerWinnewCheck.push(this.lastRowCheck[0]);
    this.cornerWinnewCheck.push(this.lastRowCheck[4]);
    console.log('cornerWinnewCheck', this.cornerWinnewCheck);
    let cornerWinnewCheck = this.cornerWinnewCheck.every(ai => this.game.completedNumbers.includes(ai));
    if (cornerWinnewCheck === true) {
      alert('Congratulations 4 corner winner');
    } else {
      alert('Oops... Numbers not matching... please try again');
    }
  }
}
