import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { StatusTextService } from 'src/app/status-text.service';

@Component({
  selector: 'app-register-query',
  templateUrl: './register-query.component.html',
  styleUrls: ['./register-query.component.scss'],
})
export class RegisterQueryComponent {
  panelOpenState = false;
  statusText = '';
  queryId = '';
  query = '';

  constructor(
    private apiService: ApiService,
    private statusWindow: StatusTextService
  ) {}

  registerQuery(id: string, querytext: string): void {
    // {
    //   "queryId": "string2",
    //   "query": "strings"
    // }
    const noLineBreaks = this.removeLineBreaks(querytext);
    const body = `{"queryId": "${id}","query": "${noLineBreaks}"}`;
    console.log(body);
    this.apiService.registerQuery(body).then((status) => {
      switch (status) {
        case '200':
          this.statusWindow.pushStatusMessage(
            'Response from ChronicleDB:\n200 - Query successfully registered'
          );
          break;
        case '400':
          this.statusWindow.pushStatusMessage(
            'Response from ChronicleDB:\n400 - Bad request; Check JSON format'
          );
          break;
        case '409':
          this.statusWindow.pushStatusMessage(
            'Response from ChronicleDB:\n409 - Invalid query, or query already exists'
          );
          break;
      }
    });
  }

  removeLineBreaks(text: string): string {
    return text.replace(/(\r\n|\n|\r)/gm, '');
  }
}
