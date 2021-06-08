import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CompanyFormationComponent } from './company-formation/company-formation.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CompanyCabinetRoutingModule } from './company-cabinet/company-cabinet-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { TruncateModule } from 'ng2-truncate';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    CompanyFormationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CompanyCabinetRoutingModule,
    ChartsModule,
    BrowserModule,
    FormsModule,
    TruncateModule
  ],
  providers: [
    AuthComponent,
    LoginComponent
  ]
})
export class AuthModule { }
