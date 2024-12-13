import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AgencyService } from 'src/app/service/agency.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { ToastService } from 'src/app/service/toast-service';
import { Constant } from '../../constant/constant';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-aarc-documnet',
  templateUrl: './aarc-documnet.component.html',
  styleUrls: ['./aarc-documnet.component.scss'],
  host: {
    class: 'col-md-8 col-sm-12 pt-2 vh-scroll',
  }
})
export class AarcDocumnetComponent implements OnInit {

  docLink = Constant.Doc_link
  showAAI:boolean= false;
  showAAIDwellingFire:boolean= false;
  aaiForms:any;
  AAIDwellingFireForms:any;
  showAAIQuoteSheetsandChecklists:boolean= false;
  AAIQuoteSheetsandChecklistsForms:any;
  showAgencySpecific:boolean= false;
  AgencySpecificForms:any;
  showBasicAcordForms:boolean= false;
  BasicAcordForms:any;
  showCanineForms:boolean= false;
  CanineForms:any;
  showCaqceForms:boolean= false;
  CaqceForms:any;
  showDiscountsCreditsForms:boolean= false;
  DiscountsCreditsForms:any;
  showMotorVehicleForms:boolean= false;
  MotorVehicleForms:any;
  showSurplusLinesForms:boolean= false;
  SurplusLinesForms:any;
  showWoodStoveForms:boolean= false;
  WoodStoveForms:any;
  showWorkersCompensationForms:boolean= false;
  WorkersCompensationForms:any;

  loggedInUser:any;
  showBilling:boolean= false;
  billings:any;
  miscellaneousForms:any;
  showMis:boolean = false;
  modalRef:any;
  selectedDocType = '';
  PreselectedDocCat = '';
  PreselectedDocName = '';
  NewDocumentCatName = '';
  CategoryFullName = '';
  DocName = '';
  selectedDoc:any;
  reader = new FileReader();
  selectedFile:any = {};
  submitted =  false;
  allDocx:any;
  pcModalRef:any;

//   DocTypes2 = [
//     {id: 'A' ,value:'Acord Forms'},
//     {id: 'B' ,value:'Billing'},
//     {id: 'Q' ,value:'Quote Sheets'},
//     {id: 'M' ,value:'Miscellaneous'},
//     {id: 'G' ,value:'Underwriting Guidelines'},
//     {id: 'S' ,value:'Supplemental Forms'},
// ]

DocTypes = [
  {id: 'C' ,value:'AAI Dwelling Fire Forms'},
  {id: 'A' ,value:'AAI Forms'},
  {id: 'S' ,value:'AAI Quote Sheets and Checklists'},
  {id: 'E' ,value:'Agency Specific Forms'},
  {id: 'F' ,value:'Basic Acord Forms'},
  {id: 'B' ,value:'Billing Forms'},
  {id: 'H' ,value:'Canine Forms'},
  {id: 'Q' ,value:'Carrier Application, Quote Requests, Coverage and Exclusion Forms'},
  {id: 'I' ,value:'Discounts and Credits'},
  {id: 'M' ,value:'Miscellaneous'},
  {id: 'J' ,value:'Motor Vehicle Forms'},
  {id: 'K' ,value:'Surplus Lines Forms'},
  {id: 'L' ,value:'Wood Stove Forms'},
  {id: 'G' ,value:'Workers Compensation Forms'},
]

  constructor(private dataSharingService: DataSharingService,
    private modalService: BsModalService,
    private agencyService: AgencyService,
    private toastService: ToastService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loggedInUser = this.dataSharingService.loggedInUser;
    if(this.loggedInUser)
    {
      this.loadDocx();
    }
    this.dataSharingService.loggedUser.subscribe((response:any) => {
      this.loggedInUser = response;
      this.loadDocx();
    }) 
  }

