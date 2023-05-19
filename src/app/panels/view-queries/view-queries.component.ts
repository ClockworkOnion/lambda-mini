import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

interface queryInterface {
  queryId: string;
  query: string;
}
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
  queryList: queryInterface[] = [];

  constructor(private apiService: ApiService) {}

  getQueries(): void {
    this.apiService.getQueries().then((queries) => {
      console.log(queries);
      this.queryList = this.JSONtoQueryInterface(queries);
      console.log(this.queryList);
      this.statusText = 'Existing Queries:' + queries;
      this.queries = queries;
      this.response = queries;
    });
  }

  JSONtoQueryInterface(json: string): queryInterface[] {
    const jsonObject = JSON.parse(json);
    const queries: queryInterface[] = Object.keys(jsonObject).map((key) => ({
      queryId: key,
      query: jsonObject[key],
    }));
    return queries;
  }

  deleteQuery(queryId: string): void {
    this.apiService.deleteQuery(queryId).then((status) => {
      this.statusText = 'Status response: ' + status;
      this.getQueries();
    });
  }
}
