import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label,  } from 'ng2-charts';
import { CompanyCabinetComponent }  from './../company-cabinet.component'
import * as moment from 'moment'
import { BaseService } from './../../../base.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.styl']
})
export class StatisticsComponent implements OnInit {

  public countStatisticsAll: number = 0;
  private getStatDiscount:any;
  private getUseDiscountsSub: any;
  public countStatisticsAllUse: number = 0;

  public lineChartDataRecievedDiscounts: ChartDataSets[] = [
      { data: [0], label: '', lineTension: 0},
    ];
    public lineChartLabelsRecievedDiscounts: Label[] = ['Январь', 'Февраль', 'Март', 'Апрель'];
    public lineChartOptionsRecievedDiscounts: (ChartOptions & { annotation ?: any }) = {
      responsive: true,
      scales: {
         xAxes: [ {
           gridLines: {
               display: false
             },
             ticks: {
               fontSize: 8
             }
         } ],
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
    public lineChartColorsRecievedDiscounts: Color[] = [
      {
        borderColor: '#2a7fdd',
        borderWidth: 1,
        backgroundColor: "#00000000",
        pointBackgroundColor: '#2a7fdd',
        pointBorderWidth: 0
      },
    ];
    public lineChartLegendRecievedDiscounts = false;
    public lineChartTypeRecievedDiscounts = 'line';
    public lineChartPluginsRecievedDiscounts = [];


    public lineChartDataDiscountsUsed: ChartDataSets[] = [
        { data: [0], label: '',lineTension: 0 },
      ];
      public lineChartLabelsDiscountsUsed: Label[] = ['Январь', 'Февраль', 'Март', 'Апрель'];
      public lineChartOptionsDiscountsUsed: (ChartOptions & { annotation ?: any }) = {
        responsive: true,
        scales: {
           xAxes: [ {
             gridLines: {
                 display: false
               },
               ticks: {
                 fontSize: 8
               }
           } ],
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
      public lineChartColorsDiscountsUsed: Color[] = [
        {
          borderColor: '#2a7fdd',
          borderWidth: 1,
          backgroundColor: "#00000000",
          pointBackgroundColor: '#2a7fdd',
          pointBorderWidth: 0
        },
      ];
      public lineChartLegendDiscountsUsed = false;
      public lineChartTypeDiscountsUsed = 'line';
      public lineChartPluginsDiscountsUsed = [];

  constructor(private companyCabinetComponent: CompanyCabinetComponent, public afs: AngularFirestore, public baseSevice: BaseService) { }

  ngOnInit(): void {
    this.getAllDiscount();
    this.getUseDiscounts();
  }

  getAllDiscount() {
    let arrData = [];
    let arrMonthMar = [];
    let arrMonthMarLen = 0;
    let arrMonthApr = [];
    let arrMonthAprLen = 0;
    let prevMonthLength = moment(moment(new Date())).add(-1, 'month').daysInMonth();
    this.getStatDiscount = this.afs
      .collection('organizationData')
      .doc(this.baseSevice.myOrganization.org)
      .collection('discountStat', ref => ref.orderBy('title', 'desc').limit(prevMonthLength))
      .valueChanges().subscribe((res: any) => {
        for(let i = 0; i < res.length; i++) {
          if (moment(res[i].title).format('MM') === '03') {
            arrMonthMar.push(res[i].count);
          } else if (moment(res[i].title).format('MM') === '04'){
            arrMonthApr.push(res[i].count);
          }
        }
        for(var i = 0;i < arrMonthMar.length; i++){
            arrMonthMarLen = arrMonthMarLen + parseInt(arrMonthMar[i]);
        }
        for(var i = 0;i < arrMonthApr.length; i++){
            arrMonthAprLen = arrMonthAprLen + parseInt(arrMonthApr[i]);
        }
        const arrDup = arrMonthMar.concat(arrMonthApr);

        for(var i = 0;i < arrDup.length; i++){
            this.countStatisticsAll = this.countStatisticsAll + parseInt(arrDup[i]);
        }

        this.lineChartDataRecievedDiscounts[0].data = [0, 0, arrMonthMarLen, arrMonthAprLen];
        this.getStatDiscount.unsubscribe()
      });
  }

  getUseDiscounts() {
    this.getUseDiscountsSub = this.afs
      .collection('allDiscounts', ref => ref.where('org', '==', this.baseSevice.myOrganization.org).where('arhive', '==', true))
      .valueChanges().subscribe((res: any) => {
        if (res) {
          console.log(res.length);
          this.countStatisticsAllUse = res.length;
          this.lineChartDataDiscountsUsed[0].data = [0, 0, 0, res.length];
          this.getUseDiscountsSub.unsubscribe();
        }
      })
  }

}
