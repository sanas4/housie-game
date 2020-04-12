import { Component, OnInit, Input } from '@angular/core';

import { GameService} from './../services/game.service';
/* tslint:disable:component-selector */
@Component({
  selector: '[app-random-number]',
  templateUrl: './random-number.component.html',
  styleUrls: ['./random-number.component.css']
})
export class RandomNumberComponent implements OnInit {

  @Input() lastNumber: number;

  constructor(private gameService:GameService) {
  }


  ngOnInit(): void {
  }

}
