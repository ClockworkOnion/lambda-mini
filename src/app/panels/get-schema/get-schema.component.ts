import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { StatusTextService } from 'src/app/status-text.service';

@Component({
  selector: 'app-get-schema',
  templateUrl: './get-schema.component.html',
  styleUrls: ['./get-schema.component.scss'],
})
export class GetSchemaComponent {
  panelOpenState = false;
  statusText = '';
  query = '';

  constructor(
    private apiService: ApiService,
    private statusWindow: StatusTextService
  ) {}

  getSchema(): void {
    this.apiService.getSchema(this.query).then((status) => {
      this.statusText = 'Status: ' + status;
      this.statusWindow.pushStatusMessage('Get Schema result:\n' + status);
    });
  }
}
