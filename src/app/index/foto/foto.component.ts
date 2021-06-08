import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from "./../../shared/services/auth.service";
import { IndexComponent } from "./../index.component";
import { BaseService } from './../../base.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.styl']
})
export class FotoComponent implements OnInit {

  public indexImage: any;

  private getFotoUser: any;
  public fotoArray: any[] = [];
  public notFotoTitle: boolean = false;

  constructor(
    public authService: AuthService,
    public indexComponent: IndexComponent,
    public baseService: BaseService,
    public afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getFotoUser = this.afs
      .collection('photo', ref => ref.where('user', '==', this.authService.userData.uid).where('moderate', '==', false))
      .valueChanges().subscribe((res: any) => {
        this.fotoArray = res;
        this.fotoArray.length === 0 ? this.notFotoTitle = true : this.notFotoTitle = false;
      });

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

  showFoto(index) {
    this.indexComponent.homeFotoShow = true;
    this.indexImage = index;
    this.indexComponent.showFoto(index);
    this.indexComponent.allFotoCart = this.fotoArray;
  }

  ngOnDestroy(): void {
    this.indexComponent.hideFoto();
    this.getFotoUser ? this.getFotoUser.unsubscribe() : null;
  }

}
