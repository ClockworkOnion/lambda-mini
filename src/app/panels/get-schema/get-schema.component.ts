import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-get-schema',
  templateUrl: './get-schema.component.html',
  styleUrls: ['./get-schema.component.scss'],
})
export class GetSchemaComponent {
  panelOpenState = false;
  statusText = '';
  query = '';

  constructor(private apiService: ApiService) {}

  getSchema(): void {
    this.apiService.getSchema(this.query).then((status) => {
      this.statusText = 'Status: ' + status;
    });
  }
}
