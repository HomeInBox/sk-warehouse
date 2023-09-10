import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {AuthorizationService} from './authorizationService'
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _AuthorizationService : AuthorizationService,
    private _router: Router,
    private messageService:MessageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let isAuthorize = false;
    if(this._AuthorizationService.CheckAuthorizeCookie()){
      isAuthorize = true;
    }else{
      isAuthorize = false;
      this.messageService.add({severity:'warn', summary: 'Warnung', detail: 'Please login.'});
      this._router.navigate(['/login']);
    }
    return of(isAuthorize);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
