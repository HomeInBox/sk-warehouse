import { Injectable } from '@angular/core';

import { HttpHeaders,HttpClient } from '@angular/common/http';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class HttpService{
  private LoginDetail:any;
  constructor(
    private httpClient : HttpClient
  ) {
      this.LoginDetail = localStorage.getItem("Authorization");
    }


  setContentType(
    contentType: string,
    params?: string | URLSearchParams | { [key: string]: any }
  ) {
    debugger;
    contentType || 'application/json';
    const token = JSON.parse(this.LoginDetail)?.token;
    const headers = new HttpHeaders({ 'Content-Type': contentType ,'Authorization':`Bearer ${token}`});
    const options = params
      ? { headers: headers }
      : { headers: headers };
    return options;
  }

  post<T>(url:string,data:any):Observable<T>{
    const options = this.setContentType('application/json');
    const response = this.httpClient.post<T>(environment.UrlApiGateway+url,data,options);
    return response;
  }

  get<T>(url:string,data?:any):Observable<T>{
    const options = this.setContentType('application/json');
    let queryString = this.getQueryString(data,url);
    const response = this.httpClient.get<T>(environment.UrlApiGateway+url+queryString,options);
    return response;
  }

  getQueryString(queryParam: any, url?: string){
    let queryString = '';
    let urlHaveQueryParam = false;
    if(url){
      urlHaveQueryParam = url.indexOf('?') == -1 ? false : true;
    }
    if (queryParam) {
      queryString = urlHaveQueryParam ? '&' : '?';
      for (var key in queryParam) {
        let val = queryParam[key]
        if (val) {
          if(typeof val == 'object'){  // get value from field autocomplete
            if (Array.isArray(val)){
              val.forEach(item => {
                queryString += key + '=' + encodeURIComponent(item) + '&';
              })
            }else {
              queryString += key + '=' + encodeURIComponent(<string>Object.values(val)[0]) + '&';
            }
          }else{
            queryString += key + '=' + encodeURIComponent(val) + '&';
          }
        }
      }
    }
    return queryString;
  }

}
