import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';
import { routeTransitionAnimations } from './../route-transition-animations';
import { AuthService } from "./../shared/services/auth.service";
import { Observable, of } from 'rxjs';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { BaseService } from './../base.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, finalize } from 'rxjs/operators';
import * as moment from 'moment'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl'],
  animations: [routeTransitionAnimations]
})
export class IndexComponent implements OnInit {


  public base:any[] = [];
  public baseItemNull: boolean = false;
  public map :any;
  public user: boolean = false;
  public search: string;
  public displayOutlet: boolean = true;
  public fotoRubrics: string;
  public cart: any;
  public zoom: string = '12';
  public centerControl: any[] = [53.14338912064799, 29.2131983239812];
  public descriptionShowCart: boolean = false;
  public descriptionShowTime: boolean = false;
  public navCartActive: string = 'Контакты';
  public rewiewsCart: any[] = [];
  public rewiewsLength: number;
  public categoryCart: any[] = [];
  public subCategoryCart: any[] = [];
  public subCategoryCartId: any;
  public searchCart: string;
  public productCart: any[] = [];
  public reviewFull: any;
  public allFoto: any;
  public showFotoPreview: boolean = false;
  public cartFoto: any[] = [];
  public indexSlideChange: any;
  public homeFotoShow: boolean = false;
  public lengthFoto: number;

  public ref: AngularFireStorageReference;
  public task: AngularFireUploadTask;
  public uploadProgress: Observable<number>;
  public uploadProgressState: boolean = false;
  public uploadProgressTitle: boolean = false;
  public downloadURL: any;

  public allFotoCart:any[] = [];

  public getUserAwardsSub: any;
  public userAwardsArray: any;
  private getDiscountUser: any;
  private discountStat: any;
  private setCountCategorySub: any;
  private setCountCategoryParent: any;
  public openCloseCompanyTime: any;
  public currentOpeningTime: string;

  public forgotBtnToggle: boolean = false;

  public emptyPhoto: boolean = false;
  public showshared: boolean = false;
  public modalDiscount:any = {};
  public introducedDiscount: number;
  public introducedDiscountProduct: string = '';
  public getDiscountModal: boolean = false;
  public errorDiscountModal: boolean = false;
  public getDiscountOrg: any;
  public getDiscountOrgDate: any;
  private getDiscountOrgSub: any;
  public personalDiscountCode: string;


  constructor(
    private router: Router,
    public authService: AuthService,
    public baseService: BaseService,
    private afStorage: AngularFireStorage,
    public afs: AngularFirestore,
  ) {
    moment.locale('ru');
  }

  ngOnInit(): void {
    this.baseService.organizationSubscribe ? this.baseService.organizationSubscribe.unsubscribe() : null;
    setTimeout(() => {
      if (document.querySelector<HTMLElement>('.ymaps-2-1-78-float-button-text')) {
        document.querySelector<HTMLElement>('.ymaps-2-1-78-float-button-text').style.display = 'none';
      }
    }, 600);
  }

  @ViewChild('navdrop') navdrop: ElementRef;
  @ViewChild('navdropContent') navdropContent: ElementRef;

  public navCart = [
    {
      name: 'Контакты',
      active: true
    },
    {
      name: 'Инфо',
      active: false
    },
    {
      name: 'Отзывы',
      active: false
    },
    {
      name: 'Цены',
      active: false
    }
  ]

  navActiveCart(e) {
    this.navCart.forEach(element => {
      if (element.name === e) {
        element.active = true
        this.navCartActive = element.name;
      } else {
        element.active = false
      }
    });
    this.searchCart = '';
  }

  openMenu() {
    this.navdrop.nativeElement.style.display = "block";
    document.querySelector<HTMLElement>('.close__icon__menu').style.display = 'block';
    setTimeout(() => {
      this.navdrop.nativeElement.style.width = "320px";
    }, 50);
    setTimeout(() => {
      this.navdropContent.nativeElement.style.opacity = "1";
      document.querySelector<HTMLElement>('.close__icon__menu').style.opacity = '1';
    }, 400);
  }

  closeMenu(){
    this.navdropContent.nativeElement.style.opacity = "0";
    document.querySelector<HTMLElement>('.close__icon__menu').style.opacity = '0';
    setTimeout(() => {
      this.navdrop.nativeElement.style.width = "0px";
      document.querySelector<HTMLElement>('.close__icon__menu').style.display = 'none';
    }, 200);
    setTimeout(() => {
      this.navdrop.nativeElement.style.display = "none";
    }, 700);
  }

