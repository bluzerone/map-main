import { Component, OnInit } from '@angular/core';
import { BaseService } from "./../../base.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.styl']
})
export class RegistrationComponent implements OnInit {

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
  }

  callAddRequest(city, name, email){
    this.baseService.setAddOrganizationRequest(city, name, email);
    document.querySelector<HTMLInputElement>('.input__city').value = '';
    document.querySelector<HTMLInputElement>('.email__input').value = '';
    document.querySelector<HTMLInputElement>('.organization__input').value = '';
  }
}
