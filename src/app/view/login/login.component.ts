import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from './login.component.service';
import {AuthorizationService} from '../../share/authorizationService/authorizationService'
import {loginReq} from '../../model/login.model'
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(
    private fb:FormBuilder,
    private _router:Router,
    private _LoginService:LoginService,
    private _AuthorizationService:AuthorizationService,
    private _MessageService:MessageService
    ){

  }

  Formlogin : FormGroup = new FormGroup('');

  ngOnInit(): void {
    this.Formlogin = this.getForm();
  }

  getForm(){
   return this.fb.group({
      username:[null],
      password:[null]
    });
  }

  Onsubmit(){
    let data = this.Formlogin.getRawValue();
    let result : loginReq = {
      password : data?.password,
      username : data?.username
    }
    this._LoginService.Login(result).subscribe(p => {
      console.log(p);
      if(p.IsSuccess){
        this._AuthorizationService.SetCookie(p?.Data);
        localStorage.setItem('Authorization',JSON.stringify(p?.Data));
        this._router.navigate(['/home']);
      }
      else{
        this._MessageService.add({severity:'warn', summary: 'Warnung', detail: 'login Fail'});
      }
    });
  }

}
