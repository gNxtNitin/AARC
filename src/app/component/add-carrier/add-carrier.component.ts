import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgencyService } from 'src/app/service/agency.service';
import { CarrierService } from 'src/app/service/carrier.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { ToastService } from 'src/app/service/toast-service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-carrier',
  templateUrl: './add-carrier.component.html',
  styleUrls: ['./add-carrier.component.scss'],
})
export class AddCarrierComponent implements OnInit {
  addCarrierForm: any;
  submitted = false;
  title: string;
  isEdit = false;
  carrier:any;
  submitBtnTitle:string;
  constructor(
    private userService: UserService,
    private agencyService: AgencyService,
    private dataSharingService: DataSharingService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private spinnerService: NgxSpinnerService,
    private carrierService: CarrierService
  ) {}

  ngOnInit(): void {
    this.addCarrierForm = this.formBuilder.group({
      carrierName: ['', Validators.required],
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
      email: [''],
      Website: [''],
      StateAppointment: [''],
      Notes: [''],
    });
    if(this.isEdit){
    this.submitBtnTitle =  'Edit Carrier';
    console.log(this.carrier);
    this.addCarrierForm.controls.carrierName.patchValue(this.carrier.carrier_name);
    this.addCarrierForm.controls.mailingAddress1.patchValue(this.carrier.carrier_maddr1);
    this.addCarrierForm.controls.mailingAddress2.patchValue(this.carrier.carrier_maddr2);
    this.addCarrierForm.controls.mailingCity.patchValue(this.carrier.carrier_mcity);
    this.addCarrierForm.controls.mailSate.patchValue(this.carrier.carrier_mstate);
    this.addCarrierForm.controls.mailingZip.patchValue(this.carrier.carrier_mzip);
    this.addCarrierForm.controls.address1.patchValue(this.carrier.carrier_addr1);
    this.addCarrierForm.controls.address2.patchValue(this.carrier.carrier_addr2);
    this.addCarrierForm.controls.city.patchValue(this.carrier.carrier_city);
    this.addCarrierForm.controls.state.patchValue(this.carrier.carrier_state);
    this.addCarrierForm.controls.zip.patchValue(this.carrier.carrier_zip);
    this.addCarrierForm.controls.speedDial.patchValue(this.carrier.carrier_speed_dial);
    this.addCarrierForm.controls.phone.patchValue(this.carrier.carrier_phone);
    this.addCarrierForm.controls.fax.patchValue(this.carrier.carrier_fax);
    this.addCarrierForm.controls.email.patchValue(this.carrier.carrier_email);
    this.addCarrierForm.controls.Website.patchValue(this.carrier.carrier_web);
    //this.addCarrierForm.controls.StateAppointment.patchValue(this.carrier.carrier_name);
    this.addCarrierForm.controls.Notes.patchValue(this.carrier.carrier_notes);
    }
    else{
      this.submitBtnTitle ='Add Carrier';
    }
  }

  get f() {
    return this.addCarrierForm.controls;
  }

  close() {
    this.modalService.hide();
  }
  submit() {
    this.submitted = true;

    if (this.addCarrierForm.invalid) {
      return;
    }

    var carrierId = 0;
    if(this.isEdit){
      carrierId = this.carrier.carrier_id;
    } 
   
    var postModal = {
      CarrierID: carrierId,
      CarrierName: this.f.carrierName.value,
      CarrierMAddr1: this.f.mailingAddress1.value,
      CarrierMAddr2: this.f.mailingAddress2.value,
      CarrierMCity: this.f.mailingCity.value,
      CarrierMState: this.f.mailSate.value,
      CarrierMZip: this.f.mailingZip.value,
      CarrierAddr1: this.f.address1.value,
      CarrierAddr2: this.f.address2.value,
      CarrierCity: this.f.city.value,
      CarrierState: this.f.state.value,
      CarrierZip: this.f.zip.value,
      CarrierSpeedDial: this.f.speedDial.value,
      CarrierPhone: this.f.phone.value,
      CarrierFax: this.f.fax.value,
      CarrierWeb: this.f.Website.value,
      CarrierEmail: this.f.email.value,
      CarrierNotes: this.f.Notes.value,
    };

    this.spinnerService.show();
    if(this.isEdit){
      this.carrierService.updateCarrier(postModal).subscribe((r)=>{
        this.carrierService.addAllBranch(r).subscribe((r2:any)=>{
        this.toastService.showSuccess("Carrier saved successfully", "Success");
        this.spinnerService.hide();
        this.modalService.hide();
        this.dataSharingService.sendSelectedCarrier(null);
        this.dataSharingService.sendSelectedCarrier(this.carrier);
        })
      })
     
    }else 
    {
      this.carrierService.addCarrier(postModal).subscribe((r)=>{
        this.carrierService.addAllBranch(r).subscribe((r2:any)=>{
        this.toastService.showSuccess("Carrier added successfully", "Success");
        this.spinnerService.hide();
        this.modalService.hide();
        
        })
      })
    }
    
   
  }
}
