import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { StatusTextService } from 'src/app/status-text.service';

@Component({
  selector: 'app-delete-stream',
  templateUrl: './delete-stream.component.html',
  styleUrls: ['./delete-stream.component.scss'],
})
export class DeleteStreamComponent {
  panelOpenState = false;
  statusText = '';
  streamName = '';

  constructor(
    private apiService: ApiService,
    private statusWindow: StatusTextService
  ) {}

  deleteStream(streamName: string): void {
    this.apiService.deleteStream(streamName).then((status) => {
      this.statusText = 'Status: ' + status;
      this.statusWindow.pushStatusMessage('Delete Stream result:\n' + status);
    });
  }
}
