import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgencyService } from 'src/app/service/agency.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { ProucerCodeService } from 'src/app/service/proucer-code.service';
import { TeamService } from 'src/app/service/team.service';
import { ToastService } from 'src/app/service/toast-service';
import { UserService } from 'src/app/service/user.service';
import { AddAgencyComponent } from '../add-agency/add-agency.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-agency-info',
  templateUrl: './agency-info.component.html',
  styleUrls: ['./agency-info.component.scss'],
  host: {
    class: 'col-md-8 col-sm-12 pt-2',
  },
})
export class AgencyInfoComponent implements OnInit {
  showAgencyInfo = false;
  showContactInfo = false;
  showBusinessHours = false;
  showCarrier = false;
  showOfficeClosures = false;
  selectedAgency: any = {};
  agencyContact: any;
  carriers: any;
  agencyHours: any = [];
  agencyClosures: any = [];
  loggedInUser: any = [];
  submitted = false;
  addAgenctyContactForm: any;
  modalRef: BsModalRef;
  model_title = '';
  isEditContact = false;
  isAddContact = false;
  editContactId = '';
  allCarriers: any;
  selectedCarrier = '';
  time = { hour: 14, minute: 30 };
  spinner = false;
  holidayDate: any;
  holidayReason: any;
  producerCodeList: any = [];
  teams: any = [];
  granteduser: any = [];
  allUsers: any = [];
  deniedUser: any = [];
  prodCodeTitle = '';
  viewPcTitle = '';
  addProducerCodeForm: any = {};
  pcModalRef:any;
  pcBtnLable = '';
  isProducerCodeSubmit = false;
  grantSelectAll = false;
  denySelectAll = false;
  viewedCarrier:any = {};
  timeZone = '';
  timeZoneList=[];

