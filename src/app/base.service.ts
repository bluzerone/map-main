import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  horizontalPosition: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition;

  public errorReg: boolean = false;
  public organizationSubscribe: any;

  public errorLogin: boolean = false;
  public errorPassword: boolean = false;
  public myOrganization: any;
  public updatedArrayPhotoShown: any[] = [];
  public categoryMain: Observable<any>;
  public getAllOrganization: Observable<any>;

  private discountStatCreate: any;

  constructor(
    public afs: AngularFirestore,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.afs
      .collection('categoryMain')
      .doc('YgTqOZjnDVdVsA1eZf0Z')
      .valueChanges().subscribe((res: any) => {
        this.categoryMain = res.base;
      });

    this.getAllOrganization = this.afs
      .collection('organizationData')
      .valueChanges();
  }

  openSnackBar(message: string, action: any, duration: number, horizont?: any, vertical?: any, classBar?: string) {
    horizont ? this.horizontalPosition = horizont : this.horizontalPosition = 'center'
    vertical ? this.verticalPosition = vertical : this.verticalPosition = 'bottom'
    this._snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: classBar
    });
  }

  public base: any[] = [
    {
      id: '1',
      title: "Поесть",
      icon: "assets/eatingActive.png",
      image: 'assets/imageEat.png'
    },
    {
      id: '2',
      title: "Автосервис",
      icon: "assets/carActive.png",
      image: 'assets/avtoservis.jpeg'
    },
    {
      id: '3',
      title: "Красота",
      icon: "assets/makeupActive.png",
      image: "assets/parik.jpeg"
    },
    {
      id: '4',
      title: "Медицина",
      icon: "assets/hospital-signActive.png",
      image: "assets/med.jpeg"
    },
    {
      id: '5',
      title: "Одежда",
      icon: "assets/tshirt.png"
    },
    {
      id: '6',
      title: "Обувь",
      icon: "assets/high-heels.png",
      image: 'assets/unnamed.jpeg'
    },
    {
      id: '7',
      title: "Развлечения",
      icon: "assets/theater-masks.png"
    },
    {
      id: '8',
      title: "Услуги",
      icon: "assets/customer-support.png"
    },
    {
      id: '9',
      title: "Товары",
      icon: "assets/shopping.png"
    },
    {
      id: '10',
      title: "Продукты",
      icon: "assets/dairy-products.png"
    },
    {
      id: '11',
      title: "Транспорт",
      icon: "assets/bus_1.png"
    },
    {
      id: '12',
      title: "Спорт",
      icon: "assets/sport.png"
    },
    {
      id: '13',
      title: "Ремонт",
      icon: "assets/worker.png"
    },
    {
      id: '14',
      title: "B2B услуги",
      icon: "assets/support.png"
    },
    {
      id: '15',
      title: "Туризм",
      icon: "assets/suitcase.png"
    },
    {
      id: '16',
      title: "Образование",
      icon: "assets/mortarboard.png"
    },
    {
      id: '17',
      title: "Пром-товары",
      icon: "assets/oil-tank.png"
    },
    {
      id: '18',
      title: "Гос.услуги",
      icon: "assets/bank.png"
    },
    {
      id: '19',
      title: "Экстренные службы",
      icon: "assets/siren.png"
    },
    {
      id: '20',
      title: "Спец-магазины",
      icon: "assets/shopping-cart.png"
    },
    {
      id: '21',
      title: "Религия",
      icon: "assets/bible.png"
    },
    {
      id: "22",
      title: "Безопасность",
      icon: "assets/lock.png"
    },
    {
      id: '23',
      title: "Кафе",
      parent: '1',
      shortDescription: "Пример текста",
      count: '3'
    },
    {
      id: '24',
      title: "Рестораны",
      parent: '1',
      shortDescription: "Пример текста",
      count: '2'
    },
    {
      id: '25',
      title: "Бары",
      parent: '1',
      shortDescription: "Пример текста",
      count: '0'
    },
    {
      id: '26',
      title: "Суши бары",
      parent: '1',
      shortDescription: "Пример текста",
      count: '0'
    },
    {
      id: '27',
      title: "Кальянные",
      parent: '1',
      shortDescription: "Пример текста",
      count: '0'
    },
    {
      id: '28',
      title: "Быстрое питание",
      parent: '1',
      shortDescription: "Пример текста",
      count: '0'
    },
    {
      id: '29',
      title: "Доставка еды",
      parent: '1',
      shortDescription: "Пример текста",
      count: '0'
    },
    {
      id: '30',
      title: "Столовые",
      parent: '1',
      shortDescription: "Пример текста",
      count: '0'
    },
    {
      id: '31',
      title: "Кофейни",
      parent: '1',
      shortDescription: "Пример текста",
      count: '0'
    },
    {
      id: '32',
      title: "Пиццерии",
      parent: '1',
      shortDescription: "Пример текста",
      count: '0'
    },
    {
      id: '33',
      title: "СТО",
      parent: '2',
      shortDescription: "Пример текста",
      count: '4'
    },
    {
      id: '34',
      title: "Шиномантаж",
      parent: '2',
      shortDescription: "Пример текста",
      count: '0'
    },
    {
      id: '35',
      title: "Обувные магазины",
      parent: '6',
      shortDescription: "Пример текста",
      count: '2'
    }
  ];

  public organization = [
    {
      id: '132735048559965',
      name: 'Кафе Аякс',
      subName: "Уютное небольшое кафе для семейных торжеств.",
      geometry: [53.14120062671168, 29.224476931585748],
      description: "Уютное небольшое кафе для семейных торжеств. ",
      category: '23',
      parent: '1',
      appraisal: '5',
      address: 'Бобруйск, ул. Советская 93',
      subContent: 'Холдинг «Белорусская кожевенно-обувная компания «Марко» – лидер',
      logo: 'assets/ajaks.png',
      preview: 'assets/ajaks.png',
      content: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
      information: '<p style="font-size:12px;"><b>Мужская, женская и детская обувь</b><br>Большой, просторный магазин, отличный выбор одежды. Правда, цены дороговаты, но, думаю, оно того стоит.</p><p style="font-size:12px;"><b>Мужская, женская и детская обувь</b><br>Большой, просторный магазин, отличный выбор одежды. Правда, цены дороговаты, но, думаю, оно того стоит.</p><br><p style="font-size:12px;"><b>Оплата картой / Наличный расчет</b></p>',
      categoryPriceList: [
        {
          id: '1',
          title: 'Обувь'
        },
        {
          id: '2',
          title: 'сникеры',
          parent: '1'
        },
        {
          id: '3',
          title: 'босаножки',
          parent: '1'
        },
        {
          id: '4',
          title: 'балетки',
          parent: '1'
        },
        {
          id: '5',
          title: 'кеды',
          parent: '1'
        },
        {
          id: '6',
          title: 'туфли',
          parent: '1'
        },
        {
          id: '7',
          title: 'полуботинки',
          parent: '1'
        },
        {
          id: '8',
          title: 'сапоги',
          parent: '1'
        },
        {
          id: '9',
          title: 'ботинки',
          parent: '1'
        },
        {
          id: '10',
          title: 'слипоны',
          parent: '1'
        },
        {
          id: '11',
          title: 'сабо',
          parent: '1'
        },
        {
          id: '12',
          title: 'мокасины',
          parent: '1'
        },
        {
          id: '13',
          title: 'Сумки'
        },
        {
          id: '16',
          title: 'поясные',
          parent: '13'
        },
        {
          id: '17',
          title: 'наплечные',
          parent: '13'
        },
        {
          id: '18',
          title: 'дорожные',
          parent: '13'
        },
        {
          id: '14',
          title: 'Аксессуары'
        },
        {
          id: '15',
          title: 'бейсболки',
          parent: '14'
        }
      ],
      product: [
        {
          title: 'Kiton Сникеры',
          img: 'assets/kiton.png',
          price: '3.890',
          category: '2',
          content: 'Черные дерби со стеганым узором Long Wing обеспечат ногам комфорт на протяжении всего дня. Пару сшили из мягкой кожи по специальной технологии Goodyear, которая делает обувь особенно гибкой и прочной.'
        },
        {
          title: 'Kiton Босоножки',
          img: 'assets/kiton.png',
          price: '3.890',
          category: '3',
          content: 'Черные дерби со стеганым узором Long Wing обеспечат ногам комфорт на протяжении всего дня. Пару сшили из мягкой кожи по специальной технологии Goodyear, которая делает обувь особенно гибкой и прочной.'
        },
        {
          title: 'Kiton Босоножки',
          img: 'assets/kiton.png',
          price: '3.890',
          category: '3',
          content: 'Черные дерби со стеганым узором Long Wing обеспечат ногам комфорт на протяжении всего дня. Пару сшили из мягкой кожи по специальной технологии Goodyear, которая делает обувь особенно гибкой и прочной.'
        },
        {
          title: 'Kiton Босоножки',
          img: 'assets/kiton.png',
          price: '3.890',
          category: '3',
          content: 'Черные дерби со стеганым узором Long Wing обеспечат ногам комфорт на протяжении всего дня. Пару сшили из мягкой кожи по специальной технологии Goodyear, которая делает обувь особенно гибкой и прочной.'
        },
        {
          title: 'Kiton Босоножки',
          img: 'assets/kiton.png',
          price: '3.890',
          category: '3',
          content: 'Черные дерби со стеганым узором Long Wing обеспечат ногам комфорт на протяжении всего дня. Пару сшили из мягкой кожи по специальной технологии Goodyear, которая делает обувь особенно гибкой и прочной.'
        },
        {
          title: 'Kiton Босоножки',
          img: 'assets/kiton.png',
          price: '3.890',
          category: '3',
          content: 'Черные дерби со стеганым узором Long Wing обеспечат ногам комфорт на протяжении всего дня. Пару сшили из мягкой кожи по специальной технологии Goodyear, которая делает обувь особенно гибкой и прочной.'
        }
      ],
      photo: [
        'assets/ajaxphoto1.jpeg',
        'assets/ajaxphoto2.jpeg',
        'assets/ajaxphoto3.jpeg',
        'assets/ajaxphoto4.jpeg',
        'assets/ajaxphoto5.jpeg',
        'assets/ajaxphoto6.jpeg',
        'assets/ajaxphoto7.jpeg'
      ]
    },
    {
      id: '132735048559966',
      name: 'ArtиШОК',
      subName: "Магазин обуви, галантереи и аксессуаров",
      geometry: [53.19243956942761, 29.224504810641484],
      description: "Очень уютное кафе в Бобруйске",
      category: '23',
      parent: '1',
      appraisal: '4',
      address: 'Бобруйск, ул. Социалистическая 105',
      subContent: 'Холдинг «Белорусская кожевенно-обувная компания «Марко» – лидер',
      logo: 'assets/11ba5d.jpeg',
      preview: 'assets/11ba5d.jpeg',
      content: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
      information: '<p style="font-size:12px;"><b>Мужская, женская и детская обувь</b><br>Большой, просторный магазин, отличный выбор одежды. Правда, цены дороговаты, но, думаю, оно того стоит.</p>',
      categoryPriceList: [],
      product: [],
      photo: [
        'assets/fotocart1.png',
        'assets/fotocart2.png',
        'assets/fotocart3.png',
        'assets/fotocart1.png',
        'assets/fotocart2.png',
        'assets/fotocart3.png',
        'assets/fotocart1.png',
        'assets/fotocart2.png',
        'assets/fotocart3.png',
        'assets/fotocart3.png',
        'assets/fotocart1.png',
        'assets/fotocart2.png',
        'assets/fotocart3.png'
      ]
    },
    {
      id: '132735048559967',
      name: 'Марко',
      subName: "Магазин обуви, галантереи и аксессуаров",
      geometry: [53.14565356776985, 29.225205949130682],
      description: "Магазин обуви Марко",
      category: '35',
      parent: '6',
      appraisal: '3',
      address: 'Бобруйск, ул. Минская, 15',
      subContent: 'Холдинг «Белорусская кожевенно-обувная компания «Марко» – лидер',
      logo: 'assets/markoLogo.png',
      preview: 'assets/unnamedmarko.jpeg',
      content: 'История компании «Марко» насчитывает уже 20 лет работы на рынке, основными и значимыми этапами в развитии предприятия являются следующие даты',
      categoryPriceList: [],
      product: []
    },
    {
      id: '132735048559968',
      name: 'Белвест',
      subName: "Магазин обуви, галантереи и аксессуаров",
      geometry: [53.14900610244427, 29.193232418606183],
      description: "Магазин обуви Белвест",
      category: '35',
      parent: '6',
      appraisal: '5',
      address: 'Бобруйск, ул. Советская, 12',
      subContent: 'Холдинг «Белорусская кожевенно-обувная компания «Марко» – лидер',
      logo: 'assets/belwest.png',
      preview: 'assets/kompaniya_belwest_zapustila_v_rossii_diskontnuyu_sistemu_bonus_club.jpeg',
      content: 'BELWEST – бренд, объединивший в себе традиции обувного мастерства и стандарты немецкого качества. Европейская компания BELWEST была основана в 1988 году в городе Витебске западногерманским концерном SALAMANDER. С первой выпущенной пары бренд BELWEST завоевал сердца людей. Весь путь развития фабрики был революционным в обувной промышленности, ведь с самого рождения на предприятии использовались передовые мировые технологии и уникальные знания, необходимые для производства удобной и качественной обуви высокого класса.',
      categoryPriceList: [],
      product: []
    },
    {
      id: '132735048559971',
      name: 'СТО "КомботехСервис"',
      geometry: [53.13551500262365, 29.20804715035038],
      description: 'СТО "КомботехСервис"',
      category: '33',
      parent: '2',
      appraisal: '5',
      categoryPriceList: [],
      product: []
    },
    {
      id: '132735048559972',
      name: 'Филипчик А.М. ЧТПУП',
      geometry: [53.17092846638584, 29.20524827012906],
      description: 'Филипчик А.М. ЧТПУП',
      category: '33',
      parent: '2',
      appraisal: '5',
      categoryPriceList: [],
      product: []
    },
    {
      id: '132735048559973',
      name: 'СТО АВТОДОК',
      geometry: [53.132735048559965, 29.231951926533903],
      description: 'СТО АВТОДОК',
      category: '33',
      parent: '2',
      appraisal: '5',
      categoryPriceList: [],
      product: []
    },
    {
      id: '132735048559974',
      name: 'АвтоСПЕКТР',
      geometry: [53.13925175025527, 29.233135198681037],
      description: 'АвтоСПЕКТР',
      category: '33',
      parent: '2',
      appraisal: '5',
      categoryPriceList: [],
      product: []
    }

  ];

  public baseImage: any[] = [
    {
      parent: "1",
      image: ""
    }
  ]

  public catalogCategories = [
    {
      id : '1',
      name: 'Обувь',
      subcategories: [
        {
          id: '2',
          name: 'Лоферы',
          category: '1'
        },
        {
          id: '3',
          name: 'Босоножки',
          category: '1'
        },
        {
          id: '4',
          name: 'Балетки',
          category: '1'
        },
        {
          id: '5',
          name: 'Кеды',
          category: '1'
        },
        {
          id: '6',
          name: 'Туфли',
          category: '1'
        },
        {
          id: '7',
          name: 'Полуботинки',
          category: '1'
        },
        {
          id: '8',
          name: 'Сапоги',
          category: '1'
        },
        {
          id: '9',
          name: 'Ботинки',
          category: '1'
        },
        {
          id: '10',
          name: 'Макасины',
          category: '1'
        },
        {
          id: '11',
          name: 'Сабо',
          category: '1'
        },
      ]
    },
    {
      id: '12',
      name: 'Сумки',
      subcategories: [
        {
          id: '13',
          name: 'Поясные',
          category: '12'
        },
        {
          id: '14',
          name: 'Наплечные',
          category: '12'
        },
        {
          id: '15',
          name: 'Дорожные',
          category: '12'
        },
      ]
    },
    {
      id: '16',
      name: 'Аксессуары',
      subcategories: [
        {
          id: '17',
          name: 'Бейсболки',
          categoty: '16'
        }
      ]
    }
  ];

  public rewiews: any[] = [
    {
      id: '1',
      parent: '132735048559965',
      name: 'Вероника Сергиенко',
      date: '10 декабря 2020',
      content: 'Уютное небольшое кафе для семейных торжеств. Из меню правда не все понравилось. Как и в любом кафе. Музыку хорошую включают можно танцевать при желании. Официант девушка приятная внимательная.',
      foto: '',
      appraisal: '4'
    },
    {
      id: '2',
      parent: '132735048559965',
      name: 'Константинопольский Константин',
      date: '08 декабря 2020',
      content: 'Очень уютно и не дорого, рекомендую!',
      foto: '',
      appraisal: '5'
    },
    {
      id: '3',
      parent: '132735048559965',
      name: 'Михаил Сергиенко',
      date: '03 декабря 2020',
      content: 'Небольшое по размеру, но довольно уютное кафе в историческом центре Бобруйска благодаря широкому выбору предлагаемых блюд и приветливому персоналу удовлетворит даже самого взыскательного посетителя. Отлично подойдёт как для проведения семейных торжеств и корпоративов, так и для более печальных жизненных ситуаций.',
      foto: 'https://lh5.googleusercontent.com/-iYi9AFTWjGA/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckdFkYHOcJNNE49D1a2HWp-Fx01JA/s96-c/photo.jpg',
      appraisal: '4'
    },
    {
      id: '2',
      parent: '132735048559965',
      name: 'Константинопольский Константин',
      date: '08 декабря 2020',
      content: 'Отмечали там юбилей. Не понравилось ВСЕ! Во-первых, не смотря на нежаркую погоду на улице в кафе было ужасно душно, приходилось постоянно выходить проветриваться, во-вторых обслуживание— казалось недовольные лица официанток и воровство остались в прошлом, но нет, это все кафе Аякс! Не принесли хлеба, пришлось идти к официантке, отвлечь ее от сигареты, и попросить хлеба, салфетки взяли сами с соседних пустых столов, что бы у нас забрали пустые тарелки, опять пришлось отвлекать официантку на этот раз рт просмотра телевизора. Вторую половину вечера, к официциантке пришли друзья и вообще ей было не до нас. Когда подали горячие блюда, что-то было недосолено, что-то пересолено. Но больше всего удивило откровенное воровство! Мы привезли огромный арбуз и большую дыню, а на стол нам вынесли всего 2 тарелочки, что примерно 1/3 от того что было... мы подумали, что остальное принесут позже, но нет. Горячие подавались не вовремя, последние из них было готово уже тогда, когда половина гостей разошлись! И в-третьих цена этого всего была не дешёвая! Никому не советую! Если можно было бы, поставила бы 0 здвезд!!',
      foto: '',
      appraisal: '1'
    }
  ];

  public fotoComp: any[] = [
    'assets/unnamedmarko.jpeg',
    'assets/unnamedmarko.jpeg',
    'assets/unnamedmarko.jpeg',
    'assets/unnamedmarko.jpeg',
    'assets/unnamedmarko.jpeg',
    'assets/unnamedmarko.jpeg',
    'assets/unnamedmarko.jpeg',
    'assets/unnamedmarko.jpeg'
  ]

  setAddOrganizationRequest(city, name, email){
    if (!city || !name || !email) {
      this.errorReg = true
    } else {
      const requestData = {
        city : city,
        name: name,
        email: email
      }
      const userRef: AngularFirestoreDocument<any> = this.afs.collection('requestsToAddCompanyAcc').doc();
      return userRef.set(requestData)
    }
  }

  sendRegOrganizationData(name, sphere, address, workingTime, telNumber, email, site){
    if (!name || !sphere || !address || !workingTime || !telNumber || !email || !site) {
      this.errorReg = true
    }else{
      const orgRegData = {
        name,
        sphere,
        address,
        workingTime,
        telNumber,
        email,
        site
      }
      const userRef: AngularFirestoreDocument<any> = this.afs.collection('organization').doc();
      return userRef.set(orgRegData)
    }
  }

  getOrganization(login, password) {
    if (login) {
      this.organizationSubscribe = this.afs
        .collection('organizationData')
        .doc(login)
        .valueChanges().subscribe((res: any) => {
          if (res) {
            if (res.password === password) {
              this.myOrganization = res;
              this.router.navigate(['/auth/company-cabinet/company-data']);
              sessionStorage.setItem('org', res.org);
              login = null;
              password = null;
              this.errorPassword = false;
              this.errorLogin = false;
              this.updatedArrayPhotoShown = res.foto
              this.organizationSubscribe.unsubscribe();
              const nowDate = moment(new Date()).format('DD.MM');
              this.discountStatCreate = this.afs
                .collection('organizationData')
                .doc(res.org)
                .collection('discountStat', ref => ref.where('title', '==', Number(nowDate) ))
                .valueChanges({ idField: 'id' }).subscribe((response: any) => {
                  if (response.length === 0) {
                    this.afs
                      .collection('organizationData')
                      .doc(res.org)
                      .collection('discountStat')
                      .doc()
                      .set({
                        title: Number(nowDate),
                        count: 0
                      });
                  }
                  this.discountStatCreate.unsubscribe();
                })
            } else {
              this.errorPassword = true;
              this.errorLogin = false;
            }
          } else {
            this.errorLogin = true;
          }
        });
    } else {
      this.errorLogin = true;
    }
  }

  uploaderFotoOrganization(name, url, org, date) {
    this.afs.collection('photo').doc(name).set({
      id: name,
      url,
      moderate: true,
      org,
      date
    });
  }

  uploaderFotoUser(name, url, user, date, org) {
    this.afs.collection('photo').doc(name).set({
      id: name,
      url,
      moderate: true,
      user: user ? user : '',
      date,
      org
    });
  }
}
