import {Inject, Injectable} from '@angular/core';
// import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

const USER_STORAGE = '_user';

@Injectable()
export class SessionStorageService {

  constructor(
    // @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) {

  }

  public getUserSession() {
    // return this.storage.get(USER_STORAGE);
  }

  public setUserSession(user: any) {
    // this.storage.set(USER_STORAGE, user);
    // this.userService.setUser(user);
    // return this.storage.get(USER_STORAGE);
  }

  public removeUserSession() {
    // this.userService.removeUser();
    // return this.storage.remove(USER_STORAGE);
  }


}