  OpenEdit(contact: any, template: any) {
    debugger;
    this.submitted = false;
    this.selectedDocType ='';
    this.PreselectedDocCat=contact.doc_cat;
    this.PreselectedDocName=contact.doc_name;
    if(contact.doc_cat=="A")
    {
      this.CategoryFullName='AAI Forms';
    }
    else if(contact.doc_cat=="C")
    {
      this.CategoryFullName='AAI Dwelling Fire Forms'
    }
    else if(contact.doc_cat=="S")
    {
      this.CategoryFullName='AAI Quote Sheets and Checklists'
    }
    else if(contact.doc_cat=="E")
    {
      this.CategoryFullName='Agency Specific Forms'
    }
    else if(contact.doc_cat=="B")
    {
      this.CategoryFullName='Billing Forms'
    }
    else if(contact.doc_cat=="F")
    {
      this.CategoryFullName='Basic Acord Forms'
    }
    else if(contact.doc_cat=="H")
    {
      this.CategoryFullName='Canine Forms'
    }
    else if(contact.doc_cat=="Q")
    {
      this.CategoryFullName='Carrier Application, Quote Requests, Coverage and Exclusion Forms'
    }
    else if(contact.doc_cat=="I")
    {
      this.CategoryFullName='Discounts and Credits'
    }
    else if(contact.doc_cat=="M")
    {
      this.CategoryFullName='Miscellaneous'
    }
    else if(contact.doc_cat=="J")
    {
      this.CategoryFullName='Motor Vehicle Forms'
    }
    else if(contact.doc_cat=="K")
    {
      this.CategoryFullName='Surplus Lines Forms'
    }
    else if(contact.doc_cat=="L")
    {
      this.CategoryFullName='Wood Stove Forms'
    }
    else if(contact.doc_cat=="G")
    {
      this.CategoryFullName='Workers Compensation Forms'
    }
    else
    {
      this.CategoryFullName='';
    }

    this.pcModalRef =  this.modalService.show(template);
  }

  AAIFormsClick()
  {
    this.showAAI = !this.showAAI;
  }

  AAIDwellingFireFormsClick()
  {
    this.showAAIDwellingFire = !this.showAAIDwellingFire;
  }

  AAIQuoteSheetsandChecklistsFormsClick()
  {
    this.showAAIQuoteSheetsandChecklists = !this.showAAIQuoteSheetsandChecklists;
  }

  AgencySpecificFormsClick()
  {
    this.showAgencySpecific = !this.showAgencySpecific;
  }

  BasicAcordFormsClick()
  {
    this.showBasicAcordForms = !this.showBasicAcordForms;
  }

  CanineFormsClick()
  {
    this.showCanineForms = !this.showCanineForms;
  }

  CaqceFormsClick()
  {
    this.showCaqceForms = !this.showCaqceForms;
  }

  DiscountsCreditsFormsClick()
  {
    this.showDiscountsCreditsForms = !this.showDiscountsCreditsForms;
  }

  MotorVehicleFormsClick()
  {
    this.showMotorVehicleForms = !this.showMotorVehicleForms;
  }

  SurplusLinesFormsClick()
  {
    this.showSurplusLinesForms = !this.showSurplusLinesForms;
  }

  WoodStoveFormsClick()
  {
    this.showWoodStoveForms = !this.showWoodStoveForms;
  }

  WorkersCompensationFormsClick()
  {
    this.showWorkersCompensationForms = !this.showWorkersCompensationForms;
  }

  BillingClick()
  {
    this.showBilling = !this.showBilling;
  }

  MisclClick()
  {
    this.showMis = ! this.showMis;
  }

  loadDocx()
  {
    this.agencyService.getDocx().subscribe((r:any)=>{
        this.allDocx = r;
        this.aaiForms = r.filter((a:any)=>a.doc_cat == 'A');
        this.AAIDwellingFireForms = r.filter((a:any)=>a.doc_cat == 'C');
        this.AAIQuoteSheetsandChecklistsForms = r.filter((a:any)=>a.doc_cat == 'S');
        this.AgencySpecificForms = r.filter((a:any)=>a.doc_cat == 'E');
        this.billings = r.filter((a:any)=>a.doc_cat == 'B');
        this.BasicAcordForms = r.filter((a:any)=>a.doc_cat == 'F');
        this.CanineForms = r.filter((a:any)=>a.doc_cat == 'H');
        this.CaqceForms = r.filter((a:any)=>a.doc_cat == 'Q');
        this.DiscountsCreditsForms = r.filter((a:any)=>a.doc_cat == 'I');
        this.MotorVehicleForms = r.filter((a:any)=>a.doc_cat == 'J');
        this.SurplusLinesForms = r.filter((a:any)=>a.doc_cat == 'k');
        this.WoodStoveForms = r.filter((a:any)=>a.doc_cat == 'L');
        this.WorkersCompensationForms = r.filter((a:any)=>a.doc_cat == 'G');
        this.miscellaneousForms = r.filter((a:any)=>a.doc_cat == 'M');
    })
  }

