import { Component, OnInit, Input, NgZone } from '@angular/core';
import { BaseService } from './../../../base.service';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment'

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.styl']
})
export class CompanyDataComponent implements OnInit {

  @Input() responses: Array<any>;

  private hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader;
  private title: string;
  public photoArray: any[] = []
  public organizationData: any[] = []
  public bigImage: string;

  public ref: AngularFireStorageReference;
  public task: AngularFireUploadTask;
  public uploadProgress: Observable<number>;
  public uploadProgressState: boolean = false;
  public uploadProgressTitle: boolean = false;
  public downloadURL: any;

  public allFotoOrg: any[] = [];
  public emptyPhoto: boolean = false

  constructor(
    public baseSevice: BaseService,
    private zone: NgZone,
    private http: HttpClient,
    private afStorage: AngularFireStorage,
    public afs: AngularFirestore,
  ) {
    this.responses = [];
    this.title = '';
    moment.locale('ru');
  }

  upload = (event) => {
    this.uploadProgressState = true;
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(`/moderate/${this.baseSevice.myOrganization.id}/` + randomId);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.baseSevice.uploaderFotoOrganization(randomId, url, this.baseSevice.myOrganization.id, moment(new Date()).format("DD MMMM YYYY"));
        });
        if (this.downloadURL) {
          this.baseSevice.openSnackBar("Фото успешно загруженно и отправлено на модерацию!", "", 3000, "right", "top", "success-dialog-red");
          setTimeout(() => {
            this.uploadProgressState = false;
          }, 700);
        }
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.organizationData= this.baseSevice.myOrganization;
    this.getFotoCompany();
  }

  getFotoCompany() {
    let getFotoCompanySub = this.afs.collection('photo', ref => ref.where('org', '==', this.baseSevice.myOrganization.id).where('moderate', '==', false))
      .valueChanges()
      .subscribe((res: any) => {
        this.bigImage = res[0].url
        this.allFotoOrg = res;
        getFotoCompanySub.unsubscribe();
      })
      setTimeout(() => {
        if(this.allFotoOrg.length === 0){
          this.emptyPhoto = true
        }
      }, 500);

  }

  foto: any;
  profileUrl: any;

  transformImage(url) {
    this.bigImage = url;
  }

}
