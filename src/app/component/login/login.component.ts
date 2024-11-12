import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../service/toast-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loading = false;
  submitted = false;
  hide = true;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {}

  async onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authService
      .login(this.f.username.value, this.f.password.value)
      .subscribe(
        (token) => {
          this.router.navigate(['/dashboard/user']);
        },
        (errorResponse) => {
          this.toastService.showError(
            'Invald user name and password',
            'Invalid Credentails'
          );
        }
      );
  }

  onLogOut() {
    this.authService.logout();
  }

  getUser() {
    this.userService.getUserDetail();
  }
  loginButtonClick() {
    //alert('hi');
  }
  signUpButtonClick() {
    this.router.navigate(['/signUp']);
  }
  forgetPassworkClick() {
    this.router.navigate(['/forgetPassword']);
  }
  showHidePassword()
  {
    this.hide = !this.hide;
  }
}
