import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from './../services/game.service';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private gameService:GameService, private router:Router) { }

  ngOnInit() {
  }

  createNewGame() {
    var newGame = this.gameService.createGame();
    this.router.navigate(['/games', newGame.id]);
  }
}
