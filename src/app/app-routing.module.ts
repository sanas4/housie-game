import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GamesComponent} from './games/games.component';
import {PlayComponent} from './play/play.component';
import {RulesComponent} from './rules/rules.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthGaurd} from './services/auth.guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  // {path: '', redirectTo: '/rules', pathMatch: 'full'},
  {
    path: 'games', component: GamesComponent,
    canActivate: [AuthGaurd],
  },
  {
    path: 'games/:id', component: PlayComponent,
    canActivate: [AuthGaurd],
  },
  {path: 'rules', component: RulesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
