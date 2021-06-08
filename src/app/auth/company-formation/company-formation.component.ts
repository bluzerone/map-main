import { Component, OnInit } from '@angular/core';
import { BaseService } from "./../../base.service";

@Component({
  selector: 'app-company-formation',
  templateUrl: './company-formation.component.html',
  styleUrls: ['./company-formation.component.styl']
})
export class CompanyFormationComponent implements OnInit {

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
  }

  callRegOrganization(name, sphere, address, workingTime, telNumber, email, site){
    this.baseService.sendRegOrganizationData(name, sphere, address, workingTime, telNumber, email, site);
    document.querySelector<HTMLInputElement>('.name').value = '';
    document.querySelector<HTMLInputElement>('.sphere').value = '';
    document.querySelector<HTMLInputElement>('.address').value = '';
    document.querySelector<HTMLInputElement>('.working__time').value = '';
    document.querySelector<HTMLInputElement>('.tel__number').value = '';
    document.querySelector<HTMLInputElement>('.email').value = '';
    document.querySelector<HTMLInputElement>('.site').value = '';
  }

}
