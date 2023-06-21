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
      this.statusText = 'Status: ' + status;
      this.statusWindow.pushStatusMessage('Register Query result:\n' + status);
    });
  }

  removeLineBreaks(text: string): string {
    return text.replace(/(\r\n|\n|\r)/gm, '');
  }
}
