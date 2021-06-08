import { Component, OnInit } from '@angular/core';
import { BaseService } from "./../../base.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
  }

}
