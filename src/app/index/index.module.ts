import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AwardsComponent } from './awards/awards.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { FotoComponent } from './foto/foto.component';
import { ClarificationsComponent } from './clarifications/clarifications.component';
import { FormsModule } from "@angular/forms";
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { SearchComponent } from './search/search.component';
import { FilterPipe } from './../pipes/filter.pipe';
import { SafeHtmlPipe } from './../pipes/safe-html.pipe';
import { TitleCasePipe } from './../pipes/title-case.pipe';
import { RoundNumberPipe } from './../pipes/round-number.pipe';
import { HighlightDirective } from './../directives/highlight.directive';
import { MainComponent } from './main/main.component';
import { CartComponent } from './cart/cart.component';
import { DiscountComponent } from './discount/discount.component';
import { TruncateModule } from 'ng2-truncate';
import { RatingModule } from 'ng-starrating';
import { SwiperModule } from 'swiper/angular';
import { MomentModule } from 'ngx-moment';
import { ShareButtonsModule } from "ngx-sharebuttons/buttons";
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareModule } from 'ngx-sharebuttons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const mapConfig: YaConfig = {
  apikey: '5fc20e6d-949a-4930-92de-32d9299d43b7',
  lang: 'ru_RU',
};



@NgModule({
  declarations: [
    FavoritesComponent,
    AwardsComponent,
    ReviewsComponent,
    FotoComponent,
    ClarificationsComponent,
    IndexComponent,
    SearchComponent,
    FilterPipe,
    HighlightDirective,
    MainComponent,
    CartComponent,
    DiscountComponent,
    SafeHtmlPipe,
    TitleCasePipe,
    RoundNumberPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    IndexRoutingModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    TruncateModule,
    RatingModule,
    SwiperModule,
    MomentModule.forRoot(),
    ShareButtonsModule,
    ShareButtonModule,
    ShareIconsModule,
    ShareModule,
    FontAwesomeModule
  ],
  providers: [
    FavoritesComponent,
    IndexComponent,
    CartComponent
  ],
})
export class IndexModule { }
