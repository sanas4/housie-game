import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable()
export class SignUpService {
  private userList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {
    this.userList = this.firebase.list('user');
  }

  getUsersFromFirebase() {
    return this.userList;
  }

  addAUserToFirebase(user) {
    console.log('user', user);
    this.userList.push({
      userName: user.username,
      email: user.email,
      password: user.password,
    });
  }
}
