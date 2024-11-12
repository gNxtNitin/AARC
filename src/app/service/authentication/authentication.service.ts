import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Constant} from '../../constant/constant';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient,  private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(Constant.API_ENDPOINT + 'token', {UserName:username, Password: password})
    .pipe(map(res => {
      localStorage.setItem("token",res['token']);
       return res['token'];
    }));

  }

  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }
}
