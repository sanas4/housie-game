import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable()
export class SignUpService {
  private userList: AngularFireList<any>;
  private ticket: AngularFireList<any>;
  private generatedNumbers: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {
    this.userList = this.firebase.list('user');
    this.ticket = this.firebase.list('ticket');
    this.generatedNumbers = this.firebase.list('generatedNumbers');
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

  addTicket(ticket) {
    this.ticket.push(ticket);
  }

  getGeneratedNumbers() {
    return this.generatedNumbers;
  }

  addGeneratedNumbers(number) {
    this.generatedNumbers.push(number);
  }

  updateGeneratedNumbers(oldNumber, newNumber) {
    console.log('in service');
    this.generatedNumbers.update(oldNumber, newNumber);
  }

  /* deleteAuserFromFirebase($key: string) {
     this.userList.remove($key);
   }*/
}
