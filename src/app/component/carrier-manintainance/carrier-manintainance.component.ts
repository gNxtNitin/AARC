import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgencyService } from 'src/app/service/agency.service';
import { CarrierService } from 'src/app/service/carrier.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { ToastService } from 'src/app/service/toast-service';
import { AddCarrierComponent } from '../add-carrier/add-carrier.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-carrier-manintainance',
  templateUrl: './carrier-manintainance.component.html',
  styleUrls: ['./carrier-manintainance.component.scss'],
  host: {
    class: 'col-md-8 col-sm-12 pt-2 vh-scroll',
  },
})
export class CarrierManintainanceComponent implements OnInit {
  showCarrierInfo = true;
  showContactInfo = false;
  showBusinessHours = false;
  showBranch = false;
  showCarrierType = false;
  selectedCarrier: any = {};
  carrierContact: any;
  branchesAndTypes: any;
  branches: any = [];
  types: any = [];
  agencyHours: any = [];
  agencyClosures: any = [];
  loggedInUser: any = [];
  submitted = false;
  allCarriers: any;
  addCarrierContactForm: any;
  modalRef: BsModalRef;
  isPersonalBranch = false;
  isCommercialBranch = false;
  carrierType = '';
  agencies: any;
  model_title = '';
  isEditContact = false;
  editContact_Id: any;
  newSelectedCarrier:any = '';
  constructor(
    private dataSharingService: DataSharingService,
    private agencyService: AgencyService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private spinnerService: NgxSpinnerService,
    private carrierService: CarrierService
  ) {
    this.addCarrierContactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      MiddleName: [''],
      suffix: [''],
      notes: [''],
      phoneNumber: [''],
      email: [''],
      agency: ['', Validators.required],
      oldAgency:['']
    });
  }

  ngOnInit(): void {
    var agency = this.dataSharingService.selectedAgency;
    var carrier = this.dataSharingService.selectedCarrier;

    this.dataSharingService.carrierSelected.subscribe((carrier) => {
      var agency = this.dataSharingService.selectedAgency;
      if (carrier) {
        this.selectedCarrier = carrier;
        this.load(carrier.carrier_id, agency.agency_id);
      } else {
        this.selectedCarrier = null;
      }
      this.getAgencies();
    });

    if (carrier.carrier_id) {
      this.selectedCarrier = carrier;
      this.load(carrier.carrier_id, agency.agency_id);
    }
    this.loggedInUser = this.dataSharingService.loggedInUser;
    this.dataSharingService.loggedUser.subscribe((response: any) => {
      this.loggedInUser = response;
      this.getAgencies();
    });
    this.getAgencies();
  }

  close() {
    this.modalService.hide();
    this.addCarrierContactForm.reset();
  }

  load(carrier_id: string, agency_id: string) {
    this.carrierService.getCarrierInfoById(carrier_id).subscribe((response) => {
      this.selectedCarrier = response[0];
    });

    this.loadCarrierBranch(carrier_id);

    // this.agencyService.getAgencyHours(agency_id).subscribe((response) => {
    //   this.agencyHours.push(response.find((r:any)=>r.day_of_week == 'MONDAY'))
    //   this.agencyHours.push(response.find((r:any)=>r.day_of_week == 'TUESDAY'))
    //   this.agencyHours.push(response.find((r:any)=>r.day_of_week == 'WEDNESDAY'))
    //   this.agencyHours.push(response.find((r:any)=>r.day_of_week == 'THURSDAY'))
    //   this.agencyHours.push(response.find((r:any)=>r.day_of_week == 'FRIDAY'))
    //   this.agencyHours.push(response.find((r:any)=>r.day_of_week == 'SATURDAY'))
    // });

    // this.agencyService.getAgencyClosures(agency_id).subscribe((response:any) => {
    //     this.agencyClosures = response;
    // });

    this.getCarrierContact(carrier_id, agency_id);
  }

  loadCarrierBranch(carrierId: string) {
    this.carrierService.getCarrierBranch(carrierId).subscribe((response) => {
      this.branches = [];
      this.types = [];
      this.isPersonalBranch = false;
      this.isCommercialBranch = false;
      this.branchesAndTypes = response;
      this.branchesAndTypes.forEach((branch: any) => {
        if (branch['bt_id'] == 'BP') {
          this.branches.push({ bt_id: branch['bt_id'], Name: 'Personal' });
          this.isPersonalBranch = true;
        }
        if (branch['bt_id'] == 'BC') {
          this.branches.push({ bt_id: branch['bt_id'], Name: 'Commercial' });
          this.isPersonalBranch = true;
        }
        if (branch['bt_id'] == 'TC') {
          this.types.push({ bt_id: branch['bt_id'], Name: 'Carrier' });
        }
        if (branch['bt_id'] == 'TB') {
          this.types.push({ bt_id: branch['bt_id'], Name: 'Broker' });
        }
        if (branch['bt_id'] == 'TO') {
          this.types.push({ bt_id: branch['bt_id'], Name: 'Other' });
        }
        this.carrierType = branch['bt_id'];
      });
    });
  }

  CarrierInfoClick() {
    this.showCarrierInfo = !this.showCarrierInfo;
  }

  ContactInfoClick() {
    this.showContactInfo = !this.showContactInfo;
  }

  BranchClick() {
    this.showBranch = !this.showBranch;
  }
  CarrierTypeClick() {
    this.showCarrierType = !this.showCarrierType;
  }

  BussinssHoursClick() {
    this.showBusinessHours = !this.showBusinessHours;
  }
  getCarrierContact(carrier_id: string, agencyId: string) {
    this.carrierService
      .getCarrierContact(carrier_id, agencyId)
      .subscribe((res: any) => {
        this.carrierContact = res;
      });
  }

  AddCarrierContact() {
    this.submitted = true;
    if (this.addCarrierContactForm.invalid) {
      return;
    }

    var postModal = {
      CarrierID: this.selectedCarrier.carrier_id.toString(),
      FName: this.f.firstName.value,
      LName: this.f.lastName.value,
      MName: this.f.MiddleName.value?this.f.MiddleName.value:'',
      Suffix: this.f.suffix.value?this.f.suffix.value:'',
      ArrayAgencyID: this.f.agency.value,
      Phone: this.f.phoneNumber.value?this.f.phoneNumber.value.toString():'',
      Email: this.f.email.value?this.f.email.value:'',
      Notes: this.f.notes.value?this.f.notes.value:''
    };
    this.spinnerService.show();
    this.carrierService.addCarrierContact(postModal).subscribe((r: any) => {
      this.toastService.showSuccess(
        'Contact saved successfully',
        'Saved Successfully'
      );
      this.spinnerService.hide();
      this.modalService.hide();
      this.addCarrierContactForm.reset();
      this.getCarrierContact(
        this.selectedCarrier.carrier_id,
        this.dataSharingService.selectedAgency.agency_id
      );
    });
  }
  get f() {
    return this.addCarrierContactForm.controls;
  }
  OpenModal(template: any) {
    this.model_title = 'Add Carrier Contact';
    this.isEditContact = false;
    this.modalService.show(template, { backdrop: 'static' });
  }

  AddCarrier() {
    const initialState = {
      title: 'Add AARC Carrier',
      isEdit: false
    };
    this.modalService.show(AddCarrierComponent, {initialState,backdrop: 'static'});
  }

  DeleteCarrier() {

    const initialState = {
      message: 'Are you sure want to delete the carrier?',
      title: 'Delete Carrier',
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState,
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if(result)
      {
        this.spinnerService.show();
        this.carrierService
          .archiveCarrier(this.selectedCarrier.carrier_id)
          .subscribe((r: any) => {
            this.spinnerService.hide();
            this.toastService.showSuccess(
              'Carrier Deleted Successfully.',
              'Success'
            );
            window.location.reload();
          });    
      }})
  }
  BranchChange(event: any, branch: any) {
    const initialState = {
      message: 'Are you sure want to change the branch?',
      title: 'Delete Branch',
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState,
    });
    if (!event.target.checked) {
      this.modalRef.content.onClose.subscribe((result: boolean) => {
        if (result) {
          this.spinnerService.show();
          this.carrierService
            .deleteCarrierBranch(this.selectedCarrier.carrier_id, branch)
            .subscribe((r) => {
              this.toastService.showSuccess(
                'Brach updated successfully',
                'Success'
              );
              this.spinnerService.hide();
              this.loadCarrierBranch(this.selectedCarrier.carrier_id);
            });
        }
      });
    } else {
      this.modalRef.content.onClose.subscribe((result: boolean) => {
        if (result) {
          this.carrierService
            .addCarrierBranch(this.selectedCarrier.carrier_id, branch)
            .subscribe((r) => {
              this.toastService.showSuccess(
                'Brach updated successfully',
                'Success'
              );
              this.spinnerService.hide();
              this.loadCarrierBranch(this.selectedCarrier.carrier_id);
            });
        }
      });
    }
  }

  CarrierTypeChange(event: any) {
    const initialState = {
      message: 'Are you sure want to change the branch?',
      title: 'Delete Branch',
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState,
    });

    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.spinnerService.show();
        this.carrierService
          .updateCarrierType(this.selectedCarrier.carrier_id, this.carrierType)
          .subscribe((r) => {
            this.spinnerService.hide();
          });
      }
    });
  }

  getAgencies() {
    this.agencyService
      .getAgenciesByUser(this.loggedInUser['UserID'])
      .subscribe((r: any) => {
        this.agencies = r;
        this.agencies.unshift({
          agency_id: 'ALL AGENCIES',
          agency_name: 'ALL AGENCIES',
        });
      });
  }

  OpenContactEdit(contact: any, template: any) {
    this.modalService.show(template);
    console.log(contact);
    this.addCarrierContactForm;

    this.model_title = 'Update Carrier Contact';
    this.isEditContact = true;
    this.editContact_Id = contact.contact_id;
    this.f.firstName.setValue(contact.contact_first_name);
    this.f.lastName.setValue(contact.contact_last_name);
    this.f.MiddleName.setValue(contact.contact_middle_name);
    this.f.suffix.setValue(contact.contact_suffix);
    this.f.notes.setValue(contact.contact_notes);
    this.f.phoneNumber.setValue(contact.contact_phone);
    this.f.email.setValue(contact.contact_email);
    var agency = [];
    agency.push(contact.agency_id);
    this.f.agency.setValue(agency);
    this.f.oldAgency.setValue(contact.agency_id);
    this.modalService.show(template, { backdrop: 'static' });
  }
  EditCarrierContact() {
    var similarId = this.editContact_Id.toString();
    // this.carrierContact.forEach((contact: any) => {
    //   similarId = similarId + contact.contact_id + '; ';
    // });
    // similarId = similarId.slice(0, -1);
    // similarId = similarId.slice(0, -1); contact_notes


    var postModal = {
      CarrierID: this.selectedCarrier.carrier_id.toString(),
      FName: this.f.firstName.value,
      LName: this.f.lastName.value,
      MName: this.f.MiddleName.value,
      Suffix: this.f.suffix.value,
      ArrayAgencyID: this.f.agency.value,
      Phone: this.f.phoneNumber?this.f.phoneNumber.value.toString():'',
      Email: this.f.email.value,
      Notes: this.f.notes.value,
      SimilarIDs: similarId,
      ContactID: this.editContact_Id.toString(),
      AgencyId: this.f.oldAgency.value
    };
    this.spinnerService.show();
    this.carrierService.updateCarrierContact(postModal).subscribe((r:any) => {
      this.toastService.showSuccess(
        'Contact Saved Successfully',
        'Contact Saved'
      );
      this.spinnerService.hide();
      this.addCarrierContactForm.reset();
      this.getCarrierContact(
        this.selectedCarrier.carrier_id,
        this.dataSharingService.selectedAgency.agency_id
      );
      this.modalService.hide();
    });
  }

  DeleteContact(contact:any){

    const initialState = {
      message: 'Are you sure want to delete the contact?',
      title: 'Delete Contact',
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState,
    });

    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if(result)
      {
        this.carrierService.deleteCarrierContact(this.selectedCarrier.carrier_id, contact.contact_id,true).subscribe((r)=>{
          this.toastService.showSuccess(
            'Contact deleted Successfully',
            'Contact Delted'
          );
          
          this.getCarrierContact(
            this.selectedCarrier.carrier_id,
            this.dataSharingService.selectedAgency.agency_id
          );
        }) 
      }
    })
  }
  EditCarrier(carrier:any){
    const initialState = {
      title: 'Update AARC Carrier',
      isEdit: true,
      carrier:carrier
    };
    this.modalService.show(AddCarrierComponent, {initialState,backdrop: 'static'
    });
  }

  SelectCarrier(template:any){
    this.agencyService.getAllCarrier().subscribe((res) => {
      this.allCarriers = res;
    });
    this.modalService.show(template, { backdrop: 'static' });
  }

  ChangeCarrier()
  {
    this.dataSharingService.sendSelectedCarrier(this.newSelectedCarrier);
    this.newSelectedCarrier = '';
    this.close();
  }
}
