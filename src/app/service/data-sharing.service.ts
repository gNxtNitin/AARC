import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {

  constructor() {}

  private _agencySelectedSource = new Subject<any>();
  private _carrierSelectedSource = new Subject<any>();
  private _userSelectedSource = new Subject<any>();  

  private _loggedInUser = new Subject<any>();  

  agencySelected = this._agencySelectedSource.asObservable();
  carrierSelected = this._carrierSelectedSource.asObservable();
  userSelected = this._userSelectedSource.asObservable();
  loggedUser = this._loggedInUser.asObservable();

  tickerDeleted = new BehaviorSubject<boolean>(true);

  selectedAgency: any = {};
  selectedCarrier: any = {};
  loggedInUser:any={};

  sendSelectedAgency(agency:any) {
    this._agencySelectedSource.next(agency);
    this.selectedAgency =  agency;
  }

  sendSelectedCarrier(carrier:any) {
    this._carrierSelectedSource.next(carrier);
    this.selectedCarrier = carrier;
  }

  sendSelectedUser(user:any){
    this._userSelectedSource.next(user);
  }
  setLoggedInUser(user:any)
  {
    this._loggedInUser.next(user);
    this.loggedInUser = user;
  }
  tickerEvent(){
    this.tickerDeleted.next(true);
  }

}
