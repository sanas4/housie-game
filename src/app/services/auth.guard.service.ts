import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {SessionStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

  constructor(private router: Router,
              private sessionStorageService: SessionStorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot) {
    this.sessionStorageService.retrieve('user') == null ? this.router.navigateByUrl('/login') : true;
    return true;
  }
}
