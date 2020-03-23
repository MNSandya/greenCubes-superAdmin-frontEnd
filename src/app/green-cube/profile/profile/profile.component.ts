import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionStorage } from 'ngx-webstorage';
import { SharedService } from 'src/app/utils/services/shared/shared.service';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { Userdata } from 'src/app/utils/models/common.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('inputreset', { static: true }) elementView;
  @SessionStorage('userdata') public userdata: Userdata;
  selectedFile: ImageSnippet;
  public url: string;
  public baseUrl: string = environment.baseUrl;
  public userdisplaydata: any  = {} ;
  constructor( private commonService: CommonService,
               private sharedService: SharedService) {
                this.url = '../../../../assets/images/deafult.png';

   }

  ngOnInit() {
    this.loadProfile();
    this.sharedService.messageSource.next('profile');
    // this.sharedService.set('currentRoute', { url: [], path: [''], activePath: 'Profile' });

  }
  processFile(imageInput: any) {
    const file: File = imageInput.target.files[0];
    const reader = new FileReader();
    const formData = new FormData();
    formData.append('avatar', imageInput.target.files[0]);

    reader.addEventListener('load', (event: any) => {

      // tslint:disable-next-line: no-use-before-declare
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.commonService.uploadImage('api/profile/image', formData).subscribe(
        (res) => {
          if (res.success) {
            this.sharedService.displaySnackbar('success', 'Successfully uploded');
            this.loadProfile();

          }

        },
        (err) => {

        });
    });

    reader.readAsDataURL(file);
  }
  storeUserData(data: Userdata): void {
    this.userdata = new Userdata(data);
  }

loadProfile() {
  this.commonService.getData('api/singleUser?userid='  + this.userdata.id)
  .subscribe(response => {
    if (response.success) {
      this.storeUserData (response.payload);
      this.userdisplaydata = response.payload ;
      this.url = this.baseUrl  + this.userdata.image;
      this.sharedService.userdataupdate.next('update');
      if (this.userdata.image === '' || this.userdata.image === 'defaultImage.jpg') {
        this.url = '../../../../assets/images/deafult.png';
      } else {
      this.url = this.baseUrl + 'api/images/'  + this.userdata.image;
      }

  }});
}
}


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
