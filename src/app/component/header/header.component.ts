import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgencyService } from 'src/app/service/agency.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { NewsEventService } from 'src/app/service/news-event.service';
import { UserService } from 'src/app/service/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  userDetail: any;
  isShowProfileMenu = false;
  isShowAgency = false;
  isShowCarrier = false;
  agencies: any;
  carriers: any;
  selectedAgency: any;
  selectedCarrier: any;
  userRole ='';
  isFirstTime = true;
  carriersList:any;
  brokerList:any;
  otherList:any;
  lstAgencies:any;
  modalRef: BsModalRef;
  tickers = [];
  whosOutTodayList:any;
  whosOutToday:any;
  isShowLoader: boolean = true;
  CurrentDate:any;

  @ViewChild('tickerPopUp', { static: true }) ticker: TemplateRef<any>;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private agencyService: AgencyService,
    private dataSharingService: DataSharingService,
    private modalService: BsModalService,
    private newsEventService: NewsEventService
  ) {}

  ngOnInit(): void {
    this.userService.getUserDetail().subscribe((response) => {
      localStorage.setItem('userDetail', JSON.stringify(response));
      this.userDetail = JSON.parse(JSON.stringify(response));
      this.dataSharingService.sendSelectedUser(this.userDetail);
      this.dataSharingService.setLoggedInUser(this.userDetail);
      if(this.userDetail['AASecLevel'] == 'EXEC')
      {
        this.userRole = 'Manager';
      } else  if(this.userDetail['AASecLevel'] == 'ADMIN')
      {
        this.userRole = 'Administrator';
      }
      else  if(this.userDetail['AASecLevel'] == 'PLAYER')
      {
        this.userRole = 'User';
      }
      this.load();
    });
  }

  ngAfterViewInit()
  {
    this.getwhosOutToday();
    this.getTickerPopUp();
  }

  closeDropdown()
  {
    // this.isShowAgency = false;
    // this.isShowCarrier = false;
  }

  load() {
    this.agencyService
      .getAgenciesByUser(this.userDetail['UserID'])
      .subscribe((response) => {
        this.agencies = response;
        this.lstAgencies = response;
        //this.onAgencySelect(this.agencies[0]);
      });
      this.dataSharingService.userSelected.subscribe((user)=>{
        this.selectedAgency = null;
        this.selectedCarrier = null;
        this.dataSharingService.sendSelectedAgency(null);
        this.dataSharingService.sendSelectedCarrier(null);
      })
  }

  showProfileMenu() {
    this.isShowProfileMenu = !this.isShowProfileMenu;
    this.isShowAgency = false;
    this.isShowCarrier = false;
    this.isFirstTime = true;
  }
  onChangePassword() {
    this.modalService.show(ChangePasswordComponent);
  }
  onLogoutClick() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  showAgency() {
    this.isShowAgency = !this.isShowAgency;
    this.isShowProfileMenu =false;
    this.isShowCarrier = false;
    this.isFirstTime = true;
  }
  showCarrier() {
    this.isShowCarrier = !this.isShowCarrier;
    this.isShowProfileMenu =false;
    this.isShowAgency = false;
    this.isFirstTime = true;
  }
  onAgencySelect(agency: any) {
    this.isShowAgency = false;
    this.selectedAgency = agency;
    this.selectedCarrier = null;
    this.dataSharingService.sendSelectedAgency(this.selectedAgency);
    this.agencyService
      .getCarrierByAgency(agency.agency_id)
      .subscribe((response) => {
        this.carriers = response;
      });

   this.agencyService.getCarriesByTeamBranch(agency.agency_id,this.userDetail['UserID']).subscribe((response) => {
    this.carriers = response;
    this.carriersList = response.filter((a:any)=>a.bt_id == 'TC');
    this.brokerList = response.filter((a:any)=>a.bt_id == 'TB');
    this.otherList = response.filter((a:any)=>a.bt_id == 'TO');
  });
  }
  onCarrierSelect(carrier: any) {
    this.selectedCarrier = carrier;
    this.dataSharingService.sendSelectedCarrier(this.selectedCarrier);
    this.isShowCarrier = false;
  }
  addUser() {
    const initialState = {
      user: '',
      title: 'Add User',
    };
    this.modalService.show(AddUserComponent,{initialState, backdrop: 'static'});
  }
  editUser(){
    const initialState = {
      user: this.userDetail,
      title: 'Edit User',
    };
    this.modalService.show(AddUserComponent,{initialState, backdrop: 'static'});
  }
  toggleDropdown()
  {
    if(!this.isFirstTime)
    {
      this.isShowCarrier = false;
      this.isShowProfileMenu =false;
      this.isShowAgency = false;
    }
    this.isFirstTime = false;
  }

  searchAgency(event:any)
  {
    this.agencies = this.lstAgencies.filter((agency:any)=> agency.agency_name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  searchCarrier(event:any)
  {
    this.carriersList = this.carriers.filter((a:any)=>a.bt_id == 'TC' && a.carrier_name.toLowerCase().includes(event.target.value.toLowerCase()));
    this.brokerList = this.carriers.filter((a:any)=>a.bt_id == 'TB' && a.carrier_name.toLowerCase().includes(event.target.value.toLowerCase()));
    this.otherList = this.carriers.filter((a:any)=>a.bt_id == 'TO' && a.carrier_name.toLowerCase().includes(event.target.value.toLowerCase()));
   
  }

  getTickerPopUp()
  {
    this.tickers = [];
    this.newsEventService.getTickers().subscribe(r=>{
      this.tickers = r;
    })
     this.modalRef = this.modalService.show(this.ticker, {backdrop: 'static'});
  }

  getwhosOutToday(){
    var data = this.newsEventService.whosOutTodayList().subscribe(r=>{
      this.whosOutTodayList = r;
      //Code to get Current Month,Day & Date;
      let date = new Date();
      let DayName = date.toLocaleString('en-us', {weekday: 'long'});
      let MonthName = date.toLocaleString('default', { month: 'short' });
      let day = date.getDate();
      this.CurrentDate = DayName+", "+MonthName+" "+day;
      this.isShowLoader=false
    });
      //It will hide the loader after 10 sec if something went wrong from api side
      setTimeout(() => {this.isShowLoader=false}, 10000);
  }
} 
