import { Component, OnInit } from '@angular/core';
import { BaseService } from "./../../../base.service";


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.styl']
})
export class CatalogComponent implements OnInit {

  public categoryCart: any[] = [];
  public subCategoryCart: any[] = [];
  public subCategoryCartId: any;
  public productCart: any[] = [];
  public emptyCategory: boolean = false;
  public emptyList: boolean = false;

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
    this.productCart = this.baseService.myOrganization.product;
    this.getCategoryList();
  }

  filterSubCategory(id) {
    let subCategoryCartFilter = this.baseService.myOrganization.categoryPriceList.filter(item => item.parent === id);
    if (this.subCategoryCartId === id) {
      this.subCategoryCartId = null;
      this.subCategoryCart = []
    } else {
      this.subCategoryCartId = id;
      this.subCategoryCart = subCategoryCartFilter
    }
  }

  getCategoryList(){
    let categoryList = this.baseService.myOrganization.categoryPriceList;
    if(categoryList.length === 0){
      this.emptyList = true
    }
  }

  getProductCart(category) {
    let product = this.baseService.myOrganization.product.filter(item => item.category === category);
    this.productCart = product;
    this.emptyCategory = false
    if (product.length === 0) {
      this.emptyCategory = true
    }
  }

  allProduct(){
    this.productCart = this.baseService.myOrganization.product;
  }


}
