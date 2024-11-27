import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgencyService } from 'src/app/service/agency.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { ToastService } from 'src/app/service/toast-service';

@Component({
  selector: 'app-aarc-links',
  templateUrl: './aarc-links.component.html',
  styleUrls: ['./aarc-links.component.scss'],
  host: {
    class: 'col-md-8 col-sm-12 pt-2 vh-scroll',
  }
})
export class AarcLinksComponent implements OnInit {

  showPhone = false;
  loggedInUser:any={};
  modalRef: BsModalRef = {
    hide: function (): void {
      throw new Error('Function not implemented.');
    },
    setClass: function (newClass: string): void {
      throw new Error('Function not implemented.');
    },
  };
  addPhoneForm:any;
  addEmailForm:any;
  showEmail = false;
  addEmailSubmitted = false;
  addPhoneSubmitted = false;

  addWebForm:any;
  showWeb = false;
  addWebSubmitted = false;

  
  addPropertyForm:any;
  showProperty = false;
  addPropertySubmitted = false;
  phoneLinks:any;
  propertyLinks:any;
  emailLinks:any;
  webLinks:any;


  constructor(private dataSharingService: DataSharingService,
    private modalService: BsModalService,
    private agencyService: AgencyService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,)
   {
      this.addPhoneForm = this.formBuilder.group({
        display: ['', Validators.required],
        phoneNumber: ['', [Validators.required]],
        isAll : [false]
      });

      this.addEmailForm = this.formBuilder.group({
        display: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        isAll : [false]
      });

      this.addWebForm = this.formBuilder.group({
        display: ['', Validators.required],
        Web: ['', [Validators.required]],
        isAll : [false]
      });

      this.addPropertyForm = this.formBuilder.group({
        display: ['', Validators.required],
        property: ['', [Validators.required]],
        isAll : [false]
      });
    }
  
  ngOnInit(): void {
    this.loggedInUser = this.dataSharingService.loggedInUser;
    if(this.loggedInUser)
    {
      this.loadLinks();
    }
    this.dataSharingService.loggedUser.subscribe((response:any) => {
      this.loggedInUser = response;
      this.agencyService.getLinks(this.loggedInUser.UserID).subscribe((r)=>{
        this.loadLinks();
      })
    })    
  }

  loadLinks()
  {
    this.agencyService.getLinks(this.loggedInUser.UserID).subscribe((r)=>{
      this.phoneLinks = r.filter((a:any)=>a.linktype == 'P');
      this.emailLinks = r.filter((a:any)=>a.linktype == 'E');
      this.webLinks = r.filter((a:any)=>a.linktype == 'W');
      this.propertyLinks = r.filter((a:any)=>a.linktype == 'R');
    })
  }
  PhoneClick() {
    this.showPhone = !this.showPhone;
  }
  OpenAddPhone(template:any)
  {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }
  submitAddPhone()
  {
    if(this.addPhoneForm.invalid){
      this.addPhoneSubmitted = true;
      return;
    }
    var postModal = 
    {
      UserID: this.addPhoneForm.isAll?"ALL": this.loggedInUser.UserID,
      Type: "P",
      Display: this.addPhoneForm.controls.display.value,
      Linx: this.addPhoneForm.controls.phoneNumber.value
    }
   this.addLink(postModal);
  }
  addLink(postModal:any)
  {
    this.agencyService.addLinks(postModal).subscribe((r)=>{
      if(r==0){
        this.toastService.showError("Please validate the record","Error");
      } else{
        this.loadLinks();
      }  
      this.modalRef.hide();   
    }, error =>{
      this.toastService.showError("Please validate the record","Error");
      this.modalRef.hide();
    })
  }
  EmailClick() {
    this.showEmail = !this.showEmail;
  }
  OpenAddEmail(template:any)
  {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }
  submitAddEmail()
  {
    var postModal = 
    {
      UserID: this.addEmailForm.isAll?"ALL": this.loggedInUser.UserID,
      Type: "E",
      Display: this.addEmailForm.controls.display.value,
      Linx: this.addEmailForm.controls.email.value
    }
   this.addLink(postModal);
  }

  WebClick() {
    this.showWeb = !this.showWeb;
  }
  OpenAddWeb(template:any)
  {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }
  submitAddWeb()
  {
    var postModal = 
    {
      UserID: this.addWebForm.isAll?"ALL": this.loggedInUser.UserID,
      Type: "W",
      Display: this.addWebForm.controls.display.value,
      Linx: this.addWebForm.controls.Web.value
    }
    this.addLink(postModal);
  }

  PropertyClick() {
    this.showProperty = !this.showProperty;
  }
  OpenAddProperty(template:any)
  {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }
  submitAddProperty()
  {
    var postModal = 
    {
      UserID: this.addPropertyForm.isAll?"ALL": this.loggedInUser.UserID,
      Type: "R",
      Display: this.addPropertyForm.controls.display.value,
      Linx: this.addPropertyForm.controls.property.value
    }
    this.addLink(postModal);
  }
  DeleteLink(link:any)
  {
    var postModal = 
    {
      UserID: link.user_id,
      Type: link.linktype,
      Display: link.display,
      Linx: link.linx
    }
    console.log(postModal);
    this.agencyService.deleteLinks(postModal).subscribe((r)=>{
      this.toastService.showSuccess("Link deleted successfully","Success");
      this.loadLinks();
    })
  }
}
