import { Component, OnInit } from '@angular/core';
import { BaseService } from "./../../../base.service";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.styl']
})
export class AdvertisingComponent implements OnInit {

  private advertisingSubscribe: any;
  public advertisingArray: any[] = [];
  public emptyAdvertising: boolean = false

  constructor(
    public baseService: BaseService,
    public afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.getAdvertisingCompany();
  }

  ngOnDestroy(): void {
    this.advertisingSubscribe ? this.advertisingSubscribe.unsubscribe() : null;
  }

  getAdvertisingCompany() {
    this.advertisingSubscribe = this.afs
      .collection('advertising', ref => ref.where('parent', '==', this.baseService.myOrganization.id))
      .valueChanges()
      .subscribe(res => {
        this.advertisingArray = res;
          if(this.advertisingArray.length === 0){
            this.emptyAdvertising = true
            console.log(this.emptyAdvertising);
          }
      })

  }

}
