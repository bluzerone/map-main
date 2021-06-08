import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyCabinetComponent } from './company-cabinet.component';
import { CompanyDataComponent } from "./company-data/company-data.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { AdvertisingComponent } from "./advertising/advertising.component";
import { CatalogComponent } from "./catalog/catalog.component";

const companyCabinetRouting: Routes = [{
    path: 'company-cabinet',component: CompanyCabinetComponent,
    children: [
      { path: 'company-data', component: CompanyDataComponent, data: { animationState: 'One' } },
      { path: 'statistics', component: StatisticsComponent, data: { animationState: 'Two' } },
      { path: 'advertising', component: AdvertisingComponent, data: { animationState: 'Three' } },
      { path: 'catalog', component: CatalogComponent, data: { animationState: 'Fore' } }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(companyCabinetRouting)],
  exports: [RouterModule]
})

export class CompanyCabinetRoutingModule { }
