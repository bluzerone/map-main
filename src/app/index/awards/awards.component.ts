import { Component, OnInit } from '@angular/core';
import { IndexComponent } from './../index.component';
import { Injectable } from '@angular/core';
import { AuthService } from "./../../shared/services/auth.service";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.styl']
})
export class AwardsComponent implements OnInit {
  public userPhotoCount: number;

  public getListReviewSub: any;
  public allReviewUserLength: any;
  public getFotoUser: any;
  public fotoArrayLength: number;
  public summaryUserAwardsPoints: number;
  public notAwardsTitle:boolean = false;
  public userAwardsSub: any;
  public userAwards: any[] = [];

  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,
    public indexComponent: IndexComponent,
  ) { }

  ngOnInit(): void {
    this.getFotoUser = this.afs
      .collection('photo', ref => ref.where('user', '==', this.authService.userData.uid).where('moderate', '==', false))
      .valueChanges().subscribe((res: any) => {
        this.fotoArrayLength = res.length
      });

    this.getListReviewSub = this.afs
      .collection('reviews', ref => ref.where('user', '==', this.authService.userData.uid).where('content.length', '>=', '100'))
      .valueChanges().subscribe((res: any) => {
        if (res) {
          this.allReviewUserLength = res.length
          this.summaryUserAwardsPoints = this.allReviewUserLength + this.fotoArrayLength
          this.summaryUserAwardsPoints < 30 ? this.notAwardsTitle = true : this.notAwardsTitle = false;
          this.setUserAwords();
        }

      });
    this.setUserAwords();
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

  setUserAwords() {
    let arrayAwords = [];
    if(this.fotoArrayLength >= 30) {
      arrayAwords.push('Я модель')
      this.afs
        .collection('users')
        .doc(this.authService.userData.uid)
        .update({
          awords: arrayAwords
        });
    };
    if (this.summaryUserAwardsPoints >= 30) {
      arrayAwords.push('Бронзовый статус')
      this.afs
        .collection('users')
        .doc(this.authService.userData.uid)
        .update({
          awords: arrayAwords
        });
    };
    if (this.summaryUserAwardsPoints >= 60) {
      arrayAwords.push('Серебряный статус')
      this.afs
        .collection('users')
        .doc(this.authService.userData.uid)
        .update({
          awords: arrayAwords
        });
    };
    if (this.summaryUserAwardsPoints >= 90) {
      arrayAwords.push('Золотой статус')
      this.afs
        .collection('users')
        .doc(this.authService.userData.uid)
        .update({
          awords: arrayAwords
        });
    };
    if (arrayAwords.length === 0) {
      this.afs
        .collection('users')
        .doc(this.authService.userData.uid)
        .update({
          awords: arrayAwords
        });
    }
  }

  signOut() {
    this.authService.SignOut();
    this.indexComponent.hideContainer();
  }

  ngOnDestroy(): void {
    this.getFotoUser ? this.getFotoUser.unsubscribe() : null;
    this.getListReviewSub? this.getListReviewSub.unsubscribe(): null;
  }


}
