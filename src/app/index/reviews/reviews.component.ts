import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../../shared/services/auth.service";
import { IndexComponent } from './../index.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CartComponent } from './../cart/cart.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.styl']
})
export class ReviewsComponent implements OnInit {

  public allReviewUser: any[] = [];
  private getListReviewSub: any;
  public notReviewTitle:boolean = false;

  constructor(
    public indexComponent: IndexComponent,
    public authService: AuthService,
    public afs: AngularFirestore,
    private router: Router,
    public cartComponent: CartComponent
  ) { }

  ngOnInit(): void {
    this.getReviews();
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

  getReviews() {
    this.getListReviewSub = this.afs
      .collection('reviews', ref => ref.where('user', '==', this.authService.userData.uid))
      .valueChanges().subscribe((res: any) => {
        this.allReviewUser = res;
        this.allReviewUser.length === 0 ? this.notReviewTitle = true : this.notReviewTitle = false;
      });
  }

  showSaveFavorite(category: string, parent: string) {
    this.router.navigate([`/home/cart/${category}`]);
    setTimeout(() => {
      this.cartComponent.getItem(parent);
    }, 300);
  }

  signOut() {
    this.authService.SignOut();
    this.indexComponent.hideContainer();
    this.getListReviewSub.unsubscribe();
  }

}
