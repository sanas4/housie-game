import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// import {StorageServiceModule} from 'angular-webstorage-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {CompletedNumbersComponent} from './completed-numbers/completed-numbers.component';
import {SortByTimePipe} from './filters/sort-by-time.pipe';
import {FooterComponent} from './footer/footer.component';
import {GameComponent} from './game/game.component';
import {GamesComponent} from './games/games.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {PlayComponent} from './play/play.component';
import {RandomNumberComponent} from './random-number/random-number.component';
import {RootComponent} from './root/root.component';
import {RulesComponent} from './rules/rules.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {GameService} from './services/game.service';
import {SignUpService} from './services/sign-up.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
// import {SessionStorageService} from './services/session-storage.service';
import {NgxWebstorageModule} from 'ngx-webstorage';

@NgModule({
  declarations: [
    CompletedNumbersComponent,
    SortByTimePipe,
    FooterComponent,
    GameComponent,
    GamesComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    PlayComponent,
    RandomNumberComponent,
    RootComponent,
    RulesComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // StorageServiceModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
  ],
  providers: [GameService, SignUpService],
  bootstrap: [RootComponent]
})
export class AppModule {
}