  iconUrl = '/assets/cart.png';

  public placemark = [
    {
      name: 'Бобруйск',
      geometry: [53.14120062671168, 29.224476931585748]
    }
  ];

  public placemarkProperties = {
    hintContent: 'Бобруйск',
    balloonContent: 'Бобруйск',
  }

  public placemarkOptions = {
    iconLayout: 'default#image',
    iconImageHref: '/assets/cart.png',
    iconImageSize: [45, 49]
  };

  public listMenu: any[] = [
    {
      title: 'Уточнения',
      url: '/home/clarifications',
      style: ''
    },
    {
      title: 'Награды',
      url: '/home/awards',
      style: ''
    },
    {
      title: 'Отзывы',
      url: '/home/reviews',
      style: ''
    },
    {
      title: 'Фото',
      url: '/home/foto',
      style: ''
    },
    {
      title: 'Избранное',
      url: '/home/favorites',
      style: ''
    },
    {
      title: 'Мои скидки',
      url: '/home/my-discounts',
      style: 'background:#b92300;color:#fff;'
    }
  ]

  prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
   }


  hideContainer(){
    this.placemark = [{
      name: 'Бобруйск',
      geometry: [53.14120062671168, 29.224476931585748]
    }];
    document.querySelector<HTMLElement>('.navigate__container').style.width = '380px';
    document.querySelector<HTMLElement>('.navigate__container__last').style.width = '380px';
    document.querySelector<HTMLElement>('.navigate__container__first').style.width = '380px';
    document.querySelector<HTMLElement>('.navigate__container__add').removeAttribute('style');
    if (document.querySelector<HTMLElement>('.reclam__container__favorite')) {
      document.querySelector<HTMLElement>('.reclam__container__favorite').removeAttribute('style');
    }
    if (document.querySelector<HTMLElement>('.reclam__container__favorite')) {
      document.querySelector<HTMLElement>('.reclam__container__favorite').removeAttribute('style');
    }
    if (document.querySelector<HTMLElement>('.icon__favorites__container')) {
      document.querySelector<HTMLElement>('.icon__favorites__container').removeAttribute('style');
    }
    document.querySelector<HTMLInputElement>('.search__input').value = '';
    setTimeout(() => {
      this.closeSearch();
    }, 10);
    this.hideFoto()
  }

  openModal() {
    document.querySelector<HTMLElement>('.registration__container').style.display = 'flex';
    setTimeout(() => {
      document.querySelector<HTMLElement>('.registration__container').style.opacity = '1';
    }, 50);
  }

  closeModal() {
    document.querySelector<HTMLElement>('.registration__container').style.opacity = '0';
    setTimeout(() => {
      document.querySelector<HTMLElement>('.registration__container').style.display = 'none';
      this.authService.regVerifiMessage = false;
    }, 300);
  }

  onFocusEvent(event: any){

  }

  onKeyDownEvent(event: any) {

  }

  closeSearch() {
    if (
      document.location.pathname === '/home/main' ||
      document.location.pathname === '/home/favorites' ||
      document.location.pathname === '/home/foto'||
      document.location.pathname === '/home/reviews'||
      document.location.pathname === '/home/awards'||
      document.location.pathname === '/home/clarifications'||
      document.location.pathname === '/home/my-discounts'
    ) {
      this.search = '';
      document.querySelector<HTMLInputElement>('.search__input').value = '';
      document.querySelector<HTMLElement>('.navigate__header').removeAttribute('style');
      document.querySelector<HTMLElement>('.navigate__header__title').removeAttribute('style');
      document.querySelector<HTMLElement>('.search__input').removeAttribute('style');
      document.querySelector<HTMLElement>('.navigate__header__logo').removeAttribute('style');
      document.querySelector<HTMLElement>('.navigate__header__logo').setAttribute("src", "assets/icons/archivement-search.png");
      document.querySelector<HTMLElement>('.navigate__header__container').removeAttribute('style');
      document.querySelector<HTMLElement>('.close__input').removeAttribute('style');
      document.querySelector<HTMLElement>('#routerOutlet').style.display = "block";
      setTimeout(() => {
        document.querySelector<HTMLElement>('#routerOutlet').style.opacity = "1";
      }, 1);
    } else {
      document.querySelector<HTMLInputElement>('.search__input').value = '';
      this.search = '';
      document.querySelector<HTMLElement>('#searchComponent').style.display = "block";
      document.querySelector<HTMLInputElement>('.search__input').focus();
      document.querySelector<HTMLElement>('#routerOutlet').style.opacity = "0";
      setTimeout(() => {
        document.querySelector<HTMLElement>('#routerOutlet').style.display = "none";
      }, 200);
    }

  }

  clickInputEvent() {
    this.displayOutlet = false;
    this.search = document.querySelector<HTMLInputElement>('.search__input').value;
    document.querySelector<HTMLElement>('#searchComponent').style.display = "block";
    document.querySelector<HTMLElement>('.navigate__header').style.backgroundImage = 'none';
    document.querySelector<HTMLElement>('.navigate__header__title').style.textShadow = 'none';
    document.querySelector<HTMLElement>('.navigate__header__title').style.color = '#a3a3a3';
    document.querySelector<HTMLElement>('.search__input').style.boxShadow = 'none';
    document.querySelector<HTMLElement>('.search__input').style.borderBottom = '1px solid #a3a3a3';
    document.querySelector<HTMLElement>('.search__input').style.borderRadius = '0px';
    document.querySelector<HTMLElement>('.navigate__header__logo').setAttribute("src", "assets/serchIcon.png");
    document.querySelector<HTMLElement>('.navigate__header__logo').style.marginLeft = "8px";
    document.querySelector<HTMLElement>('.close__input').style.opacity = "1";
    document.querySelector<HTMLElement>('#routerOutlet').style.opacity = "0";
    setTimeout(() => {
      document.querySelector<HTMLElement>('#routerOutlet').style.display = "none";
    }, 200);
    this.hideFoto()
  }

  rubricsSubEvent(e: any) {
    console.log(e);
    // this.router.navigate(['/home/cart', { queryParams: { id: Number(e)} }]);
  }

  myAccountService() {
    this.search = '';
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
    this.placemark = [{
      name: 'Бобруйск',
      geometry: [53.14120062671168, 29.224476931585748]
    }];
    setTimeout(() => {
      if (interestingContainer) {
        interestingContainer.style.display = 'none';
      }
    }, 200);
  }

  descriptionShowCartEvent() {
    !this.descriptionShowCart ? this.descriptionShowCart = true : this.descriptionShowCart = false;
  }

  descriptionShowTimeEvent() {
    !this.descriptionShowTime ? this.descriptionShowTime = true : this.descriptionShowTime = false;
  }

  filterSubCategory(id) {
    let subCategoryCartFilter = this.cart.categoryPriceList.filter(item => item.parent === id);
    if (this.subCategoryCartId === id) {
      this.subCategoryCartId = null;
      this.subCategoryCart = []
    } else {
      this.subCategoryCartId = id;
      this.subCategoryCart = subCategoryCartFilter
    }
  }

  getProductCart(category) {
    document.querySelector<HTMLElement>('.result__search__category').style.display = 'block';
    if (document.querySelector<HTMLElement>('.input__search__container__cart')) {
      document.querySelector<HTMLElement>('.input__search__container__cart').style.display = 'none';
    }
    if (document.querySelector<HTMLElement>('.categoty__cart__container')) {
      document.querySelector<HTMLElement>('.categoty__cart__container').style.display = 'none';
    }
    let product = this.cart.product.filter(item => item.category === category);
    this.productCart = product;
    this.cart.categoryPriceList.forEach(item => {
      if (item.id === category) {
        document.querySelector<HTMLInputElement>('.search__input__cart').value = item.title;
      }
    });
  }

  backProduct() {
    if (document.querySelector<HTMLElement>('.result__search__category')) {
      document.querySelector<HTMLElement>('.result__search__category').style.display = 'none';
    }
    if (document.querySelector<HTMLElement>('.categoty__cart__container')) {
      document.querySelector<HTMLElement>('.categoty__cart__container').style.display = 'block';
    }

    this.productCart = [];
    document.querySelector<HTMLInputElement>('.search__input__cart').value = '';
    this.searchCart = '';
  }

  onKeyDownEventCart(e: string) {
    if (e) {
      document.querySelector<HTMLElement>('.result__search__category').style.display = 'none';
    }
  }

  reviewInFull(id) {
    this.reviewFull = id;
  }

  allFotoFull(cart) {
    this.allFoto = cart;
  }

  showFoto(index) {
    this.cartFoto = [];
    this.showFotoPreview = true;
    this.indexSlideChange = index;
    if (this.cart) {
      this.cart.foto.forEach(element => {
        if (!element.moderate) {
          this.cartFoto.push(element);
        }
      });
      this.homeFotoShow = false;
    }
  }

  hideFoto() {
    this.showFotoPreview = false;
  }

  ngOnDestroy(): void {
    this.hideFoto();
    this.getUserAwardsSub ? this.getUserAwardsSub.unsubscribe() : null;
    this.getDiscountUser ? this.getDiscountUser.unsubscribe() : null;
  }

  singOut() {
    this.hideContainer();
    this.authService.SignOut();
  }

  upload = (event) => {
    if (this.authService.userData){
      this.uploadProgressState = true;
      const randomId = Math.random().toString(36).substring(2);
      this.ref = this.afStorage.ref(`/moderate/${this.cart.id}/` + randomId);
      this.task = this.ref.put(event.target.files[0]);
      this.uploadProgress = this.task.percentageChanges();
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.baseService.uploaderFotoUser(randomId, url, this.authService.userData.uid, moment(new Date()).format("DD MMMM YYYY"), this.cart.id);
          });
          if (this.downloadURL) {
            this.baseService.openSnackBar("Фото успешно загруженно и отправлено на модерацию!", "", 3000, "right", "top", "success-dialog-red");
            setTimeout(() => {
              this.uploadProgressState = false;
            }, 700);
          }
        })
      ).subscribe();
    } else {
      this.openModal();
    }
  }


  addSaveFavorite(adres: string, name: string, parent: string, category: string){
    if (this.authService.userData) {
      const randomId = Math.random().toString(36).substring(2);
      let arrayFavorite;
      let requestData = {
        adres: adres,
        id: randomId,
        name: name,
        category: category,
        parent: parent
      }

      let getVavorite = this.afs
        .collection('users')
        .doc(this.authService.userData.uid)
        .collection('favorites')
        .doc('favorite')
        .valueChanges().subscribe((res: any) => {
          if (res) {
            getVavorite.unsubscribe();
            let saveFavorite = res.content.filter(item => item.parent === parent);
            if (saveFavorite.length === 0) {
              this.baseService.openSnackBar("Добавленно в избранное", "", 3000, "right", "top", "");
              arrayFavorite = res.content;
              arrayFavorite.push(requestData);
              this.afs
                .collection('users')
                .doc(this.authService.userData.uid)
                .collection('favorites')
                .doc('favorite')
                .update({
                  content: arrayFavorite
                });
            } else {
              this.baseService.openSnackBar(`Компания - ${name}, уже есть в списке сохраненных`, "", 3000, "right", "top", "error-dialog-red");
            }
          }
        });
    }else{
      this.openModal();
    }
  }


  addDiscount() {
    if (this.authService.userData) {
      const randomId = Math.random().toString(36).substring(2);
      const nowDate = moment(new Date()).format('DD.MM');
      this.getDiscountUser = this.afs.
      collection('allDiscounts', ref => ref.where('org', '==', this.cart.org).where('user', '==', this.authService.userData.uid).where('arhive', '==', false)).
      valueChanges().subscribe((res: any) => {
        this.getDiscountUser.unsubscribe();
        if (res.length > 0) {
          this.baseService.openSnackBar(`У вас уже есть полученная скидка от - ${this.cart.name}`, "", 3000, "right", "top", "error-dialog-red");
        } else {
          console.log('нет такой скидки');
          this.afs.collection('allDiscounts').doc(randomId).set({
              id: randomId,
              user: this.authService.userData.uid,
              org: this.cart.id,
              img: this.cart.preview,
              discount: this.cart.discount,
              name: this.cart.name,
              category: this.cart.category,
              arhive: false,
              endDate: moment(new Date()).add(3, 'days').toISOString()
            });

          this.baseService.openSnackBar(`Вы получили скидку от - ${this.cart.name}, в размере ${this.cart.discount}%`, "", 3000, "right", "top", "");
          this.discountStat = this.afs
            .collection('organizationData')
            .doc(this.cart.id)
            .collection('discountStat', ref => ref.where('title', '==', moment(new Date()).format('YYYY.MM.DD') ))
            .valueChanges({ idField: 'id' }).subscribe((response: any) => {
              this.discountStat.unsubscribe();
              this.afs
                .collection('organizationData')
                .doc(this.cart.id)
                .collection('discountStat')
                .doc(response[0].id)
                .update({
                  count: ++response[0].count
                });
            })
        }
      });
    }else{
      this.openModal();
    }
  }

  setCountCategory(id) {
    let arrNewCat = [];
    this.setCountCategorySub = this.afs
      .collection('organizationData', ref => ref.where('category', '==', id ))
      .valueChanges().subscribe((response: any) => {
        this.setCountCategorySub.unsubscribe();


        this.setCountCategoryParent = this.afs
          .collection('categoryMain')
          .doc('YgTqOZjnDVdVsA1eZf0Z')
          .valueChanges().subscribe((res: any) => {
            this.setCountCategoryParent.unsubscribe();

            res.base.forEach(element => {
              if (element.id === id) {
                element.count = String(response.length);
                arrNewCat.push(element)
              } else {
                arrNewCat.push(element)
              }
            });
            // this.afs
            //   .collection('categoryMain')
            //   .doc('YgTqOZjnDVdVsA1eZf0Z')
            //   .update({
            //     base: arrNewCat
            //   });
          });
      })
  }

  forgotBtnToggleFunc() {
    this.forgotBtnToggle ? this.forgotBtnToggle = false : this.forgotBtnToggle = true
  }

  setForgotPassword(email) {
    this.authService.ForgotPassword(email);
  }

  closeModalShared(){
    this.showshared ? this.showshared = false : this.showshared = true;
    document.querySelector<HTMLElement>('.shared__container').style.opacity = '0';

    setTimeout(() => {
      document.querySelector<HTMLElement>('.shared__container').style.display = 'none';
    }, 50);
  }

  sendShared(){
    this.showshared ? this.showshared = false : this.showshared = true;
    document.querySelector<HTMLElement>('.shared__container').style.display = 'flex';
    setTimeout(() => {
      document.querySelector<HTMLElement>('.shared__container').style.opacity = '1';
    }, 50);
  }

  closeModalDiscount(){
    this.showshared ? this.showshared = false : this.showshared = true;
    document.querySelector<HTMLElement>('.discount__container').style.opacity = '0';

    setTimeout(() => {
      document.querySelector<HTMLElement>('.discount__container').style.display = 'none';
    }, 50);
    this.getDiscountOrg = null;
    this.getDiscountModal = false;
    this.introducedDiscount = null;
    this.introducedDiscountProduct = null;
  }

  openModalDiscount(amountOfDiscount, organization, id){
    this.modalDiscount = {
      amountOfDiscount,
      organization,
      id
    }
    this.showshared ? this.showshared = false : this.showshared = true;
    document.querySelector<HTMLElement>('.discount__container').style.display = 'flex';
    setTimeout(() => {
      document.querySelector<HTMLElement>('.discount__container').style.opacity = '1';
    }, 50);
    this.getDiscountOrgSub = this.afs
      .collection('organizationData', ref => ref.where('name', '==', organization ))
      .valueChanges().subscribe((res: any) => {
        if (res) {
          this.getDiscountOrg = res[0];
          this.getDiscountOrgSub.unsubscribe();
        }
      })
  }

  async discountUse() {
    if(!this.introducedDiscount) {
      this.errorDiscountModal = true;
    } else {
      const randomId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      this.errorDiscountModal = false;
      this.getDiscountModal = true;
      this.personalDiscountCode = '0' + this.getDiscountOrg.parent + this.getDiscountOrg.category + String(randomId);
      this.getDiscountOrgDate = moment(new Date()).format('DD MMMM YYYY hh:mm:ss');
      let itog = this.introducedDiscount - (this.introducedDiscount * this.modalDiscount.amountOfDiscount / 100);
      await this.afs
        .collection('allDiscounts')
        .doc(this.modalDiscount.id)
        .update({
          arhive: true,
          date: this.getDiscountOrgDate,
          personalDiscountCode: this.personalDiscountCode,
          priceItog: itog.toFixed(2),
          priceFull: this.introducedDiscount,
          product: this.introducedDiscountProduct ? this.introducedDiscountProduct : ''
        });
    }
  }

}
