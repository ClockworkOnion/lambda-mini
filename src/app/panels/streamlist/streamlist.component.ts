import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { StatusTextService } from 'src/app/status-text.service';

@Component({
  selector: 'app-streamlist',
  templateUrl: './streamlist.component.html',
  styleUrls: ['./streamlist.component.scss'],
})
export class StreamlistComponent {
  panelOpenState = false;
  streams = 'Press button to check streams';
  streamList: string[] = [];

  constructor(
    private lambdaApi: ApiService,
    private statusWindow: StatusTextService
  ) {}

  ngOnInit(): void {
    this.getStreams();
  }

  getStreams(): void {
    this.lambdaApi.getStreamNames().then((response) => {
      this.streamList = this.parseStreamsList(response);
      this.streams = response;
    });
  }

  parseStreamsList(streamString: string): string[] {
    return streamString.split(',');
  }

  getSchema(stream: string): void {
    this.lambdaApi.getStreamSchema(stream).then((response) => {
      // this.streams = response;
      this.statusWindow.pushStatusMessage('Get Schema result:\n' + response);
    });
  }

  deleteStream(stream: string): void {
    this.lambdaApi.deleteStream(stream).then((response) => {
      this.streams = response;
      this.getStreams();
    });
  }
}
