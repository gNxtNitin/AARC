import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message:string;

  public onClose: Subject<boolean>;
  constructor(private _bsModalRef: BsModalRef) { 
    this.onClose = new Subject();
  }

  ngOnInit(): void {
  }

  public onConfirm(): void {
    this.onClose.next(true);
    this._bsModalRef.hide();
}

public onCancel(): void {
    this.onClose.next(false);
    this._bsModalRef.hide();
}
}
