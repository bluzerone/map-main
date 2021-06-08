import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IndexModule } from './index/index.module';
import { AuthModule } from './auth/auth.module';
import { CompanyCabinetModule } from './auth/company-cabinet/company-cabinet.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { AuthService } from "./shared/services/auth.service";

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  VKLoginProvider
} from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';

import {MatSnackBarModule} from '@angular/material/snack-bar';

const mapConfig: YaConfig = {
  apikey: '5fc20e6d-949a-4930-92de-32d9299d43b7',
  lang: 'ru_RU',
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CompanyCabinetModule,
    IndexModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: VKLoginProvider.PROVIDER_ID,
            provider: new VKLoginProvider(
              '7798636'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
