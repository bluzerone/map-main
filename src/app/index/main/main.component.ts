import { Component, OnInit } from '@angular/core';
import { IndexComponent } from './../index.component';
import { BaseService } from './../../base.service';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CartComponent } from './../cart/cart.component';
import { AuthService } from "./../../shared/services/auth.service";
import * as moment from 'moment'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl']
})
export class MainComponent implements OnInit {

  public resultAddContainer:any[];
  public iconFavorites: any[] = [];
  public selectCategory: string;

  private getCatSub:any;
  private showListIconSub:any;
  private organizationDataSub: any;

  private getInterestingSub: any;
  public getInterestingPhoto: any[] = [];

  public expandInterestingLine: boolean = false;
  private getDiscountUser: any;
  private discountStat: any;

  constructor(
    private indexComponent: IndexComponent,
    public baseService: BaseService,
    public afs: AngularFirestore,
    private router: Router,
    public cartComponent: CartComponent,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.iconFavorites = [];
    this.getCatSub = this.afs
    .collection('categoryMain')
    .doc('YgTqOZjnDVdVsA1eZf0Z')
    .valueChanges().subscribe((res: any) => {
      this.getCatSub.unsubscribe();
      this.iconFavorites = [];
      res.base.forEach(element => {
        if (!element.parent) {
          this.iconFavorites.push(element);
        }
      });
    });
    this.getInteresting();
  }

  showListIcon(id: string) {
    this.selectCategory = id;
    this.indexComponent.base = [];
    this.indexComponent.placemark = [];
    this.showListIconSub = this.afs
      .collection('categoryMain')
      .doc('YgTqOZjnDVdVsA1eZf0Z')
      .valueChanges().subscribe((res: any) => {
        this.showListIconSub.unsubscribe();
        res.base.forEach((element, index, array) => {
          if (element.id === id) {
            this.indexComponent.fotoRubrics = element.image;
          }
          if (element.parent === id) {
            this.indexComponent.base.push(element);
          }
        });
      });

    this.organizationDataSub = this.afs
      .collection('organizationData')
      .valueChanges().subscribe((res: any) => {
        this.organizationDataSub.unsubscribe();
        res.forEach((element, index, array) => {
          if (element.parent === id) {
            this.indexComponent.placemark.push(element);
          }
        });
      });

    let interestingContainer = document.querySelector<HTMLElement>('.reclam__container__favorite');
    let navigateContainer = document.querySelector<HTMLElement>('.navigate__container');
    let navigateContainerLast = document.querySelector<HTMLElement>('.navigate__container__last');
    let navigateContainerAdd = document.querySelector<HTMLElement>('.navigate__container__add');
    let iconFavoritesContainer = document.querySelector<HTMLElement>('.icon__favorites__container');
    let bookmark = <HTMLElement[]><any>document.querySelectorAll('.bookmark');
    for (let index = 0; index < bookmark.length; index++) {
      bookmark[index].style.boxShadow = 'none'
    }

    interestingContainer.style.opacity = '0';
    navigateContainer.style.width = '760px';
    navigateContainerLast.style.width = '760px';
    iconFavoritesContainer.style.height = 'auto';
    setTimeout(() => {
      interestingContainer.style.display = 'none';
      navigateContainerAdd.style.display = 'block';
      navigateContainerAdd.style.opacity = '1';
    }, 200);
  }

  adClick() {
    this.router.navigate([`/home/cart/23`]);
    setTimeout(() => {
      this.cartComponent.getItem('9sbu3e1Z6vDi8OExZzQQ');
    }, 300);
  }

  async getInteresting() {
    this.getInterestingPhoto = [];
    this.getInterestingSub = await this.afs
      .collection('organizationData')
      .valueChanges().subscribe((res: any) => {
        this.getInterestingSub.unsubscribe();
        res.forEach(element => {
          this.getInterestingPhoto.push(element);
        });
      });
  }

  expandInteresting(){
    if (!this.expandInterestingLine) {
      this.expandInterestingLine = true;
      document.querySelector<HTMLElement>('.interesting__item__content').style.height = 'auto';
    } else {
      this.expandInterestingLine = false;
      document.querySelector<HTMLElement>('.interesting__item__content').style.height = '356px';
    }
  }

  addDiscount(cart) {
    if (this.authService.userData) {
      const randomId = Math.random().toString(36).substring(2);
      const nowDate = moment(new Date()).format('DD.MM');
      this.getDiscountUser = this.afs.
      collection('allDiscounts', ref => ref.where('org', '==', cart.id).where('user', '==', this.authService.userData.uid).where('arhive', '==', false)).
      valueChanges().subscribe((res: any) => {
        this.getDiscountUser.unsubscribe();
        if (res.length > 0) {
          this.baseService.openSnackBar(`У вас уже есть полученная скидка от - ${cart.name}`, "", 3000, "right", "top", "error-dialog-red");
        } else {
          this.afs.collection('allDiscounts').doc(randomId).set({
              id: randomId,
              user: this.authService.userData.uid,
              org: cart.id,
              img: cart.preview,
              discount: cart.discount,
              name: cart.name,
              category: cart.category,
              arhive: false,
              endDate: moment(new Date()).add(3, 'days').toISOString()
            });

          this.baseService.openSnackBar(`Вы получили скидку от - ${cart.name}, в размере ${cart.discount}%`, "", 3000, "right", "top", "");
          this.discountStat = this.afs
            .collection('organizationData')
            .doc(cart.id)
            .collection('discountStat', ref => ref.where('title', '==', moment(new Date()).format('YYYY.MM.DD') ))
            .valueChanges({ idField: 'id' }).subscribe((response: any) => {
              this.discountStat.unsubscribe();
              this.afs
                .collection('organizationData')
                .doc(cart.id)
                .collection('discountStat')
                .doc(response[0].id)
                .update({
                  count: ++response[0].count
                });
            })
        }
      });
    }else{
      this.indexComponent.openModal();
    }
  }

  ngOnDestroy() {
    this.getCatSub ? this.getCatSub.unsubscribe() : null;
    this.showListIconSub ? this.showListIconSub.unsubscribe() : null;
    this.organizationDataSub ? this.organizationDataSub.unsubscribe() : null;
  }

}
