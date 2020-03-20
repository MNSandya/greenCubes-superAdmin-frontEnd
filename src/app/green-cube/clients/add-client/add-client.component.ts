import { Component, OnInit } from '@angular/core';
import { ClientDetails } from 'src/app/utils/models/common.model';
import { Router } from '@angular/router';
import { SharedService } from '../../../utils/services/shared/shared.service';
import { CommonService } from '../../../utils/services/common/common.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  public clientModel: ClientDetails = new ClientDetails({});
  constructor(
    public router: Router,
    private sharedService: SharedService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
  }

  space(event) {
    event.preventDefault();
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }

   // save and update data
   onSubmit(): void {
      this.sharedService.display(true);
      this.commonService.postData('api/clients', this.clientModel).subscribe(response => {
        if (response.success) {
          this.sharedService.display(false);
          this.sharedService.displaySnackbar('success', 'Successfully updated');
          this.router.navigate(['dashboard']);
        }
      }, (error) => {
        this.sharedService.display(false);
        this.sharedService.displaySnackbar('error', error.message);
        // this.snackBar.open( error.error.message, 'Retry', {
        //   duration: 2000,
        // });
      });
    }
}
