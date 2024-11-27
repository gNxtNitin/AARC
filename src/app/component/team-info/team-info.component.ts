import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgencyService } from 'src/app/service/agency.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { ProucerCodeService } from 'src/app/service/proucer-code.service';
import { TeamService } from 'src/app/service/team.service';
import { ToastService } from 'src/app/service/toast-service';
import { UserService } from 'src/app/service/user.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
  host: {
    class: 'col-md-8 col-sm-12 pt-2 vh-scroll',
  }
})
export class TeamInfoComponent implements OnInit {

  selectedTeam: any = '';
  teamInfo: any;
  securityLevel: any;
  isLifeHealth = false;
  isPersonalBranch = false;
  isCommercialBranch = false
  showTeamManager = false;
  showTeamBranchInfo = false;
  showTeamMemberInfo = false;
  showAgency = false;
  selectedAgency: any;
  selectedCarrier: any;
  producerCode: any;
  currentUser: any;
  users: any;
  addTeamForm: any;
  importCredentailForm: any;
  importCredentailSubmitted = false;
  fn: string = '';
  addTeamSubmitted = false;
  loggedInUser:any={};
  teams:any = {};
  teamAgencies:any;
  teamBranches:any;
  teamManager:any;
  teamStaff:any;
  team :any ={};
  managerList : any;
  selectedManager:any;
  teamAvailableMembers:any;
  selectedMember:any;
  agency:any;
  agencies :any;
  selectedAgencyForAdd:any;
  addAgencySubmitted = false;
  newTeamName:[''];

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
    private proucerCodeService: ProucerCodeService,
    private clipboard: Clipboard,
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {
    this.addTeamForm = this.formBuilder.group({
      teamId: ['', Validators.required],
      teamName: ['', Validators.required],
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
    //this.showTeamManager = true;
    // this.userService
    //   .getUserTeam(this.currentUser['UserID'])
    //   .subscribe((response) => {
    //     this.teamInfo = response;
    //     this.spinnerService.hide();
    //   });

    //this.teamService.getAllAARCTeamMgrs()

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
          this.producerCode = res[0];
        });
    });
  }

  getBranches(){
    this.isPersonalBranch = false;
    this.isCommercialBranch = false;
    this.isLifeHealth = false;
    this.spinnerService.show();
    this.teamService.getAllAARCTeamBranches(this.selectedTeam).subscribe((r)=>{
      var brnaches = r;
      if(brnaches != null){
        brnaches.forEach((branch:any) => {
          if(branch['branch_id'] == 'C'){
            this.isCommercialBranch = true;
          }
          if(branch['branch_id'] == 'L'){
            this.isLifeHealth = true;
          }
          if(branch['branch_id'] == 'P'){
            this.isPersonalBranch = true;
          }
        });
      }
     
      this.spinnerService.hide();
    })
  }

  get f() {
    return this.addTeamForm.controls;
  }

  get cf() {
    return this.importCredentailForm.controls;
  }
  TeamManagerClick() {
    this.showTeamManager = !this.showTeamManager;
  }
  showTeamBranchClick() {
    this.showTeamBranchInfo = !this.showTeamBranchInfo;
  }
  showTeamMemberClick() {
    this.showTeamMemberInfo = !this.showTeamMemberInfo;
  }
  showAgencyClick() {
    this.showAgency = !this.showAgency;
  }
  Selectteam(changeUserTemplate: any) {
    this.proucerCodeService.getAllTeams().subscribe((response) => {
      this.teams = response;
      console.log(this.teams);
    });
    this.modalRef = this.modalService.show(changeUserTemplate, {backdrop: 'static'});
  }

  OpenAddAgency(cloneUserTemplate: any) {
    this.selectedAgencyForAdd = '';
    this.agencyService.getAllAgencies().subscribe((response) => {
      this.agencies = response;
    });
    this.modalRef = this.modalService.show(cloneUserTemplate, {backdrop: 'static'});
  }

  TeamSelected() {
    //this.spinnerService.show();
    this.teamService.getTeamFromID(this.selectedTeam).subscribe(r=>{
      this.team = r[0];
    })
    this.teamService.getAllAARCTeamAgencies(this.selectedTeam).subscribe(r=>{
      this.teamAgencies = r;
    })
    this.teamService.getAllAARCTeamBranches(this.selectedTeam).subscribe(r=>{
      this.teamBranches = r;
    })
    this.teamService.getAllAARCTeamMgrs(this.selectedTeam).subscribe(r=>{
      this.teamManager = r;
      console.log(this.teamManager);
    })
    this.teamService.getTeamStaff(this.selectedTeam).subscribe(r=>{
      this.teamStaff = r;
    })
    this.getBranches();

    this.modalRef.hide();
  }

  DeleteManager(manager:any)
  {
    const initialState = {
      message: 'Are you sure want to delete the Manager?',
      title: 'Delete Manager',
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState,
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if(result)
      {
        this.spinnerService.show();
        this.teamService.deleteTeamManager(this.selectedTeam,manager.userid).subscribe((r)=>{
          this.spinnerService.hide();
          this.toastService.showSuccess("Manager deleted successfully!!","Success");
          this.teamService.getAllAARCTeamMgrs(this.selectedTeam).subscribe((r)=>{
            this.teamManager = r;
          })
        });  
      }
    })
  }

  submitAddTeam() {
    debugger;
    this.addTeamSubmitted = true;
    if (this.addTeamForm.invalid) {
      return;
    }
    this.teamService.addAARCTeam(this.f.teamId.value,this.f.teamName.value).subscribe((r:any)=>{
      this.modalRef.hide();
      this.toastService.showSuccess("Team Added Successfully","Success");
    })
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
  BranchChange(event:any, type:string){
    debugger;
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
          this.teamService.delAARCTeamBranch(this.selectedTeam,type).subscribe((r:any)=>{
           this.getBranches();
          })
        }
      });
    } else {
      this.modalRef.content.onClose.subscribe((result: boolean) => {
        if (result) {
          this.spinnerService.show();
          this.teamService.addAARCTeamBranch(this.selectedTeam,type).subscribe((r:any)=>{
           this.getBranches();
          })
        }
      });
    }
  }

  getAllARECTeamManager()
  {
    this.teamService.getAllAARCManager().subscribe((r)=>{
      console.log(r);
      this.managerList = r;
    })
  }
  OpenAddManager(template:any)
  {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
    this.getAllARECTeamManager();
  }
  AddManager()
  {
    this.teamService.addAARCTeamManager(this.selectedTeam,this.selectedManager).subscribe((r:any)=>{
      this.teamService.getAllAARCTeamMgrs(this.selectedTeam).subscribe((r)=>{
        this.teamManager = r;
      })
      this.modalRef.hide();
    })
  }
  OpenAddTeam(template:any)
  {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }
  DeleteStaff(staff:any)
  {

    const initialState = {
      message: 'Are you sure want to delete the Manager?',
      title: 'Delete Manager',
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState,
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if(result)
      {
        this.teamService.delAARCTeamMember(this.selectedTeam, staff.userid).subscribe((r)=>{
          this.teamService.getTeamStaff(this.selectedTeam).subscribe(r=>{
            this.teamStaff = r;
          })
        })
      }})
  }
  getAvailableTeamMembers()
  {
     this.teamService.getTeamAvailableMembers(this.selectedTeam).subscribe((r)=>{
      this.teamAvailableMembers = r;
    })
  }
  OpenAddMember(template:any)
  {
    this.selectedMember = '';
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
    this.getAvailableTeamMembers();
  }
  AddMember()
  {
    var similarId = '';
    this.selectedMember.forEach((item: any) => {
      similarId = similarId + item + ';';
    });
    this.teamService.addAARCTeamMembers(this.selectedTeam,this.selectedMember).subscribe((r:any)=>{
      this.spinnerService.hide();
      this.modalRef.hide();
      this.teamService.getTeamStaff(this.selectedTeam).subscribe(r=>{
        this.teamStaff = r;
      })
    })
  }
  DeleteAgency(agency:any)
  {
    
    const initialState = {
      message: 'Are you sure want to delete the Agency?',
      title: 'Delete Agency',
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState,
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if(result)
      {
    this.teamService.deleteTeamAgency(this.selectedTeam, agency.agency_id).subscribe((r)=>{
      this.teamService.getAllAARCTeamAgencies(this.selectedTeam).subscribe((r2)=>{
        this.teamAgencies = r2;
      })
    })
  }
})
}
  AddTeamAgency()
  {
    if(this.selectedAgencyForAdd == '' || this.selectedAgencyForAdd == null) {
      this.addAgencySubmitted = true;
      return;
    }
    if(!this.team || JSON.stringify(this.team) === '{}')
    {
      this.toastService.showError("Please select team","Required");
    }
    this.teamService.addAARCTeamAgency(this.selectedTeam, this.selectedAgencyForAdd).subscribe((r)=>{
      this.teamService.getAllAARCTeamAgencies(this.selectedTeam).subscribe((r2)=>{
        this.teamAgencies = r2;
      })
      this.toastService.showSuccess("Agency added successfully","Success");
      this.modalRef.hide();
    })
  }

  TeamModified() {
    if (this.selectedTeam && this.selectedTeam.length > 0 && this.newTeamName)
    {
      this.teamService.editAARCTeam(this.selectedTeam,this.newTeamName).subscribe((r:any)=>{
        this.modalRef.hide();
      })
      this.newTeamName = [''];
      this.selectedTeam='';
      this.modalRef.hide();
      this.toastService.showSuccess("Team Name Modified Successfully","Success");
    }
    //this.toastService.showError("Please Provide Correct Details to Modify Team Name","Error");
  }

  TeamDelete() {
    debugger;
    if (this.selectedTeam && this.selectedTeam.length > 0)
    {
      this.teamService.deleteAARCTeam(this.selectedTeam).subscribe((r:any)=>{
        this.modalRef.hide();
      })
      this.newTeamName = [''];
      this.modalRef.hide();
      this.toastService.showSuccess("Team Name Deleted Successfully","Success");
    }
    //this.toastService.showError("Please Select at least 1 Team to Delete","Error");
  }
}
