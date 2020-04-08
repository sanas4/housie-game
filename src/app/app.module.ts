import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root/root.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';

import {GameService} from './services/game.service';
import { RandomNumberComponent } from './random-number/random-number.component';
import { CompletedNumbersComponent } from './completed-numbers/completed-numbers.component';
import { PlayComponent } from './play/play.component';
import { GameComponent } from './game/game.component';
import { SortByTimePipe } from './filters/sort-by-time.pipe';
import { RulesComponent } from './rules/rules.component';



@NgModule({
  declarations: [
    RootComponent,
    HeaderComponent,
    FooterComponent,
    GamesComponent,
    HomeComponent,
    RandomNumberComponent,
    CompletedNumbersComponent,
    PlayComponent,
    GameComponent,
    SortByTimePipe,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [RootComponent]
})
export class AppModule { }
