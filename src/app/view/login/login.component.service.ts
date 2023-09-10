import { Injectable } from '@angular/core';
import {HttpService} from '../../share/httpService/http.service';
import {loginReq,resLogin} from '../../model/login.model'
import {ResponseModel} from '../../model/Response.model'
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class LoginService{
  constructor(private _HttpService:HttpService){

  }
  Getlabel(){
    return this._HttpService.get('');
  }

  Login(data:loginReq):Observable<ResponseModel<resLogin>>{
     return this._HttpService.post('authorization/api/login',data);
  }
}
