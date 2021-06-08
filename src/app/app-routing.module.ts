import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { CompanyFormationComponent } from './auth/company-formation/company-formation.component';

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./index/index.module').then( m => m.IndexModule),
      data: { animationState: 'One' }
    }, {
      path: 'auth',
      component: AuthComponent,
      data: { animationState: 'Two' },
      children: [
        { path: 'login', component: LoginComponent, data: { animationState: 'One' } },
        { path: 'registration', component: RegistrationComponent, data: { animationState: 'Two' } },
        { path: 'company-formation', component: CompanyFormationComponent, data: { animationState: 'Three' } }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
