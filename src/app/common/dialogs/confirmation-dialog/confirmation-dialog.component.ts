import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmationDialogComponent implements OnInit {
  action: any;
  change: any;
  message: any;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      this.message = 'Are you sure you wish to quit ?' ;
      if (data !== undefined || data !== null) {
      this.message = data.Data;
      }

     }

  ngOnInit() {

  }
  allClose(type): void {
    if (type === 'yes') {
      this.dialogRef.close('success');
    } else {
      this.dialogRef.close();
    }
  }
}


