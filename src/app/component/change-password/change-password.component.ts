import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastService } from 'src/app/service/toast-service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form:any;
  isSumbit=  false;
  passwordNotMatch = false;
  userDetail: any;
  hide = true;
  constructor( private modalService: BsModalService,
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private toastService: ToastService,) {

    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      confirmPassword: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.userDetail = JSON.parse(
      JSON.parse(JSON.stringify(localStorage.getItem('userDetail')))
    );
  }

  close()
  {
    this.modalService.hide();
  }
  submit()
  {
    debugger;
   this.isSumbit = true;
   if(this.f.password.value != this.f.confirmPassword.value)
   {
    this.passwordNotMatch = true;
    return;
   }
   if(this.form.invalid){
    return;
   }

    this.userService.changePassword({Email: this.userDetail['Email'], Password: this.f.password.value})
    .subscribe((res:any)=>{
      this.modalService.hide();
      this.toastService.showSuccess("Password change successfully","Pasword Change");
    })
  }

  get f() {
    return this.form.controls;
  }
  showHidePassword()
  {
    this.hide = !this.hide;
  }
}
