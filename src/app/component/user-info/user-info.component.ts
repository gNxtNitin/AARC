import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgencyService } from 'src/app/service/agency.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { ToastService } from 'src/app/service/toast-service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  host: {
    class: 'col-md-8 col-sm-12 pt-2 vh-scroll',
  },
})
export class UserInfoComponent implements OnInit {
  selectedUser: any = '';
  teamInfo: any;
  securityLevel: any;
  showTeamInfo = false;
  showSecurityInfo = false;
  showContactInfo = false;
  showProducerCode = true;
  selectedAgency: any;
  selectedCarrier: any;
  producerCode: any;
  branchCode: any;
  currentUser: any;
  users: any;
  ProdCodesInfo: any;
  cloneUserForm: any;
  updatePasswordForm: any;
  importCredentailForm: any;
  importCredentailSubmitted = false;
  fn: string = '';
  cloneSubmitted = false;
  loggedInUser:any={};
  showCarrierInfo = true;
  userID: any;
  userPW: any;
  producercode: any;
  selectedAgencyName: any;
  selectedCarrierName: any;

  modalRef: BsModalRef = {
    hide: function (): void {
      throw new Error('Function not implemented.');
    },
    setClass: function (newClass: string): void {
      throw new Error('Function not implemented.');
    },
  };

