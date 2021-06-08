import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../../shared/services/auth.service";
import { IndexComponent } from './../index.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CartComponent } from './../cart/cart.component';
import * as moment from 'moment';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.styl']
})
export class DiscountComponent implements OnInit {

  private getDiscSub: any;
  public allUserDisc: any[] = [];
  public allUserDiscArhive: any[] = [];
  public notDisc: boolean = false;
  public toggleDiscount:boolean = true;

  constructor(
    private indexComponent: IndexComponent,
    public authService: AuthService,
    private router: Router,
    public afs: AngularFirestore,
    public cartComponent: CartComponent
  ) { }

  ngOnInit(): void {
    this.getDiskount();
    document.querySelector<HTMLInputElement>('.search__input').value = '';
    document.querySelector<HTMLElement>('#searchComponent').style.display = "block";
    document.querySelector<HTMLElement>('.navigate__header').style.backgroundImage = 'none';
    document.querySelector<HTMLElement>('.navigate__header__title').style.textShadow = 'none';
    document.querySelector<HTMLElement>('.navigate__header__title').style.color = '#a3a3a3';
    document.querySelector<HTMLElement>('.search__input').style.boxShadow = 'none';
    document.querySelector<HTMLElement>('.search__input').style.borderBottom = '1px solid #a3a3a3';
    document.querySelector<HTMLElement>('.search__input').style.borderRadius = '0px';
    document.querySelector<HTMLElement>('.search__input').style.width = '690px';
    document.querySelector<HTMLElement>('.navigate__header__logo').setAttribute("src", "assets/serchIcon.png");
    document.querySelector<HTMLElement>('.navigate__header__logo').style.marginLeft = "8px";
    document.querySelector<HTMLElement>('.navigate__container').style.width = '760px';
    document.querySelector<HTMLElement>('.navigate__container__last').style.width = '760px';
    document.querySelector<HTMLElement>('.navigate__container__first').style.width = '760px';
    if (document.querySelector<HTMLElement>('.icon__favorites__container')) {
      document.querySelector<HTMLElement>('.icon__favorites__container').style.height = 'auto';
    }
    document.querySelector<HTMLElement>('.navigate__container__add').style.display = 'none';
    document.querySelector<HTMLElement>('#searchComponent').style.display = 'none';
    document.querySelector<HTMLElement>('#routerOutlet').style.display = 'block';
    document.querySelector<HTMLElement>('#routerOutlet').style.opacity = '1';
    let interestingContainer = document.querySelector<HTMLElement>('.reclam__container__favorite');
    let bookmark = <HTMLElement[]><any>document.querySelectorAll('.bookmark');
    for (let index = 0; index < bookmark.length; index++) {
      bookmark[index].style.boxShadow = 'none'
    }
    if (interestingContainer) {
      interestingContainer.style.opacity = '0';
    }
    setTimeout(() => {
      if (interestingContainer) {
        interestingContainer.style.display = 'none';
      }
    }, 200);
  }

  getDiskount() {
    this.toggleDiscount = true;
    this.getDiscSub = this.afs
      .collection('allDiscounts', ref => ref.where('user', '==', this.authService.userData.uid).where('arhive', '==', false))
      .valueChanges().subscribe((res: any) => {
        let itemDate = res.filter(item => item.endDate > moment(new Date()).toISOString());
        this.allUserDisc = itemDate;
        this.allUserDisc.length === 0 ? this.notDisc = true : this.notDisc = false;
      });
  }

  async removeDiskount(id) {
    await this.afs.collection('allDiscounts').doc(id).delete();
  }

  discountsArchive() {
    this.toggleDiscount = false;

    this.getDiscSub = this.afs
      .collection('allDiscounts', ref => ref.where('user', '==', this.authService.userData.uid).where('arhive', '==', true))
      .valueChanges().subscribe((res: any) => {
        this.allUserDiscArhive = res;
        this.allUserDiscArhive.length === 0 ? this.notDisc = true : this.notDisc = false;
      });
  }

  showSaveDiscount(category: string, org: string) {
    this.router.navigate([`/home/cart/${category}`]);
    setTimeout(() => {
      this.cartComponent.getItem(org);
    }, 300);
  }

  signOut() {
    this.authService.SignOut();
    this.indexComponent.hideContainer();
  }

}
