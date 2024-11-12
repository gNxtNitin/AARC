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
    class: 'col-md-8 col-sm-12 pt-2',
  }
})
export class AarcDocumnetComponent implements OnInit {

  docLink = Constant.Doc_link
  showAcord= false;
  acordForms:any;
  loggedInUser:any;
  showBilling = false;
  billings:any;
  showQuote:any;
  quotes:any;
  showSupplemental= false;
  miscellaneous:any;
  showMis = false;
  showGuideline = false;
  guidelines:any;
  supplementForms:any;
  modalRef:any;
  selectedDocType = '';
  selectedDoc:any;
  reader = new FileReader();
  selectedFile:any = {};
  submitted =  false;
  allDocx:any;

  DocTypes = [
    {id: 'A' ,value:'Acord Forms'},
    {id: 'B' ,value:'Billing'},
    {id: 'Q' ,value:'Quote Sheets'},
    {id: 'M' ,value:'Miscellaneous'},
    {id: 'G' ,value:'Underwriting Guidelines'},
    {id: 'S' ,value:'Supplemental Forms'},
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

  AcordFormsClick()
  {
    this.showAcord = !this.showAcord;
  }

  BillingClick()
  {
    this.showBilling = !this.showBilling;
  }

  QuoteClick()
  {
    this.showQuote = !this.showQuote;
  }

  SupplementalClick()
  {
    this.showSupplemental = ! this.showSupplemental;
  }

  MisclClick()
  {
    this.showMis = ! this.showMis;
  }
  GuideLineClick()
  {
    this.showGuideline = ! this.showGuideline;
  }

  loadDocx()
  {
    this.agencyService.getDocx().subscribe((r:any)=>{
        this.allDocx = r;
        this.acordForms = r.filter((a:any)=>a.doc_cat == 'A');
        this.billings = r.filter((a:any)=>a.doc_cat == 'B');
        this.quotes = r.filter((a:any)=>a.doc_cat == 'Q');
        this.miscellaneous = r.filter((a:any)=>a.doc_cat == 'M');
        this.guidelines = r.filter((a:any)=>a.doc_cat == 'G');
        this.supplementForms = r.filter((a:any)=>a.doc_cat == 'S');
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
          console.log(r);
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
  handleFileInput(target:any)
  {

    const file = target.files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(file);
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
    console.log(txt);
    if(txt == '') {
        this.showAcord = false;
        this.showBilling = false;
        this.showSupplemental = false;
        this.showMis = false;
        this.showGuideline = false;

    } else {
      var filterItems = this.allDocx.filter((a:any)=>{ 
         return a.doc_name.toLowerCase().includes(txt.toLowerCase())});

         this.acordForms = filterItems.filter((a:any)=>a.doc_cat == 'A');
         this.billings = filterItems.filter((a:any)=>a.doc_cat == 'B');
         this.quotes = filterItems.filter((a:any)=>a.doc_cat == 'Q');
         this.miscellaneous = filterItems.filter((a:any)=>a.doc_cat == 'M');
         this.guidelines = filterItems.filter((a:any)=>a.doc_cat == 'G');
         this.supplementForms = filterItems.filter((a:any)=>a.doc_cat == 'S');

       this.showAcord = true;
        this.showBilling = true;
        this.showSupplemental = true;
        this.showMis = true;
        this.showGuideline = true;
    }
    
  }
 
}
