import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgencyService } from 'src/app/service/agency.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { ToastService } from 'src/app/service/toast-service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.scss']
})
export class AddAgencyComponent implements OnInit {

  states:any;
  addAgencyForm:any;
  submitted = false;
  title: string;
  isEdit = false;
  submitBtnTitle:string;
  agency:any;

  constructor(private userService: UserService,
    private agencyService: AgencyService,
    private dataSharingService: DataSharingService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {

    this.loadState();
    this.addAgencyForm = this.formBuilder.group({
      agencyName: ['', Validators.required],
      agencyCode: ['', Validators.required],
      mailingAddress1: [''],
      mailingAddress2: [''],
      mailingCity: [''],
      mailSate: [''],
      mailingZip: [''],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      zip: [''],
      speedDial: [''],
      phone: [''],
      fax: [''],
      agencyText: [''],
      Website: [''],
      License: [''],
      StateAppointment: [''],
      Notes: [''],
    });

    if(this.isEdit){
    this.submitBtnTitle =  'Update Agency';
    this.title ='Update AARC Agency';
    this.addAgencyForm.controls.agencyName.patchValue(this.agency.agency_name);
    this.addAgencyForm.controls.agencyCode.patchValue(this.agency.agency_id);
    this.addAgencyForm.controls.mailingAddress1.patchValue(this.agency.agency_maddr1);
    this.addAgencyForm.controls.mailingAddress2.patchValue(this.agency.agency_maddr2);
    this.addAgencyForm.controls.mailingCity.patchValue(this.agency.agency_mcity);
    this.addAgencyForm.controls.mailSate.patchValue(this.agency.agency_mstate);
    this.addAgencyForm.controls.mailingZip.patchValue(this.agency.agency_mzip);
    this.addAgencyForm.controls.address1.patchValue(this.agency.agency_addr1);
    this.addAgencyForm.controls.address2.patchValue(this.agency.agency_addr2);
    this.addAgencyForm.controls.city.patchValue(this.agency.agency_city);
    this.addAgencyForm.controls.state.patchValue(this.agency.agency_state);
    this.addAgencyForm.controls.zip.patchValue(this.agency.agency_zip);
    this.addAgencyForm.controls.speedDial.patchValue(this.agency.agency_speed_dial);
    this.addAgencyForm.controls.phone.patchValue(this.agency.agency_phone);
    this.addAgencyForm.controls.fax.patchValue(this.agency.agency_fax);
    this.addAgencyForm.controls.agencyText.patchValue(this.agency.agency_text);
    this.addAgencyForm.controls.Website.patchValue(this.agency.agency_web);
    this.addAgencyForm.controls.License.patchValue(this.agency.agency_license);
    this.addAgencyForm.controls.StateAppointment.patchValue(this.agency.agency_state_appts);
    this.addAgencyForm.controls.Notes.patchValue(this.agency.agency_notes);
    } else {
      this.submitBtnTitle =  'Add Agency';
      this.title ='Add AARC Agency';
    }
  }

  loadState(){
    this.agencyService.getStates().subscribe((r)=>{
      this.states = r;
    })
  }

  get f() {
    return this.addAgencyForm.controls;
  }

  submit()
  {
   this.submitted = true;

   if(this.addAgencyForm.invalid){
    return;
   }
   var stateAp= '';
   debugger;
  if(this.f.StateAppointment.value instanceof Array)
  {
    this.f.StateAppointment.value.forEach((s:any) => {
      stateAp = stateAp + s + '; '
     });
     stateAp = stateAp.slice(0,-1);
  } else {
    stateAp = this.f.StateAppointment.value;
  }
   
   var postModal =
      {   AgencyID: this.f.agencyCode.value,
          AgencyName : this.f.agencyName.value,
          AgencyMAddr1 : this.f.mailingAddress1.value,
          AgencyMAddr2 : this.f.mailingAddress2.value,
          AgencyMCity : this.f.mailingCity.value,
          AgencyMState : this.f.mailSate.value,
          AgencyMZip : this.f.mailingZip.value,
          AgencyAddr1 : this.f.address1.value,
          AgencyAddr2 : this.f.address2.value,
          AgencyCity : this.f.city.value,
          AgencyState : this.f.state.value,
          AgencyZip : this.f.zip.value,
          AgencySpeedDial : this.f.speedDial.value,
          AgencyPhone : this.f.phone.value,
          AgencyFax : this.f.fax.value,
          AgencyText : this.f.agencyText.value,
          AgencyWeb : this.f.Website.value,
          AgencyEmail : '',
          AgencyNotes :this.f.Notes.value,
          AgencyLicense : this.f.License.value,
          AgencyStateAppts : stateAp,
    }
   
   if(!this.isEdit){
    this.agencyService.getIsAgencyExist(this.f.agencyCode.value).subscribe((r)=>{
      if(r == 1){
      alert(`Agency with Id ${this.f.agencyCode.value} alaready exist`);
      } else {
        this.agencyService.addAgency(postModal).subscribe((r)=>{
          this.toastService.showSuccess("Agency Saved successfully", "Agency Saved");
          this.modalService.hide();
        })
      }
     })
   } else {
    this.spinnerService.show();
     this.agencyService.updateAgency(postModal).subscribe((r:any)=>{
      this.toastService.showSuccess("Agency Updated successfully","Success");
      this.spinnerService.hide();
      this.dataSharingService.sendSelectedAgency(null);
      this.dataSharingService.sendSelectedAgency(this.agency);
      this.modalService.hide();
     })
   }
   


  }
  close(){
    this.modalService.hide();
  }

}
