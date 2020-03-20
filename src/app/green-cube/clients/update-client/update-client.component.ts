import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SharedService } from '../../../utils/services/shared/shared.service';
import { CommonService } from '../../../utils/services/common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {

  public model = {};
  constructor(public dialog: MatDialog,
              public sharedService: SharedService,
              public commonService: CommonService,
              public dialogRef: MatDialogRef<UpdateClientComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public router: Router,
            ) { }

  ngOnInit() {
    this.model = this.data;
  }

  updateClient() {
    const requestData = {
      _id : this.model['id'],
      name : this.model['name']
    };
    this.sharedService.display(true);
    this.commonService.putData('api/clients', requestData).subscribe(response => {
      if (response.success) {
        this.sharedService.display(false);
        this.sharedService.displaySnackbar('success', 'Updated');
        this.dialogRef.close('success');
      }
    }, (error) => {
      this.sharedService.display(false);
      this.sharedService.displaySnackbar('Retry', error.message);
    });
  }
}