  constructor(
    private dataSharingService: DataSharingService,
    private agencyService: AgencyService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private spinnerService: NgxSpinnerService,
    private producerCodeService: ProucerCodeService,
    private userService: UserService,
    private teamService: TeamService
  ) {
    this.addProducerCodeForm = this.formBuilder.group({
      producerCode: ['', Validators.required],
      branchPersonal: [''],
      branchCommercial: [''],
      branchAdmin: [''],
      userName: ['', Validators.required],
      pwd: ['', Validators.required],
      team: [''],
      carrierId: [''],
      oldpc:[''],
      oldBranch:['']
    });

    this.addAgenctyContactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      MiddleName: [''],
      suffix: [''],
      notes: [''],
      phoneNumber: [
        ''],
      email: [
        '',
        [
          Validators.email,
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.dataSharingService.agencySelected.subscribe((agency) => {
      if (agency) {
        this.load(agency.agency_id);
      } else {
        this.selectedAgency = null;
      }
    });

    var agency = this.dataSharingService.selectedAgency;
    if (agency.agency_id) {
      this.load(agency.agency_id);
    }

    this.loggedInUser = this.dataSharingService.loggedInUser;
    this.dataSharingService.loggedUser.subscribe((response: any) => {
      this.loggedInUser = response;
    });
    this.getTimeZone();
   
  }

  close() {
    this.isAddContact = false;
    this.isEditContact = false;
    this.modalService.hide();
  }

  load(agency_id: string) {
    this.timeZone='';
    this.agencyService.getAgencyById(agency_id).subscribe((response) => {
      this.selectedAgency = response[0];
    });

    this.agencyService.getCarrierByAgency(agency_id).subscribe((response) => {
      this.carriers = response;
    });
    this.agencyHours = [];
    this.agencyService.getAgencyHours(agency_id).subscribe((response) => {
     if(response != null)
     {
      this.agencyHours.push({
        ...response.find((r: any) => r.day_of_week == 'MONDAY'),
        openTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'MONDAY'),
          'open'
        ),
        closeTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'MONDAY'),
          'close'
        ),
      });
      this.agencyHours.push({
        ...response.find((r: any) => r.day_of_week == 'TUESDAY'),
        openTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'TUESDAY'),
          'open'
        ),
        closeTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'TUESDAY'),
          'close'
        ),
      });
      this.agencyHours.push({
        ...response.find((r: any) => r.day_of_week == 'WEDNESDAY'),
        openTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'WEDNESDAY'),
          'open'
        ),
        closeTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'WEDNESDAY'),
          'close'
        ),
      });
      this.agencyHours.push({
        ...response.find((r: any) => r.day_of_week == 'THURSDAY'),
        openTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'THURSDAY'),
          'open'
        ),
        closeTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'THURSDAY'),
          'close'
        ),
      });
      this.agencyHours.push({
        ...response.find((r: any) => r.day_of_week == 'FRIDAY'),
        openTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'FRIDAY'),
          'open'
        ),
        closeTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'FRIDAY'),
          'close'
        ),
      });
      this.agencyHours.push({
        ...response.find((r: any) => r.day_of_week == 'SATURDAY'),
        openTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'SATURDAY'),
          'open'
        ),
        closeTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'SATURDAY'),
          'close'
        ),
      });
      this.agencyHours.push({
        ...response.find((r: any) => r.day_of_week == 'SUNDAY'),
        openTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'SUNDAY'),
          'open'
        ),
        closeTime: this.convertToTimer(
          response.find((r: any) => r.day_of_week == 'SUNDAY'),
          'close'
        ),
      });

      this.agencyHours.forEach((hour: any) => {
        if (hour.biz_hrs == 'CLOSED') {
          hour['IsClosed'] = true;
        } else {
          hour['IsClosed'] = false;
        }
      });
     }else {
      this.agencyHours.push({day_of_week:'MONDAY',biz_hrs:'Not Available', 
      closeTime:{hour: 0, minute: 0, second: 0}, openTime:{hour: 0, minute: 0, second: 0}
    });
      this.agencyHours.push({day_of_week:'TUESDAY',biz_hrs:'Not Available', 
      closeTime:{hour: 0, minute: 0, second: 0}, openTime:{hour: 0, minute: 0, second: 0}
    });
      this.agencyHours.push({day_of_week:'WEDNESDAY',biz_hrs:'Not Available', 
      closeTime:{hour: 0, minute: 0, second: 0}, openTime:{hour: 0, minute: 0, second: 0}
    });
    this.agencyHours.push({day_of_week:'THURSDAY',biz_hrs:'Not Available', 
    closeTime:{hour: 0, minute: 0, second: 0}, openTime:{hour: 0, minute: 0, second: 0}
    });
      this.agencyHours.push({day_of_week:'FRIDAY',biz_hrs:'Not Available', 
      closeTime:{hour: 0, minute: 0, second: 0}, openTime:{hour: 0, minute: 0, second: 0}
    });
      this.agencyHours.push({day_of_week:'SATURDAY',biz_hrs:'Not Available', 
      closeTime:{hour: 0, minute: 0, second: 0}, openTime:{hour: 0, minute: 0, second: 0}
    });
      this.agencyHours.push({day_of_week:'SUNDAY',biz_hrs:'Not Available', 
      closeTime:{hour: 0, minute: 0, second: 0}, openTime:{hour: 0, minute: 0, second: 0}
    });
    }
  });

    this.agencyService
      .getAgencyClosures(agency_id)
      .subscribe((response: any) => {
        this.agencyClosures = response;
      });

    this.getAgencyContacts(agency_id);

    this.agencyService.getTimeZoneByCode(agency_id).subscribe((r)=>{
      this.timeZone = r[0].TimeZoneCode;
    });
  }

  AgencyInfoClick() {
    this.showAgencyInfo = !this.showAgencyInfo;
  }

  ContactInfoClick() {
    this.showContactInfo = !this.showContactInfo;
  }

  CarrierClick() {
    this.showCarrier = !this.showCarrier;
  }
  OfficeClosuresClick() {
    this.showOfficeClosures = !this.showOfficeClosures;
  }

  BussinssHoursClick() {
    this.showBusinessHours = !this.showBusinessHours;
  }
  getAgencyContacts(agency_id: string) {
    this.agencyService.getAgencyContacts(agency_id).subscribe((res: any) => {
      this.agencyContact = res;
    });
  }

  AddAgency()
  {
    const initialState = {
      title: 'Add AARC Agency',
      isEdit: false,
    };
    this.modalService.show(AddAgencyComponent, {initialState,backdrop: 'static'});
  }

  AddAgencyContact() {
    this.submitted = true;
    if (this.addAgenctyContactForm.invalid) {
      return;
    }
    var contact = {
      AgencyID: this.selectedAgency.agency_id,
      FName: this.f.firstName.value,
      LName: this.f.lastName.value,
      MName: this.f.MiddleName.value,
      Suffix: this.f.suffix.value,
      Phone: this.f.phoneNumber.value.toString(),
      Email: this.f.email.value,
      Notes: this.f.notes.value,
    };
    this.spinnerService.show();
    this.agencyService.addAgencyContact(contact).subscribe((res: any) => {
      this.getAgencyContacts(this.selectedAgency.agency_id);
      this.spinnerService.hide();
    });

    this.close();
  }
  get f() {
    return this.addAgenctyContactForm.controls;
  }
  OpenAddContact(template: any) {
    this.isAddContact = true;
    this.model_title = 'Add Agency Contact';
    this.modalService.show(template, { backdrop: 'static' });
  }
  Delete(contact: any) {
    const initialState = {
      message: 'Are you sure want to delete the User?',
      title: 'Delete Contact',
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState,
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.spinnerService.show();
        this.agencyService
          .deleteAgencyContact(contact.contact_agency_id, contact.contact_id)
          .subscribe((res) => {
            this.spinnerService.hide();
            this.getAgencyContacts(this.selectedAgency.agency_id);
          });
      }
    });
  }
  UpdateAgencyContactOrder(contact: any, isUp: any) {
    this.agencyService
      .UpdateAgencyContatOrder(
        contact.contact_agency_id,
        contact.contact_id,
        isUp
      )
      .subscribe((r) => {
        this.getAgencyContacts(this.selectedAgency.agency_id);
      });
  }
  OpenEdit(contact: any, template: any) {
    this.model_title = 'Update Agency Contact';
    this.isEditContact = true;
    this.editContactId = contact.contact_id;
    this.f.firstName.setValue(contact.contact_first_name);
    this.f.lastName.setValue(contact.contact_last_name);
    this.f.MiddleName.setValue(contact.contact_middle_name);
    this.f.suffix.setValue(contact.contact_suffix);
    this.f.notes.setValue(contact.contact_notes);
    this.f.phoneNumber.setValue(contact.contact_phone);
    this.f.email.setValue(contact.contact_email);
    this.modalService.show(template, { backdrop: 'static' });
  }
  EditAgencyContact() {
    this.submitted = true;
    if (this.addAgenctyContactForm.invalid) {
      return;
    }
    var contact = {
      AgencyID: this.selectedAgency.agency_id,
      FName: this.f.firstName.value,
      LName: this.f.lastName.value,
      MName: this.f.MiddleName.value,
      Suffix: this.f.suffix.value,
      Phone: this.f.phoneNumber.value.toString(),
      Email: this.f.email.value,
      Notes: this.f.notes.value,
    };
    this.spinnerService.show();
    this.agencyService
      .editAgencyContact(contact, this.editContactId)
      .subscribe((res: any) => {
        this.getAgencyContacts(this.selectedAgency.agency_id);
        this.spinnerService.hide();
      });

    this.close();
  }
  DeleteCarrier(carrier: any) {
    const initialState = {
      title: 'Delete Carrier',
      message: ' Are you sure want to delete the Agency Carrier?',
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState,
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.spinnerService.show();
        this.agencyService
          .deleteAgencyCarrier(
            carrier.carrier_id,
            this.selectedAgency.agency_id
          )
          .subscribe((res) => {
            this.agencyService
              .getCarrierByAgency(this.selectedAgency.agency_id)
              .subscribe((response) => {
                this.carriers = response;
              });
            this.spinnerService.hide();
            
          });
      }
    });
  }
  OpenAddCarrier(template: any) {
    this.agencyService.getAllCarrier().subscribe((res) => {
      this.allCarriers = res;
    });
    this.modalService.show(template, { backdrop: 'static' });
  }
  AddCarrier() {
    var carrier = this.allCarriers.find(
      (c: any) => c.carrier_id == this.selectedCarrier
    );
    var modal = {
      AgencyID: this.selectedAgency.agency_id,
      CarrierID: carrier.carrier_id,
      ProducerCode: '',
    };
    this.spinnerService.show();
    this.agencyService.addAgencyCarrier(modal).subscribe((res: any) => {
      this.agencyService
        .getCarrierByAgency(this.selectedAgency.agency_id)
        .subscribe((response) => {
          this.carriers = response;
        });
      this.spinnerService.hide();
    });
    this.modalService.hide();
  }
  OpenAddBusinessHour(template: any) {
    this.modalService.show(template, { backdrop: 'static', class: 'modal-lg' });
  }
  convertToTimer(day: any, type: any) {
    var timefromserver = day.biz_hrs;
    day['IsClosed'] = false;
    if (timefromserver != 'CLOSED') {
      var time = timefromserver.split('-');
      var openTime = time[0];
      var closeTime = time[1];

      if (type == 'open') {
        return this.convertTo24(openTime);
      } else {
        return this.convertTo24(closeTime);
      }
    } else {
      day['IsClosed'] = true;
    }
    var time: any;
    time = {
      hour: 0,
      minute: 0,
      second: 0,
    };
    return time;
  }

  convertTo24(timeIn: any) {
    var breaktime = timeIn.split(':');
    var hour = parseInt(breaktime[0]);
    var minZone = breaktime[1].split(' ');
    var minute = parseInt(minZone[0]);
    if (minZone[1] == 'PM') {
      hour = hour + 12;
    }
    if (hour == 24 && minZone[1] == 'AM') {
      hour = 0;
    }
    if (hour == 24 && minZone[1] == 'PM') {
      hour = 12;
    }
    if (hour == 12 && minZone[1] == 'AM') {
      hour = 0;
    }

    var time = {
      hour: hour,
      minute: minute,
      second: 0,
    };
    return time;
  }

  UpdateHours() {
    this.agencyHours.forEach((day: any) => {
      this.convetToText(day);
      if (day.IsClosed) {
        day.biz_hrs = 'CLOSED';
      }
    });

    var postModal = {
      AgencyID: this.selectedAgency.agency_id,
      AgencyMonHrs: this.agencyHours.find((r: any) => r.day_of_week == 'MONDAY')
        .biz_hrs,
      AgencyTueHrs: this.agencyHours.find(
        (r: any) => r.day_of_week == 'TUESDAY'
      ).biz_hrs,
      AgencyWedHrs: this.agencyHours.find(
        (r: any) => r.day_of_week == 'WEDNESDAY'
      ).biz_hrs,
      AgencyThuHrs: this.agencyHours.find(
        (r: any) => r.day_of_week == 'THURSDAY'
      ).biz_hrs,
      AgencyFriHrs: this.agencyHours.find((r: any) => r.day_of_week == 'FRIDAY')
        .biz_hrs,
      AgencySatHrs: this.agencyHours.find(
        (r: any) => r.day_of_week == 'SATURDAY'
      ).biz_hrs,
      AgencySunHrs: this.agencyHours.find((r: any) => r.day_of_week == 'SUNDAY')
        .biz_hrs,
    };

    this.spinnerService.show();
    this.agencyService.updateAgencyHours(postModal).subscribe((res) => {
      this.modalService.hide();
      this.spinnerService.hide();
    });

    this.agencyService.updateTimeZone({timeZone: this.timeZone, id: this.selectedAgency.agency_id}).subscribe();
  }
  convetToText(day: any) {
    var openTime = this.convetHour(day.openTime);
    var closeTime = this.convetHour(day.closeTime);
    day.biz_hrs = openTime + ' - ' + closeTime;
  }
  convetHour(time: any) {
    var timeInText = '';
    if (time['hour'] < 12) {
      timeInText =
        time['hour'] +
        ':' +
        (time['minute'] < 10 ? '0' + time['minute'] : time['minute']) +
        ' AM';
    }
    if (time['hour'] > 12) {
      timeInText =
        time['hour'] -
        12 +
        ':' +
        (time['minute'] < 10 ? '0' + time['minute'] : time['minute']) +
        ' PM';
    }
    if(time['hour'] == 0)
    {
      timeInText =
      12 +
      ':' +
      (time['minute'] < 10 ? '0' + time['minute'] : time['minute']) +
      ' AM';
    }
    if(time['hour'] == 12)
    {
      timeInText =
      12 +
      ':' +
      (time['minute'] < 10 ? '0' + time['minute'] : time['minute']) +
      ' PM';
    }
    return timeInText;
  }

  openAddHoliday(template: any) {
    this.pcModalRef =  this.modalService.show(template);
  }
  AddHoliday() {
    var dateValue = this.holidayDate['month'] + '-' + this.holidayDate['day'] + '-' + this.holidayDate['year'];
    var postModal = {
      AgencyID: this.selectedAgency.agency_id,
      ClosureDate: dateValue,
      ClosureReason: this.holidayReason,
    };
    this.spinnerService.show();
    this.agencyService.addAgencyClosures(postModal).subscribe((r) => {
      this.agencyService
        .getAgencyClosures(this.selectedAgency.agency_id)
        .subscribe((response: any) => {
          this.agencyClosures = response;
        });
      this.spinnerService.hide();
      this.pcModalRef.hide();
    });
  }

  DeleteHoliday(holiday:any){
    const initialState = {
      message: 'Are you sure want to delete the Holiday?',
      title: 'Delete Holiday',
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState,
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if(result)
      {
        var deleteModal = {
          AgencyID: holiday.agency_id,
          ClosureDate:holiday.hol_date,
          ClosureReason:holiday.hol_reason,
        }
        this.spinnerService.show();
        this.agencyService.deleteAgencyClosures(deleteModal).subscribe((r)=>{
          this.agencyService
          .getAgencyClosures(this.selectedAgency.agency_id)
          .subscribe((response: any) => {
            this.agencyClosures = response;
          });
          this.spinnerService.hide();
        })  
      }
    })
  }

  ViewPC(template: any, carrier: any) {
    this.viewedCarrier = carrier;
    this.viewPcTitle =
      'View Producer Code for: ' +
      this.selectedAgency.agency_id +
      ' ' +
      carrier.carrier_name;
    this.prodCodeTitle =
      'Add AARC Producer Code for : ' +
      this.selectedAgency.agency_id +
      ' ' +
      carrier.carrier_name;
    this.producerCodeService
      .getAgenciesCarrierProducerCode(
        this.selectedAgency.agency_id,
        carrier.carrier_id
      )
      .subscribe((r: any) => {
        if (r != null) {
          this.producerCodeList = r;
          this.producerCodeList.forEach((pc: any) => {
            if (pc.branch == 'A') {
              pc['brnachName'] = 'Admin';
            } else if (pc.branch == 'P') {
              pc['brnachName'] = 'Personal';
            } else if (pc.branch == 'B') {
              pc['brnachName'] = 'Both';
            } else {
              pc['brnachName'] = 'Commercial';
            }
          });
          this.modalService.show(template, { backdrop: 'static' });
        } else {
          this.modalService.show(template, { backdrop: 'static' });
          //this.toastService.showInfo('PC not exist for this carrier', 'Info');
          this.producerCodeList = null;
        }
      });
  }

  DeletePC(pc: any) {
    var detail = {
      AgencyID: pc.agency_id,
      CarrierID:  pc.carrier_id,
      ProducerCode:  pc.producer_code,
      PCBranch: pc.branch
    }
    this.spinnerService.show();
    this.producerCodeService.deleteProducerCode(detail).subscribe((r:any)=>{
      this.spinnerService.hide();
      this.producerCodeService
      .getAgenciesCarrierProducerCode(
       this.selectedAgency.agency_id,
       pc.carrier_id
     )
     .subscribe((r: any) => {
       if (r != null) {
         this.producerCodeList = r;
         this.producerCodeList.forEach((pc: any) => {
           if (pc.branch == 'A') {
             pc['brnachName'] = 'Admin';
           } else if (pc.branch == 'P') {
             pc['brnachName'] = 'Personal';
           } else if (pc.branch == 'B') {
             pc['brnachName'] = 'Both';
           } else {
             pc['brnachName'] = 'Commercial';
           }
         });
        }
        else {
          this.producerCodeList = null;
        }
      });
    })
   
  }
 
  EditPC(template: any, pc: any, isAdd:Boolean) {
    if(isAdd){
      this.pcBtnLable = 'Add Producer Code' ;
      this.addProducerCodeForm.reset();
      this.addProducerCodeForm.patchValue({
        team: 0,
        carrierId: this.viewedCarrier.carrier_id
      });
      this.userService.getAllUsers().subscribe((r2) => {
        this.allUsers = r2;
        this.allUsers.forEach((user: any) => {
          this.deniedUser = this.allUsers;
      });
      });
    }else{
      this.pcBtnLable = 'Update Producer Code' ;
      this.producerCodeService
        .getAllProducerCodeDetails(
          pc.agency_id,
          pc.carrier_id,
          pc.producer_code,
          pc.branch
        )
        .subscribe((r:any) => {
          var isPersonal = false;
          var isAdmin = false;
          var isCommercial = false;
  
          if (r[0].branch == 'A') {
            isAdmin = true;
          } else if (r[0].branch == 'P') {
            isPersonal = true;
          } else if (r[0].branch == 'B') {
            isPersonal = true;
            isCommercial = true;
          } else {
            isCommercial = true;
          }
          this.addProducerCodeForm.patchValue({
            producerCode: r[0].producer_code,
            branchPersonal: isPersonal,
            branchCommercial: isCommercial,
            branchAdmin: isAdmin,
            userName: r[0].uid,
            pwd: r[0].pwd,
            team: 0,
            carrierId: pc.carrier_id,
            oldBranch: r[0].branch,
            oldpc: r[0].producer_code
          });
        });
  
      this.producerCodeService
        .getAllProducerCodeGrantedUsers(
          pc.agency_id,
          pc.carrier_id,
          pc.branch,
          pc.producer_code
        )
        .subscribe((r:any) => {
          if(r!=null){
            this.granteduser = r;
          }
         
          this.userService.getAllUsers().subscribe((r2) => {
            this.allUsers = r2;
            this.allUsers.forEach((user: any) => {
              if (this.granteduser) {
                var val = this.granteduser.find(
                  (u: any) => u.userid === user.userid
                );
                if (!val) {
                  this.deniedUser.push(user);
                }
              }else {
                this.deniedUser = this.allUsers;
              }
            });
          });
        });
    }
    this.producerCodeService.getAllTeams().subscribe((r:any) => {
      this.teams = r;
    });
    this.pcModalRef = this.modalService.show(template);
  }

  getDenieduser() {
    this.deniedUser = [];
    var teamId = this.addProducerCodeForm.controls['team'].value;
    var userToLoad: any;
    if (teamId == 0) {
      userToLoad = this.userService.getAllUsers();
    } else {
      userToLoad = this.teamService.getTeamStaff(teamId);
    }
    userToLoad.subscribe((r: any) => {
      this.allUsers = r;
      this.allUsers.forEach((user: any) => {
        if (this.granteduser) {
          var val = this.granteduser.find((u: any) => u.userid === user.userid);
          if (!val) {
            this.deniedUser.push(user);
          }
        }else {
          this.deniedUser = this.allUsers;
        }
      });
    });
  }

  submitPC() {
  }
  closeAddPC(template:any){
    this.pcModalRef.hide();
    this.isProducerCodeSubmit = false;
    this.granteduser = [];
    this.deniedUser = [];
    //this.modalService.hide('addpc');
  }
  denySelected()
  {
  if(this.denySelectAll)
  {
   this.granteduser.forEach((a:any) => {
      a['IsSelected'] = true;
    });
  }
  
  var selectedUser = this.granteduser.filter((a:any)=>a['IsSelected'] == true);
  this.granteduser = this.granteduser.filter((a:any)=>a['IsSelected'] != true);
  this.deniedUser = this.deniedUser.concat(selectedUser);
  this.granteduser.forEach((user:any) => {
    user['IsSelected'] = false;
  });
  this.deniedUser.forEach((user:any) => {
    user['IsSelected'] = false;
  });
  }
  grantSelected(){
    if(this.grantSelectAll)
      {
      this.deniedUser.forEach((a:any) => {
          a['IsSelected'] = true;
        });
      }
    var selectedUser = this.deniedUser.filter((a:any)=>a['IsSelected'] == true);
    this.deniedUser = this.deniedUser.filter((a:any)=>a['IsSelected'] != true);
    this.granteduser = this.granteduser.concat(selectedUser);
    this.granteduser.forEach((user:any) => {
      user['IsSelected'] = false;
    });
    this.deniedUser.forEach((user:any) => {
      user['IsSelected'] = false;
    });
  }

  AddEditSubmitPC(){
    var grantedUser = '';
    this.granteduser.forEach((user:any) => {
      grantedUser = grantedUser + user['userid'] + '~';
    });
    grantedUser = grantedUser.slice(0,-1);
    var brnach = '';
    if (this.addProducerCodeForm.controls['branchCommercial'].value && this.addProducerCodeForm.controls['branchPersonal'].value) {
      brnach =  'B';
    } else if (this.addProducerCodeForm.controls['branchPersonal'].value) {
      brnach =  'P';
    } else if (this.addProducerCodeForm.controls['branchAdmin'].value) {
      brnach =  'A';
    } else {
      brnach =  'C';
    }
    if(this.pcBtnLable == 'Update Producer Code') {
      var putModal = {
         AgencyID : this.selectedAgency.agency_id,
         CarrierID : this.addProducerCodeForm.controls['carrierId'].value.toString(),
         ProducerCode : this.addProducerCodeForm.controls['oldpc'].value,
         PCBranch : this.addProducerCodeForm.controls['oldBranch'].value,
         UID : this.addProducerCodeForm.controls['userName'].value,
         PWD : this.addProducerCodeForm.controls['pwd'].value,
         GrantedUsers : grantedUser,
         NewProducerCode : this.addProducerCodeForm.controls['producerCode'].value,
         NewPCBranch : brnach
      }
      this.spinnerService.show();
      this.producerCodeService.updateProducerCode(putModal).subscribe((r:any)=>
      {
        this.pcModalRef.hide();
        this.producerCodeService
       .getAgenciesCarrierProducerCode(
        this.selectedAgency.agency_id,
        this.addProducerCodeForm.controls['carrierId'].value.toString()
      )
      .subscribe((r: any) => {
        if (r != null) {
          this.producerCodeList = r;
          this.producerCodeList.forEach((pc: any) => {
            if (pc.branch == 'A') {
              pc['brnachName'] = 'Admin';
            } else if (pc.branch == 'P') {
              pc['brnachName'] = 'Personal';
            } else if (pc.branch == 'B') {
              pc['brnachName'] = 'Both';
            } else {
              pc['brnachName'] = 'Commercial';
            }
          });
          this.granteduser=[];
          this.deniedUser = [];
        } else {
          this.toastService.showInfo('PC not exist for this carrier', 'Info');
        }
      });
        this.spinnerService.hide();
      })
    }else {
      this.isProducerCodeSubmit = true;
      if(this.addProducerCodeForm.invalid)
       { return;}

       var postModal = {
        AgencyID : this.selectedAgency.agency_id,
        CarrierID : this.viewedCarrier.carrier_id.toString(),
        ProducerCode : this.addProducerCodeForm.controls['producerCode'].value,
        PCBranch : brnach,
        UID : this.addProducerCodeForm.controls['userName'].value,
        PWD : this.addProducerCodeForm.controls['pwd'].value,
        GrantedUsers : grantedUser,
        NewProducerCode : '',
        NewPCBranch : ''
     }
     this.spinnerService.show();
      this.producerCodeService.addProducerCode(postModal).subscribe(r=>{
        this.producerCodeService
       .getAgenciesCarrierProducerCode(
        this.selectedAgency.agency_id,
        this.viewedCarrier.carrier_id.toString()
      )
      .subscribe((r: any) => {
        if (r != null) {
          this.producerCodeList = r;
          this.producerCodeList.forEach((pc: any) => {
            if (pc.branch == 'A') {
              pc['brnachName'] = 'Admin';
            } else if (pc.branch == 'P') {
              pc['brnachName'] = 'Personal';
            } else if (pc.branch == 'B') {
              pc['brnachName'] = 'Both';
            } else {
              pc['brnachName'] = 'Commercial';
            }
          });
          this.granteduser=[];
          this.deniedUser = [];
        } else {
          this.toastService.showInfo('PC not exist for this carrier', 'Info');
        }
      });
      this.pcModalRef.hide();
        this.spinnerService.hide();
      })
    }
    this.denySelectAll = false;
    this.grantSelectAll = false;
  }
  BranchChanged(type:String, event:any)
  {
    var value = event.target.checked;
    if(type == 'A' && value){
      this.addProducerCodeForm.controls['branchCommercial'].patchValue(false);
      this.addProducerCodeForm.controls['branchPersonal'].patchValue(false);
    }else {
      this.addProducerCodeForm.controls['branchAdmin'].patchValue(false);
    }
  }
  DeleteAgency()
  {
    const initialState = {
      message: 'Are you sure want to delete the agency?',
      title: 'Delete Agency',
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState,
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if(result)
      {
        this.agencyService.archiveAgency(this.selectedAgency.agency_id).subscribe((r:any)=>{
          this.toastService.showSuccess("Agency deleted successfully","Success");
          window.location.reload();
        })
      }
    })
  }

  EditAgency(agency:any)
  {
    const initialState = {
      title: 'Add AARC Agency',
      isEdit: true,
      agency:agency
    };
    this.modalService.show(AddAgencyComponent, {initialState,backdrop: 'static'});
  }

  getTimeZone()
  {
    this.agencyService.getTimeZone().subscribe(r=> {
    this.timeZoneList = r;
    })
  }

}
