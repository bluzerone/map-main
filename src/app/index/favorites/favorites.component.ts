import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { IndexComponent } from './../index.component';
import { BaseService } from './../../base.service';
import { AuthService } from "./../../shared/services/auth.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { CartComponent } from './../cart/cart.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.styl']
})
export class FavoritesComponent implements OnInit {


  private getListFavoriteSub: any;
  public favoritesFolders: any[] = [];
  public contentFavorite: any[] = [];
  public currentlySelected: any;
  public notList: boolean = false;
  public renameRes: any;
  public renameModel: string;

  constructor(
    public indexComponent: IndexComponent,
    private baseService: BaseService,
    public authService: AuthService,
    public afs: AngularFirestore,
    private router: Router,
    public cartComponent: CartComponent
  ) { }

  ngOnInit(): void {
      this.getListFavorite();
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

    signOut() {
      this.authService.SignOut();
      this.indexComponent.hideContainer();
    }

    getListFavorite() {
      this.getListFavoriteSub = this.afs
        .collection('users')
        .doc(this.authService.userData.uid)
        .collection('favorites')
        .valueChanges().subscribe((res: any) => {
          this.favoritesFolders = res;
        });
    }

    getContentFolder(id) {
      this.currentlySelected = id;
      this.favoritesFolders.forEach(element => {
        if (element.id === id) {
          this.contentFavorite = element.content;
          this.contentFavorite.length === 0 ? this.notList = true : this.notList = false;
        }
      });
    }

    removeItemList(id) {
      let name;
      let newArray = [];
      this.baseService.openSnackBar("Компания успешно удалена из избранного", "", 3000, "right", "top", "");
      let list = this.contentFavorite.filter(item => item.id !== id);
      this.contentFavorite = list;
      this.afs
        .collection('users')
        .doc(this.authService.userData.uid)
        .collection('favorites')
        .doc('favorite')
        .update({
          content: list
        });
      this.contentFavorite.length === 0 ? this.notList = true : this.notList = false;
    }

    showSaveFavorite(category: string, parent: string) {
      this.router.navigate([`/home/cart/${category}`]);
      setTimeout(() => {
        this.cartComponent.getItem(parent);
      }, 300);
    }

    rename(id: any, name: any) {
      this.renameRes = id;
      this.renameModel = name;
    }

    renameReq(id: any, name: any) {
      this.afs
        .collection('users')
        .doc(this.authService.userData.uid)
        .collection('favorites')
        .doc('favorite')
        .update({
          name: this.renameModel
        });

      this.renameRes = null;
    }

    ngOnDestroy(): void {
      this.getListFavoriteSub ? this.getListFavoriteSub.unsubscribe() : null;
    }

}
