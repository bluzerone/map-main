import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CompanyFormationComponent } from './company-formation/company-formation.component';
import { CompanyCabinetComponent } from './company-cabinet/company-cabinet.component';
import { CompanyDataComponent } from "./company-cabinet/company-data/company-data.component";
import { StatisticsComponent } from "./company-cabinet/statistics/statistics.component";
import { AdvertisingComponent } from "./company-cabinet/advertising/advertising.component";
import { CatalogComponent } from "./company-cabinet/catalog/catalog.component";

const authRouting: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, data: { animationState: 'One' } },
      { path: 'registration', component: RegistrationComponent, data: { animationState: 'Two' } },
      { path: 'company-formation', component: CompanyFormationComponent, data: { animationState: 'Three' } },
      { path: 'company-cabinet', component: CompanyCabinetComponent, data: { animationState: 'Fore' },
      children: [
          { path: 'company-data', component: CompanyDataComponent, data: { animationState: 'One' } },
          { path: 'statistics', component: StatisticsComponent, data: { animationState: 'Two' } },
          { path: 'advertising', component: AdvertisingComponent, data: { animationState: 'Three' } },
          { path: 'catalog', component: CatalogComponent, data: { animationState: 'Fore' } }
      ]}
    ]
  },
  {
    path: "",
    redirectTo: "/auth/login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRouting)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
