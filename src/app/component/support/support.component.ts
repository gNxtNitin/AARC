import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AgencyService } from 'src/app/service/agency.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { ToastService } from 'src/app/service/toast-service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  host: {
    class: 'col-md-8 col-sm-12 pt-2 vh-scroll',
  },
})
export class SupportComponent {
  supportForm:any;
  agencies :any;
  uploadedfilename :any;
  selectedAgency:any;
  fileToUpload: File;
  selectedDocType = '';
  selectedFile:any = {};
  Cat:any;
  DocName:any;
  Attachment:any;

  @ViewChild('myInput') myInputVariable: ElementRef;

  constructor(
    private agencyService: AgencyService,
    private formBuilder: FormBuilder,
    private dataSharingService: DataSharingService,
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.agencyService.getAllAgencies().subscribe((response: any) => {
      this.agencies = response;
      console.log(this.agencies);
      console.log(this.dataSharingService);
    });

    this.supportForm = this.formBuilder.group({
      subject: ['',Validators.required],
      description: ['',Validators.required],
      selectedAgency: ['',Validators.required],
      issue: ['',Validators.required]
    });
  }

  handleFileInput(target:any){
    const file = target.files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    //console.log(file);
    this.selectedFile ['file'] =  file;
    reader.onload = () => {
      this.selectedFile ['data'] = (reader.result as string).split(",")[1];
    };
  }

  submit(event: any){
    event.target.disabled = true;
    if(this.supportForm.controls.selectedAgency.value.length>0 && this.supportForm.controls.issue.value.length>0 && this.supportForm.controls.subject.value.length>0){
      let FirstName = this.dataSharingService.loggedInUser['First_name'];
      let LastName =this.dataSharingService.loggedInUser['Last_name'];
      let Emailid ="supportcase@agencyadmins.com";
      //let Emailid ="mukul@gnxtsystems.com";
      let selectedAgency = this.supportForm.controls.selectedAgency.value;
      let subject = this.supportForm.controls.subject.value;
      let Description = this.supportForm.controls.description.value;
      let issue = this.supportForm.controls.issue.value;
      let Emailsubject = FirstName +" "+LastName +" "+ "has submitted a support ticket:"+""+ subject;

      if(this.selectedFile!=undefined &&this.selectedFile!="" && this.selectedFile['file']!=undefined){
      this.Cat= this.selectedFile['file']['type'];
      this.DocName= this.selectedFile['file']['name'];
      this.Attachment= this.selectedFile ['data'];
      }
      else{
        this.Cat= "";
        this.DocName="";
        this.Attachment="";
      }
      let Cat = this.Cat;
      let DocName = this.DocName;
      let Attachment = this.Attachment;

      let EmailBody = "<table><tr><td>Employe :</td><td>"+FirstName+" "+LastName+"</td></tr>";
      EmailBody += "<tr><td>Agency Name :</td><td>"+selectedAgency+"</td></tr>";
      EmailBody += "<tr><td>Subject :</td><td>"+subject+"</td></tr>";
      EmailBody += "<tr><td>Description :</td><td>"+Description+"</td></tr></table>";

          this.userService
      .sendSupportEmail({Emailid,Emailsubject,EmailBody,Cat,DocName,Attachment})
      .subscribe(
        (result) => {
          this.toastService.showSuccess("Thank You for submitting your support ticket", "Email sent");  
          this.clearInput();  
          event.target.disabled = false; 
        },
        (errorResponse) => {
          this.toastService.showError("Error occured, please try again later",'Email Not sent' );
          event.target.disabled = false; 
        }
      );
    }
    else{
      this.toastService.showError("Error occured, please enter values",'Email Not sent' );
      event.target.disabled = false; 
    }
  }

  clearInput() {
    // Clear the input field
    this.supportForm.get('selectedAgency')?.reset("");
    this.supportForm.get('subject')?.reset();
    this.supportForm.get('description')?.reset();
    this.supportForm.get('issue')?.reset("");
    this.myInputVariable.nativeElement.value = "";
    this.selectedFile = {};
  }

}
