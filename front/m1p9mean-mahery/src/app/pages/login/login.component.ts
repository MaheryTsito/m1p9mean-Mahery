import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = 'tsitomax@gmail.com';
  password: string = 'tsitomax';
  loginForm: FormGroup = null as any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.userService
      .login(this.f['login'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        (response) => {
          console.log(response);
        },
        (exception) => {
          console.error(exception);
        }
      );
  }
}
