import { Input, Component, OnInit } from '@angular/core';
import { BaseService } from './../../base.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.styl']
})
export class SearchComponent implements OnInit {

  @Input() searchItem: string;

  public items: any = [];

  constructor(private baseService: BaseService) { }

  ngOnInit(): void {
    this.items = this.baseService.base;
  }

  hideSearch() {
    document.querySelector<HTMLElement>('#searchComponent').style.display = "none";
    document.querySelector<HTMLElement>('#routerOutlet').style.display = "block";
    setTimeout(() => {
      document.querySelector<HTMLElement>('#routerOutlet').style.opacity = "1";
    }, 1);
  }

}
