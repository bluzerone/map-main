import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { IndexComponent } from './../index.component';
import { BaseService } from './../../base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.styl']
})
export class CartComponent implements OnInit {

  private page: any;
  public result: any[] = [];
  public getitemid: string;
  public rotate: boolean = true;
  public rotateTime: boolean = true;

  private getDocSub:any;
  private getDbResultSub: any;
  private getItemSub: any;
  private getReviewsSub: any;
  private getItemSubFoto: any;
  private discountStatCreate: any;
  private companySampleSub: any;
  private activatedRouteSub: any;
  public sortingTitle: string;
  public sortingEvent: string;
  public sortingEventFoto: string;
  private fotoFilterSub: any;
  private fotoFilterSubCategory: any;

  public companySampleAdditionallySub: any;

  public workingHours: any;
  public workingHoursSub: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private indexComponent: IndexComponent,
    private baseService: BaseService,
    private afs: AngularFirestore,
  ) { }

  ngAfterContentInit() {
    this.activatedRoute.params.subscribe(params => {
      this.page = params['id'];
      this.getDocSub = this.afs
        .collection('categoryMain')
        .doc('YgTqOZjnDVdVsA1eZf0Z')
        .valueChanges().subscribe((res: any) => {
          res.base.forEach(element => {
            if (element.id === this.page) {
              document.querySelector<HTMLInputElement>('.search__input').value = element.title;
            }
          });
        });
        this.getDbResult('reclamPosition');
    });
  }

  getDbResult(event) {
    this.getDbResultSub = this.afs
      .collection('organizationData', ref => ref.where('category', '==', this.page).orderBy(event, 'asc'))
      .valueChanges().subscribe((res: any) => {
        this.result = res;
        this.getDbResultSub.unsubscribe();
      });
  }

  ngOnInit(): void {
    document.querySelector<HTMLElement>('.navigate__container__add').removeAttribute('style');
    document.querySelector<HTMLElement>('.navigate__container__first').style.width = '760px';
    document.querySelector<HTMLElement>('.navigate__container').style.width = '760px';
    document.querySelector<HTMLElement>('.navigate__container__last').style.width = '760px';
    document.querySelector<HTMLElement>('#routerOutlet').style.width = '760px';
    document.querySelector<HTMLElement>('.navigate__header').style.width = '760px';
    document.querySelector<HTMLElement>('.navigate__header').style.backgroundImage = 'none';
    document.querySelector<HTMLElement>('.navigate__header__title').style.textShadow = 'none';
    document.querySelector<HTMLElement>('.navigate__header__title').style.color = '#a3a3a3';
    document.querySelector<HTMLElement>('.search__input').style.boxShadow = 'none';
    document.querySelector<HTMLElement>('.search__input').style.borderBottom = '1px solid #a3a3a3';
    document.querySelector<HTMLElement>('.search__input').style.borderRadius = '0px';
    document.querySelector<HTMLElement>('.search__input').style.width = '690px';
    document.querySelector<HTMLElement>('.navigate__header__logo').setAttribute("src", "assets/serchIcon.png");
    document.querySelector<HTMLElement>('.navigate__header__logo').style.marginLeft = "8px";
    document.querySelector<HTMLElement>('.close__input').style.opacity = "1";
  }

  ngOnDestroy() {
    document.querySelector<HTMLElement>('.navigate__container__add').removeAttribute('style');
    document.querySelector<HTMLElement>('#routerOutlet').removeAttribute('style');
    this.indexComponent.cart = null;
    document.querySelector<HTMLElement>('.navigate__container__add__list').removeAttribute('style');
    document.querySelector<HTMLElement>('.containerCart').removeAttribute('style');
    if (document.querySelector<HTMLElement>('.image__rubrics')) {
      document.querySelector<HTMLElement>('.image__rubrics').style.display = 'block';
    }
    this.indexComponent.centerControl = [53.14338912064799, 29.2131983239812];
    this.indexComponent.zoom = '12';

    this.getDocSub ? this.getDocSub.unsubscribe() : null;
    this.getDbResultSub ? this.getDbResultSub.unsubscribe() : null;
    this.getReviewsSub ? this.getReviewsSub.unsubscribe() : null;
    this.getItemSub ? this.getItemSub.unsubscribe() : null;
    this.getItemSubFoto ? this.getItemSubFoto.unsubscribe() : null;
    this.result = [];
  }

  getItem(e) {
    this.getitemid = e;
    this.indexComponent.placemark = [];
    this.indexComponent.rewiewsCart = [];
    this.indexComponent.descriptionShowCart = false;
    this.getItemSub = this.afs
      .collection('organizationData')
      .doc(e)
      .valueChanges().subscribe((res: any) => {
        this.indexComponent.cart = res;
        this.indexComponent.placemark.push(res);
        this.indexComponent.centerControl = res.geometry;
        this.indexComponent.zoom = '15';
        this.closeOpenCart(res);
        this.getItemSub.unsubscribe();
      });
    this.indexComponent.hideFoto()
    this.getItemSubFoto = this.afs
      .collection('photo', ref => ref.where('org', '==', e).where('moderate', '==', false))
      .valueChanges().subscribe((res: any) => {
        this.indexComponent.allFotoCart = res;
        if (res.length === 0) {
          this.indexComponent.emptyPhoto = true;
          this.afs.collection('organizationData').doc(e).update({
            photo: false
          });
        } else {
          this.afs.collection('organizationData').doc(e).update({
            photo: true
          });
          this.indexComponent.emptyPhoto = false;
        }
        this.getItemSubFoto.unsubscribe();
      });
    document.querySelector<HTMLElement>('.navigate__container').style.width = '1070px';
    document.querySelector<HTMLElement>('.navigate__container__first').style.width = '750px';
    document.querySelector<HTMLElement>('.navigate__container__last').style.width = '1070px';
    document.querySelector<HTMLElement>('.navigate__container__add__list').style.display = 'none';
    document.querySelector<HTMLElement>('.containerCart').style.marginLeft = '-300px';
    if (document.querySelector<HTMLElement>('.image__rubrics')) {
      document.querySelector<HTMLElement>('.image__rubrics').style.display = 'none';
    }

    setTimeout(() => {
      document.querySelector<HTMLElement>('.navigate__container__add').style.display = 'block';
      document.querySelector<HTMLElement>('.navigate__container__add').style.width = '310px';
      document.querySelector<HTMLElement>('.navigate__container__add').style.opacity = '1';
    }, 200);


    this.getReviewsSub = this.afs
      .collection('reviews', ref => ref
        .where('state', '==', 'publish')
        .where('parent', '==', e)
      )
      .valueChanges().subscribe((res: any) => {
        if (res.length !== 0) {
          let state = 0;
          let appReit;
          this.indexComponent.rewiewsCart = res;
          this.indexComponent.rewiewsLength = res.length;
          res.forEach(element => {
            state += Number(element.appraisal)
          });
          appReit = Number(state) / Number(this.indexComponent.rewiewsLength);
          this.afs.collection('organizationData').doc(e).update({
            appraisal: Number(appReit)
          });
        }
      });
      const nowDate = moment(new Date()).format('YYYY.MM.DD');
      this.discountStatCreate = this.afs
        .collection('organizationData')
        .doc(e)
        .collection('discountStat', ref => ref.where('title', '==', nowDate ))
        .valueChanges({ idField: 'id' }).subscribe((response: any) => {
          if (response.length === 0) {
            this.afs
              .collection('organizationData')
              .doc(e)
              .collection('discountStat')
              .doc()
              .set({
                title: nowDate,
                count: 0
              });
          }
          this.discountStatCreate.unsubscribe();
        })
  }

  activeRotate() {
    this.rotate ? this.rotate = false : this.rotate = true
  }

  activeRotateTime() {
    this.rotateTime ? this.rotateTime = false : this.rotateTime = true
  }

  closeOpenCart ( res:any ) {
    const dayNow = moment(new Date()).format('dd.');
    const timeNow = moment(new Date()).format('HH:mm');
    const isTimeBetween = function(startTime, endTime, serverTime) {
      let start = moment(startTime, "H:mm")
      let end = moment(endTime, "H:mm")
      let server = moment(serverTime, "H:mm")
      if (end < start) {
          return server >= start && server<= moment('23:59:59', "h:mm:ss") || server>= moment('0:00:00', "h:mm:ss") && server < end;
      }
      return server > start && server < end
    }
    if (res) {
      res.orgWorkingTime.forEach(element => {
        if (dayNow === element.day.toLowerCase()) {
          this.indexComponent.openCloseCompanyTime = isTimeBetween(element.startTime, element.endTime, timeNow);
          this.afs.collection('organizationData').doc(res.id).update({
            open: this.indexComponent.openCloseCompanyTime
          });
          if (element.startTime === 'Вых.') {
            this.indexComponent.currentOpeningTime = ` Выходной`;
          } else {
            this.indexComponent.currentOpeningTime = ` с ${element.startTime} до ${element.endTime}`;
          }
        }
      });
    }
  }

  companySample(event) {
    this.sortingTitle = event;

    if (this.sortingEvent) {
      this.companySampleSub = this.afs
        .collection('organizationData', ref => {
          if (this.workingHours) {
            return ref.where('category', '==', this.page).where(this.sortingEvent, '==', true).where(this.workingHours, '==', true).orderBy(event, 'desc')
          } else {
            return ref.where('category', '==', this.page).where(this.sortingEvent, '==', true).orderBy(event, 'desc')
          }
        })
        .valueChanges().subscribe((res: any) => {
          this.result = res;
          this.companySampleSub.unsubscribe();
        });
    } else {
      this.companySampleSub = this.afs
        .collection('organizationData', ref => {
          if (this.workingHours) {
            return ref.where('category', '==', this.page).where(this.workingHours, '==', true).orderBy(event, 'desc')
          } else {
            return ref.where('category', '==', this.page).orderBy(event, 'desc')
          }

        })
        .valueChanges().subscribe((res: any) => {
          this.result = res;
          this.companySampleSub.unsubscribe();
        });
    }
  }

  companySampleAdditionally(event) {
    if (this.sortingEvent === event) {
      this.sortingEvent = null;
      this.sortingTitle ? this.sortingTitle : this.sortingTitle = 'reclamPosition';
      this.companySampleAdditionallySub = this.afs
        .collection('organizationData', ref => {
          if (this.workingHours) {
            return ref.where('category', '==', this.page).where(this.workingHours, '==', true).orderBy(this.sortingTitle, 'desc')
          } else {
            return ref.where('category', '==', this.page).orderBy(this.sortingTitle, 'desc')
          }

        }
      )
        .valueChanges().subscribe((res: any) => {
          this.result = res;
          this.companySampleAdditionallySub.unsubscribe();
        });
    } else {
      this.sortingEvent = event;
      this.sortingEventFoto = null;
      this.sortingTitle ? this.sortingTitle : this.sortingTitle = 'reclamPosition';
      this.companySampleAdditionallySub = this.afs
        .collection('organizationData', ref => {
          if (this.workingHours) {
            return ref.where('category', '==', this.page).where(event, '==', true).where(this.workingHours, '==', true).orderBy(this.sortingTitle, 'desc')
          } else {
            return ref.where('category', '==', this.page).where(event, '==', true).orderBy(this.sortingTitle, 'desc')
          }
        }
        )
        .valueChanges().subscribe((res: any) => {
          this.result = res;
          this.companySampleAdditionallySub.unsubscribe();
        });
    }
  }

  workingHoursFunc(event) {
    if (this.workingHours === event) {
      this.workingHours = null;
      this.sortingTitle ? this.sortingTitle : this.sortingTitle = 'reclamPosition';
      this.companySampleAdditionallySub = this.afs
        .collection('organizationData', ref => {
            if (this.sortingEvent) {
              return ref.where('category', '==', this.page).where(this.sortingEvent, '==', true).orderBy(this.sortingTitle, 'desc');
            } else {
              return ref.where('category', '==', this.page).orderBy(this.sortingTitle, 'desc');
            }
          }
        )
        .valueChanges().subscribe((res: any) => {
          this.result = res;
          this.companySampleAdditionallySub.unsubscribe();
        });
    } else {
      this.workingHours = event;
      this.sortingTitle ? this.sortingTitle : this.sortingTitle = 'reclamPosition';
      this.companySampleAdditionallySub = this.afs
        .collection('organizationData', ref => {
            if (this.sortingEvent) {
              return ref.where('category', '==', this.page).where(this.sortingEvent, '==', true).where(event, '==', true).orderBy(this.sortingTitle, 'desc');
            } else {
              return ref.where('category', '==', this.page).where(event, '==', true).orderBy(this.sortingTitle, 'desc');
            }
          }
        )
        .valueChanges().subscribe((res: any) => {
          this.result = res;
          this.companySampleAdditionallySub.unsubscribe();
        });
    }
  }
}
