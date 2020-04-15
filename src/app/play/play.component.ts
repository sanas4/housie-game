import {Component, OnInit} from '@angular/core';

import {GameService} from './../services/game.service';
import {Game} from './../interfaces/game';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SignUpService} from '../services/sign-up.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  game: Game;
  mapped;
  key;

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router,
              private signUpService: SignUpService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.game = this.gameService.getGame(params['id']);
    });
  }

  updateNumber() {
    var rindex = Math.floor(Math.random() * this.game.remainingNumbers.length);
    var lastNumber = this.game.remainingNumbers.splice(rindex, 1)[0];
    this.game.completedNumbers.push(lastNumber);
    this.game.lastNumber = lastNumber;
    this.signUpService.getGeneratedNumbers().snapshotChanges().forEach(number => {
      number.forEach(userSnapshot => {
        this.key = userSnapshot.key;
        let number = userSnapshot.payload.toJSON();
        this.mapped = Object.keys(number).map(key => (number[key]));
      });
    });
    console.log('document id', this.key);
    console.log('completed numbers old array', this.game.completedNumbers);
    console.log('completed numbers new array', this.mapped);
    this.signUpService.addGeneratedNumbers(this.game.completedNumbers);
    if (JSON.stringify(this.game.completedNumbers) == JSON.stringify(this.mapped)) {
      console.log('True');
    } else {
      console.log('False');
      this.signUpService.updateGeneratedNumbers(this.key, this.game.completedNumbers);
    }

    this.game.updatedTime = Date.now();
    this.gameService.setGames(null);
  }

  completeGame() {
    this.game.completed = true;
    this.gameService.setGames(null);
    this.router.navigate(['/games']);
  }

}
