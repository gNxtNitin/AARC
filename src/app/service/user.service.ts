import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUserDetail() {
    return this.http
      .get<any>(Constant.API_ENDPOINT + 'user/UserInfo')
      .pipe(map((res)=>{
        return res;
      }));
  }

  getUserDetailById(userId:string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}user/UserInfo/${userId}`)
      .pipe(map((res)=>{
        return res;
      }));
  }

  getUserTeam(userId:any) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Team/TeamByUser/${userId}`)
      .pipe(map((res)=>{
        return res;
      }));
  }

  getUserSecurityLeve(securityCode:string) {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Secutiy/${securityCode}`)
      .pipe(map((res)=>{
        return res;
      }));
  }
  sendPassword(email: string) {
    return this.http
      .post<any>(Constant.API_ENDPOINT + 'ForgetPassword', { Email: email,Subject:"",Body:"" })
      .pipe(map((res)=>{
        return res;
      }));
  }

  getAllUsers()
  {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}User/users`)
      .pipe(map((res)=>{
        return res;
      }));
  }

  adduser(user: any)
  {
    return this.http.post<any>(`${Constant.API_ENDPOINT}User/adduser`,user)
    .pipe(map(res => {
      return res;
    }));
  }

  cloneUser(cloneUser: any)
  {
    return this.http.post<any>(`${Constant.API_ENDPOINT}User/clone`,cloneUser)
    .pipe(map(res => {
      return res;
    }));
  }

  importCredentails(srcId: any, DestId: string)
  {
    return this.http.get<any>(`${Constant.API_ENDPOINT}ProducerCodeCredential/${srcId}/${DestId}`)
    .pipe(map(res => {
      return res;
    }));
  }

  changePassword(changePasswordModel: any)
  {
    return this.http.post<any>(`${Constant.API_ENDPOINT}Token/ChangePassword`,changePasswordModel)
    .pipe(map(res => {
      return res;
    }));
  }

  editUser(user: any)
  {
    return this.http.put<any>(`${Constant.API_ENDPOINT}User/updateUser`,user)
    .pipe(map(res => {
      return res;
    }));
  }

  UpdatePasswordEmail(docx:any) {
    return this.http
      .post<any>(Constant.API_ENDPOINT + 'ForgetPassword/UpdatePasswordEmail',docx)
      .pipe(map((res)=>{
        return res;
      }));
  }

  sendSupportEmail(docx:any) {
    return this.http.post<any>(`${Constant.API_ENDPOINT}ForgetPassword/SendSupportEmail`,docx)
    .pipe(map(res => {
      return res;
      }));
    }

    getUsersProdCodes(docx:any)
    {
      //console.log(docx);
      return this.http.post<any>(`${Constant.API_ENDPOINT}User/UserProdCodes`,docx)
      .pipe(map(res => {
        return res;
        }));
    }

    deleteActiveUser(userid: any)
    {
      console.log(userid);
      return this.http
        .get<any>(`${Constant.API_ENDPOINT}User/DeleteUsers/${userid}`)
        .pipe(map((res)=>{
          return res;
        }));
    }
}
