import { Component, OnInit } from '@angular/core';
import { ClientDetails } from 'src/app/utils/models/common.model';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  public clientModel: ClientDetails = new ClientDetails({});
  constructor() { }

  ngOnInit() {
  }

  space(event) {
    event.preventDefault();
  }
}
