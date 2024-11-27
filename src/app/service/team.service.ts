import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeamStaff(teamid: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Team/teamStaff/${teamid}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getTeamFromID(teamid: string) {
    return this.http.get<any>(`${Constant.API_ENDPOINT}Team/${teamid}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getAllAARCTeamMgrs(teamid: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Team/TeamManager/${teamid}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getAllAARCManager() {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Team/TeamManager`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getAllAARCTeamBranches(teamid: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Team/teamBranches/${teamid}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getAllAARCTeamAgencies(teamid: string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Team/TeamAgencies/${teamid}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteTeamManager(teamId: any, managerId:any) {
    return this.http
      .delete<any>(`${Constant.API_ENDPOINT}team/deleteTeamMgr/${teamId}/${managerId}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  delAARCTeamMember(teamId: any, userId:any) {
    return this.http
      .delete<any>(`${Constant.API_ENDPOINT}team/deleteTeamMember/${teamId}/${userId}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  delAARCTeamBranch(teamId: any, branchId:any) {
    return this.http
      .delete<any>(`${Constant.API_ENDPOINT}team/deleteTeamBranche/${teamId}/${branchId}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  addAARCTeamBranch(teamId: any, branchId:any) {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}team/addTeamBranche/${teamId}/${branchId}`,{})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  addAARCTeamManager(teamId: any, MgrID:any) {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}team/addTeamMgr/${teamId}/${MgrID}`,{})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  addAARCTeam(teamId: any, name:any) {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}Team/team/${teamId}/${name}`,{})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getTeamAvailableMembers(id:string)
  {
    return this.http
    .get<any>(`${Constant.API_ENDPOINT}Team/TeamAvailableMembers/${id}`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  addAARCTeamMembers(teamId:string, UID:string)
  {
    return this.http
    .post<any>(`${Constant.API_ENDPOINT}team/addTeamMember/${teamId}/${UID}`,{})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }
  deleteTeamAgency(teamId:string, agencyId:string)
  {
    return this.http
    .delete<any>(`${Constant.API_ENDPOINT}team/deleteTeamAgency/${teamId}/${agencyId}`)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }
  addAARCTeamAgency(teamId:string, agencyId:string){
    return this.http
    .post<any>(`${Constant.API_ENDPOINT}team/addTeamAgency/${teamId}/${agencyId}`,{})
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  editAARCTeam(teamId: any, name:any) {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}Team/UpdateTeam/${teamId}/${name}`,{})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteAARCTeam(teamId: any) {
    return this.http
      .delete<any>(`${Constant.API_ENDPOINT}Team/team/${teamId}`,{})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}

