import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  panelOpenState = false;
  statusText = 'Press button to check status';

  constructor(private lambdaApi: ApiService) {}

  getStatus(): void {
    console.log('jepc status:');
    this.lambdaApi.getStatus().then((status) => {
      this.statusText = 'Status: ' + status;
    });
  }
}
