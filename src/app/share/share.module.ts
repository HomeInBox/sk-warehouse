import { NgModule } from '@angular/core';
import {HttpModule} from './httpService/http.module'
import {PrimengShareModule} from './primeNg/primeNg-share.module'
import {AuthenModule} from './authorizationService/authorization.module';

@NgModule({
  imports: [
    PrimengShareModule,
    AuthenModule
],
exports:[
    PrimengShareModule,
    AuthenModule
]
})
export class ShareModule { }
