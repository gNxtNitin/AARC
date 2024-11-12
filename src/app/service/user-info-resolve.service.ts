import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoResolveService implements Resolve<Observable<any>>{

  constructor(private userService:UserService) { }
  
  resolve(route: ActivatedRouteSnapshot):Observable<any>{  
    return this.userService.getUserDetail(); 
  }
}
