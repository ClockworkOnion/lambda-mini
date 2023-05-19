import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-view-queries',
  templateUrl: './view-queries.component.html',
  styleUrls: ['./view-queries.component.scss'],
})
export class ViewQueriesComponent {
  panelOpenState = false;
  statusText = 'Press button to check status';
  queries = '';
  response = {};

  constructor(private apiService: ApiService) {}

  getQueries(): void {
    this.apiService.getQueries().then((queries) => {
      console.log(queries);
      this.statusText = 'Existing Queries:' + queries;
      this.queries = queries;
      this.response = queries;
    });
  }
}
