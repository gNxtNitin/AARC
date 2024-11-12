import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrierService {

  constructor(private http: HttpClient) { }

  getCarrierInfoById(carrierId: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}AgencyCarrier/carrier/${carrierId}`)
      .pipe(
        map((res:any) => {
          return res;
        })
      );
  }
  getCarrierBranch(carrierId: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}CarrierBranch/type/${carrierId}`)
      .pipe(
        map((res:any) => {
          return res;
        })
      );
  }

  getCarrierContact(carrierId: string, agencyId:string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}AgencyCarrier/contacts/${carrierId}/${agencyId}`)
      .pipe(
        map((res:any) => {
          return res;
        })
      );
  }

  addCarrier(carrier: any) {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}AgencyCarrier/addCarrier`, carrier)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  addAllBranch(carrierId:string){
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}CarrierBranch/addBranch/${carrierId}`,{})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  addCarrierBranch(carrierId:string, branchId:string){
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}CarrierBranch/addBranch/${carrierId}/${branchId}`,{})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  archiveCarrier(carrierId: any) {
    return this.http
    .delete<any>(
      `${Constant.API_ENDPOINT}AgencyCarrier/archiveCarrier/${carrierId}`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteCarrierBranch(carrierId:string, bid:string)
  {
    return this.http
    .delete<any>(
      `${Constant.API_ENDPOINT}CarrierBranch/deleteCarrierBranch/${carrierId}/${bid}`)
    .pipe(
      map((res) => {
        return res;
      })
    );
    
  }

  updateCarrierType(carrierId:string, typeId:string){
    return this.http
    .put<any>(`${Constant.API_ENDPOINT}CarrierBranch/updateBranch/${carrierId}/${typeId}`,{})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  addCarrierContact(carrierContact: any) {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}CarrierContact/addCarrierContact`, carrierContact)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getCarrierContactInfo(carrierId:string, agencyId:string)
  {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}ContactInfo/${carrierId}/${agencyId}`)
      .pipe(
        map((res:any) => {
          return res;
        })
      );
  }

  updateCarrierContact(contact:any)
  {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}CarrierContact/updateCarrierContact`,contact)
      .pipe(
        map((res:any) => {
          return res;
        })
      );
  }

  updateCarrier(carrier:any)
  {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}AgencyCarrier/updateCarrier`,carrier)
      .pipe(
        map((res:any) => {
          return res;
        })
      );
  }
  deleteCarrierContact(carrierId:string, contactId:string, delSimilar:boolean){
    return this.http
    .delete<any>(
      `${Constant.API_ENDPOINT}CarrierContact/${carrierId}/${contactId}/${delSimilar}`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }
}
