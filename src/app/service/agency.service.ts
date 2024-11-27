import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  constructor(private http: HttpClient) {}

  getAgenciesByUser(userId: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Agency/AgenciesByUser/${userId}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAllAgencies() {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Agency/Agencies`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getCarrierByAgency(agencyId: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}AgencyCarrier/carriers/${agencyId}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getCarriesByTeamBranch(agencyId: string, userId:string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}AgencyCarrier/${agencyId}/${userId}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }


  getAgencyById(agencyID: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Agency/GetAgency/${agencyID}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getProducerCodeByCarrierId(
    userId: string,
    agencyid: string,
    carrierId: string
  ) {
    return this.http
      .get<any>(
        `${Constant.API_ENDPOINT}ProducerCodeCredential/${userId}/${agencyid}/${carrierId}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAllTeams() {
    return this.http.get<any>(`${Constant.API_ENDPOINT}team`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getAllSecurites() {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Secutiy/allSecurities`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAgencyContacts(agencyId: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Agency/GetAgencyContacts/${agencyId}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAgencyHours(agencyId: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}AgencyHours/${agencyId}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  updateAgencyHours(hours:any) {
    return this.http
      .put<any>(`${Constant.API_ENDPOINT}AgencyHours`,hours)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAgencyClosures(agencyId: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}AgencyClosures/${agencyId}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  addAgencyClosures(closure: any) {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}AgencyClosures`, closure)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteAgencyClosures(closure: any) {
    return this.http
      .delete<any>(`${Constant.API_ENDPOINT}AgencyClosures`, {body:closure})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  addAgencyContact(user: any) {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}AgencyContact`, user)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  editAgencyContact(user: any, contactid: any) {
    return this.http
      .put<any>(
        `${Constant.API_ENDPOINT}AgencyContact/updAARCAgencyContact/${contactid}`,
        user
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteAgencyContact(AgencyID: string, ContactID: string) {
    return this.http
      .delete<any>(
        `${Constant.API_ENDPOINT}AgencyContact?sAgencyID=${AgencyID}&sContactID=${ContactID}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  UpdateAgencyContatOrder(AgencyID: any, ContactID: any, up: any) {
    return this.http
      .put<any>(
        `${Constant.API_ENDPOINT}AgencyContact/UpdateAgencyContactOrder?sAgencyID=${AgencyID}&sContactID=${ContactID}&iUp=${up}`,
        {}
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  deleteAgencyCarrier(CarrierID: string, AgencyID: string) {
    return this.http
      .delete<any>(
        `${Constant.API_ENDPOINT}AgencyCarrier?AgencyID=${AgencyID}&CarrierID=${CarrierID}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAllCarrier() {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}AgencyCarrier/AllCarriers`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  addAgencyCarrier(carrier: any) {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}AgencyCarrier`, carrier)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getStates() {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}State`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getIsAgencyExist(agencyId:string){
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Agency/AgencyIDExist/${agencyId}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  addAgency(agency: any) {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}Agency/addAgency`, agency)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  archiveAgency(agencyId: any) {
    return this.http
    .delete<any>(
      `${Constant.API_ENDPOINT}Agency/ArchiveAgency/${agencyId}`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateAgency(agency:any) {
    return this.http
      .put<any>(`${Constant.API_ENDPOINT}Agency/updateAgency`,agency)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getAdminClosure()
  {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}AdminAgencyClosure/AAClosures`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  addAdminClosure(closure:any)
  {
    return this.http
    .post<any>(`${Constant.API_ENDPOINT}AdminAgencyClosure/AAClosures`, closure)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }
  deleteAdminClosure(closure:any)
  {
    return this.http
    .delete<any>(`${Constant.API_ENDPOINT}AdminAgencyClosure/AAClosures`, {body:closure})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getAdminDetailsByKey(likeKey:any)
  {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Registry/GetRegisteryLike/${likeKey}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  updateAdminContact(contact:any)
  {
    return this.http
      .put<any>(`${Constant.API_ENDPOINT}AgencyContact/updAAContactInfo`,contact)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  updateAdminAgencyHours(hours:any)
  {
    return this.http
    .put<any>(`${Constant.API_ENDPOINT}AgencyHours/updAAHours`,hours)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getLinks(userId:any)
  {
    return this.http
    .get<any>(`${Constant.API_ENDPOINT}Link/AllLinks/${userId}`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  addLinks(postModal:any)
  {
    return this.http
    .post<any>(`${Constant.API_ENDPOINT}Link/AddLink`, postModal)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteLinks(postModal:any)
  {
    return this.http
    .delete<any>(`${Constant.API_ENDPOINT}Link/deleteLink`, {body: postModal})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getDocx()
  {
    return this.http
    .get<any>(`${Constant.API_ENDPOINT}Document`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  addDocx(docx:any)
  {
    return this.http
    .post<any>(`${Constant.API_ENDPOINT}Document`, docx)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteDocx(fileName:string, type:string)
  {
    return this.http
    .delete<any>(`${Constant.API_ENDPOINT}Document/${fileName}/${type}`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getTimeZone()
  {
    return this.http
    .get<any>(`${Constant.API_ENDPOINT}TimeZone`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateTimeZone(timeZoneModal:any)
  {
    return this.http
    .put<any>(`${Constant.API_ENDPOINT}TimeZone/${timeZoneModal.timeZone}/${timeZoneModal.id}`,{})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  getTimeZoneByCode(agencyCode:any)
  {
    return this.http
    .get<any>(`${Constant.API_ENDPOINT}TimeZone/timeZoneById/${agencyCode}`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  changeDocCategory(OldCategoryCode:any,OldCategoryName:any,NewDocumentCatCode:any)
  {
    return this.http
    .post<any>(`${Constant.API_ENDPOINT}Document/${OldCategoryCode}/${OldCategoryName}/${NewDocumentCatCode}`,{})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

}
