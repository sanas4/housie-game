import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../_helpers/must-match';
import {SignUpService} from '../services/sign-up.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signInForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private userService: SignUpService,
              private router: Router) {
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    )
    ;
  }

  get f() {
    return this.signInForm.controls;
  }

  signUp(form: FormGroup) {
    this.submitted = true;
    console.log(form.status);
    if (form.status == 'VALID') {
      this.userService.addAUserToFirebase(form.value);
      this.router.navigate(['login']);
    } else {
     console.log('errors');
    }
  }
}
