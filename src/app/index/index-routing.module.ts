import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AwardsComponent } from './awards/awards.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { FotoComponent } from './foto/foto.component';
import { ClarificationsComponent } from './clarifications/clarifications.component';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';
import { CartComponent } from './cart/cart.component';
import { DiscountComponent } from './discount/discount.component';

const indexRoute: Routes = [
  {
    path: 'home',
    component: IndexComponent,
    children: [
      { path: 'favorites', component: FavoritesComponent, data: { animationState: 'One' } },
      { path: 'foto', component: FotoComponent, data: { animationState: 'Two' } },
      { path: 'reviews', component: ReviewsComponent, data: { animationState: 'Three' } },
      { path: 'awards', component: AwardsComponent, data: { animationState: 'Fore' } },
      { path: 'clarifications', component: ClarificationsComponent, data: { animationState: 'Five' } },
      { path: 'main', component: MainComponent, data: { animationState: 'Five' } },
      { path: 'my-discounts', component: DiscountComponent, data: { animationState: 'Three' } },
      { path: 'cart/:id', component: CartComponent, data: { animationState: 'Fore' } }
    ]
  },
  {
    path: "",
    redirectTo: "/home/main",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(indexRoute)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
