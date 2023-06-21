import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { queryInterface } from '../../interfaces/query';
import { query } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { StatusTextService } from 'src/app/status-text.service';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss'],
})
export class EvaluateComponent {
  panelOpenState = false;
  statusText = '';
  queries: queryInterface[] = [
    {
      queryId: 'placeholder',
      query: 'Update query list to see actual queries',
    },
  ];
  selectedQuery: queryInterface = { query: '', queryId: '' };
  startTimestamp: number = 0;
  endTimestamp: number = 1;

  constructor(
    private apiService: ApiService,
    private statusWindow: StatusTextService
  ) {}

  ngOnInit(): void {
    this.getQueries();
  }

  getQueries(): void {
    this.apiService.getQueries().then((queries) => {
      this.queries = this.JSONtoQueryInterface(queries);
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

  evaluate(): void {
    this.apiService
      .evaluateQuery(
        this.selectedQuery.queryId,
        this.startTimestamp,
        this.endTimestamp
      )
      .then((status) => {
        this.statusText = status;
        this.statusWindow.pushStatusMessage(
          'Evaluation result from ' +
            this.selectedQuery.queryId +
            ' between timestamps ' +
            this.startTimestamp +
            ' and ' +
            this.endTimestamp +
            ':\n' +
            status
        );
      });
  }
}
