import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

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

  constructor(private apiService: ApiService) {}

  registerQuery(id: string, querytext: string): void {
    // {
    //   "queryId": "string2",
    //   "query": "strings"
    // }
    const body = `{"queryId": "${id}","query": "${querytext}"}`;
    console.log(body);
    this.apiService.registerQuery(body).then((status) => {
      this.statusText = 'Status: ' + status;
    });
  }
}
