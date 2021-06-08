import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { routeTransitionAnimationsCabinet } from "./../../route-animations-cabinet";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { BaseService } from "./../../base.service";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-company-cabinet',
  templateUrl: './company-cabinet.component.html',
  styleUrls: ['./company-cabinet.component.styl'],
  animations: [routeTransitionAnimationsCabinet]
})
export class CompanyCabinetComponent implements OnInit {

  public resOrganizacion: Object;
  private interval: any;
  public allReviewUser: any[] = [];
  public indexSlideChange: any;
  public getListReviewSub:any;
  public activeStateDiscount:boolean = true;
  private getStatDiscount:any;
  public emptyReview: boolean = false


  constructor(
    private router: Router,
    public baseSevice: BaseService,
    public afs: AngularFirestore,
  ) { }

  public lineChartData: ChartDataSets[] = [
    { data: [], label: '', lineTension: 0 },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation ?: any }) = {
    responsive: true,
    scales: {
       xAxes: [ {
         gridLines: {
           display: false,
         },
         ticks: {
           fontSize: 8
         }
     }],
     yAxes: [
        {
            display: true,
            ticks: {
              fontSize: 8
            }
        }
      ]
   }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#2a7fdd',
      borderWidth: 1,
      backgroundColor: "#00000000",
      pointBackgroundColor: '#2a7fdd',
      pointBorderWidth: 0
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];



  ngOnInit(): void {
    this.resOrganizacion = this.baseSevice.myOrganization;

    if (this.resOrganizacion) {
      this.getReviews();
      this.createStatArray(true, false);
    }

    let myOrg = sessionStorage.getItem('org');
    if (!myOrg) {
      this.router.navigate(['/auth/login']);
    }

  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.getListReviewSub ? this.getListReviewSub.unsubscribe() : null;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
   }

   logOutOrg() {
     sessionStorage.removeItem('org');
   }

   getReviews() {
     this.getListReviewSub = this.afs
       .collection('reviews', ref => ref.where('parent', '==', this.baseSevice.myOrganization.org).where('state', '==', 'publish'))
       .valueChanges().subscribe((res: any) => {
         this.allReviewUser = res;
       });
       setTimeout(() => {
         if(this.allReviewUser.length === 0){
           this.emptyReview = true
         }
       }, 500);

   }

    createStatArray(week: boolean, month: boolean){
      let arrDays = [];
      let arrData = [];
      let prevMonthLength = moment(moment(new Date())).add(-1, 'month').daysInMonth();
      week ? this.activeStateDiscount = true : this.activeStateDiscount = false;
      this.getStatDiscount = this.afs
        .collection('organizationData')
        .doc(this.baseSevice.myOrganization.org)
        .collection('discountStat', ref => ref.orderBy('title', 'desc').limit(week ? 7 : prevMonthLength))
        .valueChanges().subscribe((res: any) => {
          for(let i = 0; i < res.length; i++) {
            arrDays.push(moment(res[i].title).format('DD.MM'));
            arrData.push(res[i].count);
          }
          this.lineChartLabels = arrDays.reverse();
          this.lineChartData[0].data = arrData.reverse();
          this.getStatDiscount.unsubscribe();
        });
    }

}