  AddDocument(template:any)
  {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }
  Deletedocx(doc:any)
  {
    const initialState = {
      message: 'Are you sure want to delete the User?',
      title: 'Delete Contact',
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState,
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.agencyService.deleteDocx(doc.doc_name,doc.doc_cat).subscribe((r:any)=>{
          this.toastService.showSuccess("Document deleted successfully", "Success");
          this.loadDocx();
         })
      }
    });
  }
  close()
  {
    this.modalRef.hide();
  }

  closeDocPopup(template:any)
  {
    this.pcModalRef.hide();
  }

  handleFileInput(target:any)
  {

    const file = target.files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.selectedFile ['file'] =  file;
    reader.onload = () => {
      this.selectedFile ['data'] = (reader.result as string).split(",")[1];
    };
  }
  UploadDocumentToServer()
  {
    this.submitted = true;
    if(this.selectedDocType == '' || this.selectedDocType == undefined)
    {
      return;
    }
    var postModal = {
      Cat: this.selectedDocType,
      DocName: this.selectedFile['file']['name'],
      Attachment: this.selectedFile ['data'],
      AttachmentFilename:this.selectedFile['file']['name']
    };

    console.log(postModal);
    this.agencyService.addDocx({
      Cat: this.selectedDocType,
      DocName: this.selectedFile['file']['name'],
      Attachment: this.selectedFile ['data'],
      AttachmentFilename:this.selectedFile['file']['name']
    }).subscribe((r:any)=>{
     this.modalRef.hide();
     this.loadDocx();

    });
  }

  searchDocument(event: any)
  {
        var txt = event.target.value;
        
        this.showAAI = false;
        this.showAAIDwellingFire = false;
        this.showAAIQuoteSheetsandChecklists = false;
        this.showAgencySpecific = false;
        this.showBasicAcordForms = false;
        this.showCanineForms = false;
        this.showCaqceForms = false;
        this.showDiscountsCreditsForms = false;
        this.showMotorVehicleForms = false;
        this.showSurplusLinesForms = false;
        this.showWoodStoveForms = false;
        this.showWorkersCompensationForms = false;
        this.showBilling = false;
        this.showMis = false;

        if(txt == '') {
        this.loadDocx();
        } 
        else {
        var filterItems = this.allDocx.filter((a:any)=>{ 
        return a.doc_name.toLowerCase().includes(txt.toLowerCase())});
        if(filterItems.length<1)
        {
         this.loadDocx();
         filterItems = this.allDocx.filter((a:any)=>{ 
           return a.doc_name.toLowerCase().includes(txt.toLowerCase())});
        }

        this.aaiForms = filterItems.filter((a:any)=>a.doc_cat == 'A');
        if(this.aaiForms.length>0)
        {
           this.showAAI = true;
        }
        this.AAIDwellingFireForms = filterItems.filter((a:any)=>a.doc_cat == 'C');
        if(this.AAIDwellingFireForms.length>0)
        {
         this.showAAIDwellingFire = true;
        }
        this.AAIQuoteSheetsandChecklistsForms = filterItems.filter((a:any)=>a.doc_cat == 'S');
        if(this.AAIQuoteSheetsandChecklistsForms.length>0)
         {
           this.showAAIQuoteSheetsandChecklists = true;
         }
        this.AgencySpecificForms = filterItems.filter((a:any)=>a.doc_cat == 'E');
        if(this.AgencySpecificForms.length>0)
         {
           this.showAgencySpecific = true;
         }
        this.billings = filterItems.filter((a:any)=>a.doc_cat == 'B');
        if(this.billings.length>0)
         {
           this.showBilling = true;
         }
        this.BasicAcordForms = filterItems.filter((a:any)=>a.doc_cat == 'F');
        if(this.BasicAcordForms.length>0)
         {
           this.showBasicAcordForms = true;
         }
        this.CanineForms = filterItems.filter((a:any)=>a.doc_cat == 'H');
        if(this.CanineForms.length>0)
         {
           this.showCanineForms = true;
         }
        this.CaqceForms = filterItems.filter((a:any)=>a.doc_cat == 'Q');
        if(this.CaqceForms.length>0)
         {
           this.showCaqceForms = true;
         }
        this.DiscountsCreditsForms = filterItems.filter((a:any)=>a.doc_cat == 'I');
        if(this.DiscountsCreditsForms.length>0)
         {
           this.showDiscountsCreditsForms = true;
         }
        this.MotorVehicleForms = filterItems.filter((a:any)=>a.doc_cat == 'J');
        if(this.MotorVehicleForms.length>0)
         {
           this.showMotorVehicleForms = true;
         }
        this.SurplusLinesForms = filterItems.filter((a:any)=>a.doc_cat == 'J');
        if(this.SurplusLinesForms.length>0)
         {
           this.showSurplusLinesForms = true;
         }
        this.WoodStoveForms = filterItems.filter((a:any)=>a.doc_cat == 'L');
        if(this.WoodStoveForms.length>0)
         {
           this.showWoodStoveForms = true;
         }
        this.WorkersCompensationForms = filterItems.filter((a:any)=>a.doc_cat == 'G');
        if(this.WorkersCompensationForms.length>0)
         {
           this.showWorkersCompensationForms = true;
         }
        this.miscellaneousForms = filterItems.filter((a:any)=>a.doc_cat == 'M');
        if(this.miscellaneousForms.length>0)
         {
           this.showMis = true;
         }
    } 
  }

  UpdateDocumentCategory()
  {
    debugger;
    this.submitted = true;
    if(this.selectedDocType == '' || this.selectedDocType == undefined)
    {
      this.toastService.showError("Please Select a Category","Error");
      return;
    }
    var OldCategoryCode = this.PreselectedDocCat;
    var OldCategoryName = this.PreselectedDocName;
    var NewCategory = this.selectedDocType;

    this.agencyService.changeDocCategory(OldCategoryCode,OldCategoryName,NewCategory).subscribe((r:any)=>{
     this.toastService.showSuccess("Document Moved to New Category", "Success");
     this.loadDocx();
     });
     debugger;
     if(OldCategoryCode=="A")
      {
        this.showAAI = !this.showAAI;
      }
      else if(OldCategoryCode=="C")
      {
        this.showAAIDwellingFire = !this.showAAIDwellingFire;
      }
      else if(OldCategoryCode=="S")
      {
        this.showAAIQuoteSheetsandChecklists = !this.showAAIQuoteSheetsandChecklists;
      }
      else if(OldCategoryCode=="E")
      {
        this.showAgencySpecific = !this.showAgencySpecific;
      }
      else if(OldCategoryCode=="F")
      {
        this.showBasicAcordForms = !this.showBasicAcordForms;
      }
      else if(OldCategoryCode=="H")
      {
        this.showCanineForms = !this.showCanineForms;
      }
      else if(OldCategoryCode=="B")
      {
        this.showBilling = !this.showBilling;
      }
      else if(OldCategoryCode=="Q")
      {
        this.showCaqceForms = !this.showCaqceForms;
      }
      else if(OldCategoryCode=="I")
      {
        this.showDiscountsCreditsForms = !this.showDiscountsCreditsForms;
      }
      else if(OldCategoryCode=="J")
      {
        this.showMotorVehicleForms = !this.showMotorVehicleForms;
      }
      else if(OldCategoryCode=="K")
      {
        this.showSurplusLinesForms = !this.showSurplusLinesForms;
      }
      else if(OldCategoryCode=="L")
      {
        this.showWoodStoveForms = !this.showWoodStoveForms;
      }
      else if(OldCategoryCode=="G")
      {
        this.showWorkersCompensationForms = !this.showWorkersCompensationForms;
      }
      else if(OldCategoryCode=="M")
      {
        this.showMis = ! this.showMis;
      }
     this.pcModalRef.hide();
     this.loadDocx();
  }
 
}
