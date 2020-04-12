import {Injectable} from '@angular/core';

import {Game} from './../interfaces/game';
import {Player} from '../interfaces/player';
import {Observable, of} from 'rxjs';

@Injectable()
export class GameService {
  private games: Game[];
  arr = [];
  matrix: Array<any> = [];

  constructor() {
    this.games = JSON.parse(localStorage.getItem('games')) || [];
  }

  private storeGames() {
    localStorage.setItem('games', JSON.stringify(this.games));
  }

  getGames(): Observable<Game[]> {
    return of(this.games);
  }

  setGames(data) {
    if (data) {
      this.games = data;
    }
    this.storeGames();
  }

  getGameNumbers(): number[] {
    return Array.from(Array(91).keys()).slice(1);
  }

  matrixify(arr, rows, cols) {
    if (rows * cols === arr.length) {
      for (var i = 0; i < arr.length; i += cols) {
        this.matrix.push(arr.slice(i, cols + i));
      }
      console.log('this.matrix', this.matrix);
    }
  }

  getTicketNumbers() {
    while (this.arr.length < 27) {
      var r = Math.floor(Math.random() * 90) + 1;
      if (this.arr.indexOf(r) === -1) {
        this.arr.push(r);
        console.log('arr...', this.arr);
      }
    }
    this.matrixify(this.arr, 3, 9);
    var player: Player = {
      firstRow: this.matrix[0],
      secondRow: this.matrix[1],
      thirdRow: this.matrix[2],
    };
    /* var player: Player = {
       name: 'sana',
       firstRow: this.matrix[0],
       secondRow: this.matrix[1],
       thirdRow: this.matrix[2]
     };*/
    console.log('player', player);
    return player;
  }

  createGame(): Game {
    var newGame: Game = {
      id: '' + Date.now(),
      lastNumber: 0,
      remainingNumbers: this.getGameNumbers(),
      completedNumbers: [],
      firstFive: {numbers: '', name: ''},
      firstRow: {numbers: '', name: ''},
      secondRow: {numbers: '', name: ''},
      thirdRow: {numbers: '', name: ''},
      fullHouse: {numbers: '', name: ''},
      completed: false,
      updatedTime: Date.now()
    };
    this.games.push(newGame);
    this.storeGames();
    return newGame;
  }

  getGame(id: string) {
    return this.games.find(game => game.id == id);
  }
}
