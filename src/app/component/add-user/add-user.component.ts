import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AgencyService } from 'src/app/service/agency.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { ToastService } from 'src/app/service/toast-service';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from "ngx-spinner";  
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  users:any;
  teams:any;
  securities:any;
  submitted = false;  
  addUserForm: any;
  title:string;
  user:any;
  isEdit = false;

  constructor(private userService: UserService,
    private agencyService: AgencyService,
    private dataSharingService: DataSharingService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private spinnerService: NgxSpinnerService) { 

      

      this.addUserForm = this.formBuilder.group({
        selectedTeam: ['', Validators.required],
        selectedSecurity: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        MiddleName: ['', Validators.required],
        suffix: ['',],
        moileNumber: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
      });
    }

  ngOnInit(): void {

    if(this.user){
     this.userService.getUserDetailById(this.user.UserID).subscribe((u)=>{
      this.addUserForm.controls.selectedTeam.patchValue(u.AATeam.split(';'));
      this.addUserForm.controls.firstName.patchValue(u.First_name);
      this.addUserForm.controls.lastName.patchValue(u.Last_name);
      this.addUserForm.controls.MiddleName.patchValue(u.Middle_name);
      this.addUserForm.controls.moileNumber.patchValue(u.Cell.replace(/-/g, ""));
      this.addUserForm.controls.phoneNumber.patchValue(u.Phone.replace(/-/g, ""));
      this.addUserForm.controls.email.patchValue(u.Email);
      this.addUserForm.controls.selectedSecurity.patchValue(u.AASecLevel);
      this.addUserForm.controls.suffix.patchValue(u.Suffix);
      this.isEdit = true;
     })
    }
    
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });

    this.agencyService.getAllTeams().subscribe((response) => {
      this.teams = response;
    });

    this.agencyService.getAllSecurites().subscribe((response) => {
      this.securities = response;
    });
  }

  close()
  {
    this.modalService.hide();
  }

  get f() {
    return this.addUserForm.controls;
  }
  submit()
  {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    }
    var teamid ='';
    this.f.selectedTeam.value.forEach((item: any) => {
      teamid = teamid + item + ';';
    });
    var userModal =
    {
      UserID : this.f.email.value,
      FirstName: this.f.firstName.value,
      MiddleName: this.f.MiddleName.value,
      LastName: this.f.lastName.value,
      Suffix: this.f.suffix.value,
      Team: teamid,
      Sec: this.f.selectedSecurity.value,
      Phone: this.f.phoneNumber.value.toString(),
      Cell: this.f.moileNumber.value.toString(),
      Email: this.f.email.value,
    }
    this.spinnerService.show(); 
    this.userService.adduser(userModal).subscribe((res)=>{
      this.toastService.showSuccess("User created successfully!!", "User Created");
      this.spinnerService.hide(); 
    })
    this.modalService.hide();
  }
  EditUser()
  {
    var teamid ='';
    this.f.selectedTeam.value.forEach((item: any) => {
      teamid = teamid + item + ';';
    });

    var userModal =
    {
      UserID : this.user.UserID,
      FirstName: this.f.firstName.value,
      MiddleName: this.f.MiddleName.value,
      LastName: this.f.lastName.value,
      Suffix: this.f.suffix.value,
      Team: teamid,
      Sec: this.f.selectedSecurity.value,
      Phone: this.f.phoneNumber.value.toString(),
      Cell: this.f.moileNumber.value.toString(),
      Email: this.f.email.value,
    }

    this.spinnerService.show(); 
    this.userService.editUser(userModal).subscribe((res:any)=>{
      this.toastService.showSuccess("User updated successfully!!", "User Updated");
      this.spinnerService.hide(); 
    })
    this.modalService.hide();
  }
}
