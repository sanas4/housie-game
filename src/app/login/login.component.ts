import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignUpService} from '../services/sign-up.service';
import {Router} from '@angular/router';
// import {SessionStorageService} from '../services/session-storage.service';
import {SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  showErrorMessage = false;

  constructor(private formBuilder: FormBuilder,
              private userService: SignUpService,
              private router: Router,
              private sessionStorageService: SessionStorageService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  signin(form: FormGroup) {
    this.submitted = true;
    if (form.status == 'VALID') {
      this.userService.getUsersFromFirebase().snapshotChanges().forEach(usersSnapShot => {
        usersSnapShot.forEach(userSnapshot => {
          let user = userSnapshot.payload.toJSON();
          this.sessionStorageService.store('user', user);
          // this.sessionStorageService.setUserSession(user);
          var result = Object.keys(user).map(key => (user[key]));
          if (result[2] === form.value.username && result[1] === form.value.password) {
            console.log('login successfull');
            this.router.navigate(['games']);
          } else {
            this.showErrorMessage = true;
            console.log('Enter valid credentials');
          }
        });
      });
    }
  }

}
