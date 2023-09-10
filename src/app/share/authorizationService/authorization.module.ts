import { NgModule } from "@angular/core";
import {AuthGuard} from './authorization-guand'
import {AuthorizationService} from './authorizationService'

@NgModule({
providers:[
  AuthGuard,
  AuthorizationService
]
})
export class AuthenModule{}
