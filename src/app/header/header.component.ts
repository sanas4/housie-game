import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from './../services/game.service';
import {SessionStorageService} from 'ngx-webstorage';
import tambola from 'tambola-generator';
import {SignUpService} from '../services/sign-up.service';

/* tslint:disable:component-selector */
@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  finalMatrix: Array<any> = [];

  constructor(private gameService: GameService,
              private router: Router,
              private sessionStorageService: SessionStorageService,
              private signUpService: SignUpService) {
  }

  ngOnInit() {
  }

  createNewGame() {
    var ticket = tambola.getTickets(1);
    this.finalMatrix = ticket[0];
    console.log('final matrix', this.finalMatrix);
    this.sessionStorageService.store('ticket', this.finalMatrix);
    this.signUpService.addTicket(this.finalMatrix);
    var newGame = this.gameService.createGame();
    console.log('new game', newGame);
    this.router.navigate(['/games', newGame.id]);
  }

  logout() {
    this.sessionStorageService.clear('user');
    this.router.navigate(['login']);
  }
}
