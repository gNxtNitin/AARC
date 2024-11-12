import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class NewsEventService {

  constructor(private http: HttpClient) { 
  }

  getNewsAndEvent() {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}NewsAndEvent`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteNewsAndEvent(newsId:string) {
    return this.http
      .delete<any>(`${Constant.API_ENDPOINT}NewsAndEvent/${newsId}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteTicker(ticker:any) {
    return this.http
      .delete<any>(`${Constant.API_ENDPOINT}Ticker`,{body: ticker})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  addNewsAndEvent(news:any) {
    return this.http
      .post<any>(`${Constant.API_ENDPOINT}NewsAndEvent`, news)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getTickers() {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}Ticker`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  postTickers(ticker:any) {
    return this.http
    .post<any>(`${Constant.API_ENDPOINT}Ticker`, ticker)
    .pipe(
      map((res) => {
        return res;
      })
    );
  }

  whosOutTodayList() {
    return this.http
      .get<any>(`${Constant.API_ENDPOINT}BambooHr/GetWhosOutList`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
