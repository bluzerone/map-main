import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyCabinetComponent }  from './company-cabinet.component'
import { CompanyCabinetRoutingModule } from "./company-cabinet-routing.module";
import { CompanyDataComponent } from './company-data/company-data.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AdvertisingComponent } from './advertising/advertising.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ChartsModule } from 'ng2-charts';
import { SwiperModule } from 'swiper/angular';
import { TruncateModule } from 'ng2-truncate';
import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [
    CompanyCabinetComponent,
    CompanyDataComponent,
    StatisticsComponent,
    AdvertisingComponent,
    CatalogComponent
  ],
  imports: [
    CompanyCabinetRoutingModule,
    CommonModule,
    ChartsModule,
    SwiperModule,
    TruncateModule,
    RatingModule
  ],
  providers: [
    CompanyCabinetComponent
  ]
})

export class CompanyCabinetModule { }