  constructor(
    private userService: UserService,
    private dataSharingService: DataSharingService,
    private agencyService: AgencyService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private spinnerService: NgxSpinnerService,
    private clipboard: Clipboard,
    private route: ActivatedRoute
  ) {
    this.cloneUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      cloneFrom: ['', Validators.required],
    });

    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      NewPassword: ['', Validators.required]
    });

    this.importCredentailForm = this.formBuilder.group({
      UserImportCredentailFrom: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.dataSharingService.userSelected.subscribe((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
        this.load();
    });

    if(JSON.parse(JSON.stringify(localStorage.getItem('currentUser'))))
    {
      this.currentUser =  JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('currentUser'))));
      this.load();
    }

    this.loggedInUser = this.dataSharingService.loggedInUser;
    this.dataSharingService.loggedUser.subscribe((response:any) => {
      this.loggedInUser = response;
    })
    
  }

  load() {
    //this.spinnerService.show();
    this.showTeamInfo = false;
    this.selectedAgency =  this.dataSharingService.selectedAgency;
    this.userService
      .getUserTeam(this.currentUser['UserID'])
      .subscribe((response) => {
        this.teamInfo = response;
        this.spinnerService.hide();
      });

      this.userService
      .getUserDetailById(this.currentUser['UserID'])
      .subscribe((response) => {
        this.currentUser = response;
      });

    this.userService
      .getUserSecurityLeve(this.currentUser['AASecLevel'])
      .subscribe((response) => {
        this.securityLevel = response;
        this.spinnerService.hide();
      });

    this.dataSharingService.agencySelected.subscribe((agency) => {
      this.selectedAgency = agency;
      this.selectedCarrier = null;
    });
    this.dataSharingService.carrierSelected.subscribe((carrier) => {
      this.selectedCarrier = carrier;
      this.agencyService
        .getProducerCodeByCarrierId(
          this.currentUser['UserID'],
          this.selectedAgency.agency_id,
          this.selectedCarrier.carrier_id
        )
        .subscribe((res) => {
          this.producerCode = res;
        });
    });

       this.agencyService
        .getProducerCodeByCarrierId(
          this.currentUser['UserID'],
          this.dataSharingService.selectedAgency.agency_id,
          this.dataSharingService.selectedCarrier.carrier_id
        )
        .subscribe((res) => {
          this.producerCode = res;
        });

        if(this.dataSharingService.selectedCarrier)
        {
          this.selectedCarrier = this.dataSharingService.selectedCarrier;
        }
  }

  get f() {
    return this.cloneUserForm.controls;
  }

  get upf() {
    return this.updatePasswordForm.controls;
  }

  get cf() {
    return this.importCredentailForm.controls;
  }
  TeamInfoClick() {
    this.showTeamInfo = !this.showTeamInfo;
  }
  showSecurityClick() {
    this.showSecurityInfo = !this.showSecurityInfo;
  }
  showContactClick() {
    this.showContactInfo = !this.showContactInfo;
  }
  showProducerCodeClick() {
    this.showProducerCode = !this.showProducerCode;
  }
  changeUser(changeUserTemplate: any) {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
    this.modalRef = this.modalService.show(changeUserTemplate, {backdrop: 'static'});
  }

  cloneUser(cloneUserTemplate: any) {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
    this.modalRef = this.modalService.show(cloneUserTemplate, {backdrop: 'static'});
  }

  deleteUser(deleteUserTemplate: any) {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
    this.modalRef = this.modalService.show(deleteUserTemplate, {backdrop: 'static'});
  }

  UserSelected() {
    this.spinnerService.show();
    this.userService
      .getUserDetailById(this.selectedUser)
      .subscribe((response) => {
        this.currentUser = response;
        this.dataSharingService.sendSelectedUser(response);
        this.load();
        this.toastService.showSuccess(
          'User changed successfully',
          'User Changed'
        );
        this.spinnerService.hide();
        this.modalService.hide();
      });
  }

  submitCloneUser() {
    this.cloneSubmitted = true;
    if (this.cloneUserForm.invalid) {
      return;
    }

    var cloneUser = {
      SrcID: this.f.cloneFrom.value,
      FN: this.f.firstName.value,
      LN: this.f.lastName.value,
      DestID: this.f.email.value,
      Email:  this.f.email.value
    };
    this.spinnerService.show();
    this.userService.cloneUser(cloneUser).subscribe((res) => {
     if(res == 0)
     {
      this.toastService.showError('User not cloned !!', 'Clone User');
      this.spinnerService.hide();
     } else if(res == -1){
      this.toastService.showError('User already exist in the system !!', 'Clone User');
      this.spinnerService.hide();
     }else {
      this.toastService.showSuccess('User cloned successfully!!', 'Clone User');
      this.modalService.hide();
      this.spinnerService.hide();
     }
     
    });
  }

  copy(text: string) {
    this.toastService.showSuccess('Copied successfully !!', 'Copy');
    this.clipboard.copy(text);
  }

  submitImportCredentail() {
    this.spinnerService.show();
    this.userService
      .importCredentails(
        this.cf.UserImportCredentailFrom.value,
        this.currentUser['UserID']
      )
      .subscribe((res) => {
        this.spinnerService.hide();
        this.toastService.showSuccess(
          'Imported successfully !!',
          'Import Credentails'
        );
      });
  }

  CarrierInfoClick() {
    this.showCarrierInfo = !this.showCarrierInfo;
  }

  updatePasswordpopup(updatePasswordtemplate: any,userID:any,passwd:any,producercode:any,branch:any) {
    debugger;
    this.selectedAgencyName = this.dataSharingService.selectedAgency.agency_name;
    this.selectedCarrierName = this.dataSharingService.selectedCarrier.carrier_name;
    this.GetUserInfo(this.dataSharingService.selectedCarrier.carrier_id.toString(),userID,passwd,branch);
    this.userID = userID;
    this.userPW =passwd;
    this.producercode =producercode;
    this.branchCode = branch;
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
    this.modalRef = this.modalService.show(updatePasswordtemplate, {backdrop: 'static'});
  }

  submit(event: any){
    event.target.disabled = true;
    if(this.upf.NewPassword.value.length>0){
      let FirstName = this.dataSharingService.loggedInUser['First_name'];
      let LastName =this.dataSharingService.loggedInUser['Last_name'];
      let AgencyName = this.dataSharingService.selectedAgency.agency_name;
      let CarrierName = this.dataSharingService.selectedCarrier.carrier_name;
      console.log(this.dataSharingService.selectedCarrier);
      let loggedinUserid =this.dataSharingService.loggedInUser['Email'];
      let loggedinUserTeamName =this.dataSharingService.loggedInUser['AATeamName'];
      let emailid ="supportcase@agencyadmins.com";
      //let emailid ="mukul@gnxtsystems.com";
      let agencyID = this.dataSharingService.selectedAgency.agency_id;
      let carrierID = this.dataSharingService.selectedCarrier.carrier_id.toString();
      let producerCode = this.producercode;
      let branchCode = this.branchCode;
      let UserType = "";
      if(this.branchCode=="A")
      {
        UserType="Admin";
      }
      else if(this.branchCode=="C")
      {
        UserType="Commercial";
      }
      else if(this.branchCode=="P")
      {
        UserType="Personal";
      }
      else if(this.branchCode=="B")
      {
        UserType="Both";
      }
      else
      {
        UserType="";
      }
      
      let oldPassword = this.userPW;
      let newPassword = this.upf.NewPassword.value;

      let emailsubject = FirstName +" "+LastName +" "+"["+loggedinUserTeamName+"]"+" "+ "updated the password for "+AgencyName+" – "+CarrierName+"";

      let emailBody = "<table><tr><td>Old Password : "+oldPassword+"</td></tr>";
      emailBody += "<tr><td>New Password : "+newPassword+"</td></tr>";
      emailBody += "<tr><td>Team : "+loggedinUserTeamName+"</td></tr>";
      emailBody += "<tr><td>Type : "+UserType+"</td></tr></table>";

      this.userService
        .UpdatePasswordEmail({emailid,emailsubject,emailBody,agencyID,carrierID,loggedinUserid,newPassword,producerCode,branchCode})
        .subscribe(
          (result) => {
            this.clearInput();
            event.target.disabled = false;
            this.modalRef.hide();
            this.toastService.showSuccess("Email send successfully", "Email sent");
            this.load();
          },
          (errorResponse) => {
            this.toastService.showError("Error occured, please try again later",'Email Not sent' );
            event.target.disabled = false;
          }
        );
    }
    else{
      this.toastService.showError("please enter Correct values",'Password Not Updated' );
      event.target.disabled = false;
    }
  }


  clearInput() {
    // Clear the input field
    //this.updatePasswordForm.get('oldPassword')?.reset();
    this.updatePasswordForm.get('NewPassword')?.reset();
  }

  GetUserInfo(carrierId: any,uId: any,password: any,userType: any) {
    this.userService.getUsersProdCodes({carrierId:carrierId,userid:uId,password:password,branch:userType}).subscribe((response) => {
      this.ProdCodesInfo = response;
    });
    //this.modalRef = this.modalService.show(cloneUserTemplate, {backdrop: 'static'});
  }

  Deleteuser(user:any){
    const confirmed = window.confirm('Are you sure you want to delete this User?');
    if (confirmed) {
      this.userService.deleteActiveUser(user.AAid)
      .subscribe((res:any)=>{
        this.modalService.hide();
        this.toastService.showSuccess("User Removed successfully","Pasword Change");
      })
    }
  }
  
}
