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
      switch (status) {
        case '200':
          this.statusWindow.pushStatusMessage(
            'Response from ChronicleDB:\n200 - Stream successfully deleted'
          );
          break;
        case '400':
          this.statusWindow.pushStatusMessage(
            'Response from ChronicleDB:\n400 - Bad Request, check stream name'
          );
          break;
        case '404':
          this.statusWindow.pushStatusMessage(
            'Response from ChronicleDB:\n404 - Stream not found'
          );
          break;
        default:
          this.statusWindow.pushStatusMessage(
            'Unknown response from ChronicleDB'
          );
          break;
      }
    });
  }
}
