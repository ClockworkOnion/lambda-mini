import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-streamlist',
  templateUrl: './streamlist.component.html',
  styleUrls: ['./streamlist.component.scss'],
})
export class StreamlistComponent {
  panelOpenState = false;
  streams = 'Press button to check streams';

  constructor(private lambdaApi: ApiService) {}

  getStreams(): void {
    console.log('jepc streams:');
    this.lambdaApi.getStreamNames().then((response) => {
      this.streams = response;
    });
  }
}
