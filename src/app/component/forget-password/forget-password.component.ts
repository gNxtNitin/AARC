import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../../service/user.service'
import { ToastService } from '../../service/toast-service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm: any;
  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService
  ) {
    this.forgetForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }

  get f() {
    return this.forgetForm.controls;
  }

  ngOnInit(): void {}

  async onSubmit() {
    this.submitted = true;
    if (this.forgetForm.invalid) {
      return;
    }
    this.userService
      .sendPassword(this.f.email.value)
      .subscribe(
        (result) => {
          this.toastService.showSuccess("Email send successfully", "Email sent");
        },
        (errorResponse) => {
          this.toastService.showError("Error occured, please try again later",'Email Not sent' );
        }
      );
  }

  loginButtonClick() {
    this.router.navigate(['/login']);
  }
  signUpButtonClick() {
    this.router.navigate(['/signUp']);
  }
  backBtnClick()
  {
    this.router.navigate(['/login']);
  }

}
