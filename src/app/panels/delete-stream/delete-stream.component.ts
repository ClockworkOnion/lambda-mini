import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-delete-stream',
  templateUrl: './delete-stream.component.html',
  styleUrls: ['./delete-stream.component.scss'],
})
export class DeleteStreamComponent {
  panelOpenState = false;
  statusText = '';
  streamName = '';

  constructor(private apiService: ApiService) {}

  deleteStream(streamName: string): void {
    this.apiService.deleteStream(streamName).then((status) => {
      this.statusText = 'Status: ' + status;
    });
  }
}
