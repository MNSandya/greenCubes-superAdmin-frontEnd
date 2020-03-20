import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedService } from './utils/services/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'greenCubes-superAdmin-frontend';
  public loading = true;
  constructor(
    public sharedService: SharedService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }
  ngOnInit() {
    this.sharedService.status.subscribe((val: boolean) => {
      this.loading = val;
      this.changeDetectorRef.detectChanges();
    });
  }
}
