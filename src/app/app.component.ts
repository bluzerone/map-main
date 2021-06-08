import { Component } from '@angular/core';
import { routeTransitionAnimations } from './route-transition-animations';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [routeTransitionAnimations]
})
export class AppComponent {

  constructor(private router: Router) {}

  prepareRouteApp(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
   }

}
