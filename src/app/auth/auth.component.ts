import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BaseService } from "./../base.service";
import { routeTransitionAnimationsAuth } from './../route-animation-auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.styl'],
  animations: [routeTransitionAnimationsAuth]
})
export class AuthComponent implements OnInit {

  public showOutlet: boolean = false;
  private getOrganizationData: any;

  constructor(
    private router: Router,
    public baseService: BaseService,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    let myOrg = sessionStorage.getItem('org');
    if (myOrg) {
      this.getOrganizationData = this.afs
        .collection('organizationData')
        .doc(myOrg)
        .valueChanges().subscribe((res: any) => {
          this.baseService.myOrganization = res;
          if (res) {
            setTimeout(() => {
              this.showOutlet = true;
            }, 500);
          }
          this.getOrganizationData.unsubscribe();
        })
      myOrg = null;
      this.router.navigate(['/auth/company-cabinet/company-data']);
    } else {
      setTimeout(() => {
        this.showOutlet = true;
      }, 1000);
      this.router.navigate(['/auth/login']);
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
   }

}
