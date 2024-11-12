
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root',
})
export class ProucerCodeService {

  constructor(private http: HttpClient) {}

  getAgenciesCarrierProducerCode(agencyId:string, carrierId: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}ProducerCode/${agencyId}/${carrierId}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAllTeams() {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Team/`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAllProducerCodeGrantedUsers(agencyId:string,carrierId:string,branch:string,producerCode:string) {
    
    var pc = {
      AgencyID : agencyId,
      CarrierID : carrierId.toString(),
      ProducerCode : producerCode,
      PCBranch : branch,
      UID : '',
      PWD : '',
      GrantedUsers : '',
      NewProducerCode : '',
      NewPCBranch : ''
   }  
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}ProducerCode/ProducerCodeGrantedUsers`, pc)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAllProducerCodeDetails(agencyId:string,carrierId:string,producerCode:string,branch:string) {
  
    
   var pc = {
    AgencyID : agencyId,
    CarrierID : carrierId.toString(),
    ProducerCode : producerCode,
    PCBranch : branch,
    UID : '',
    PWD : '',
    GrantedUsers : '',
    NewProducerCode : '',
    NewPCBranch : ''
 }

    return this.http
    .post<any>(`${Constant.API_ENDPOINT}ProducerCode/ProducerCodeDetails`,pc)
    .pipe(
      map((res) => {
        return res;
      })
    )
  }

  updateProducerCode(pc:any) {
    return this.http
      .put<any>(`${Constant.API_ENDPOINT}ProducerCode/Update`,pc)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  addProducerCode(pc:any) {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}ProducerCode`,pc)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  
  deleteProducerCode(detail:any) {

    debugger;

    var pc = {
      AgencyID : detail.AgencyID,
      CarrierID : detail.CarrierID.toString(),
      ProducerCode : detail.ProducerCode,
      PCBranch : detail.PCBranch,
      UID : '',
      PWD : '',
      GrantedUsers : '',
      NewProducerCode : '',
      NewPCBranch : ''
   }
    return this.http
      .delete<any>(`${Constant.API_ENDPOINT}ProducerCode`,{body:pc})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
