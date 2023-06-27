import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { StatusTextService } from '../../status-text.service';

@Component({
  selector: 'app-insert-elements',
  templateUrl: './insert-elements.component.html',
  styleUrls: ['./insert-elements.component.scss'],
})
export class InsertElementsComponent {
  jsonData: string = '';

  constructor(
    private apiService: ApiService,
    private textPrint: StatusTextService
  ) {}

  insertElements(jsonString: string) {
    this.apiService.insertElements(jsonString).then((status) => {
      console.log(status);
      switch (status) {
        case '200':
          this.textPrint.pushStatusMessage(
            'Response from ChronicleDB:\n200 - Elements successfully added'
          );
          break;
        case '400':
          this.textPrint.pushStatusMessage(
            'Response from ChronicleDB:\n400 - Bad Request, check JSON format'
          );
          break;
        default:
          this.textPrint.pushStatusMessage('Unknown response from ChronicleDB');
          break;
      }
    });
  }

  getHelp(): void {
    this.textPrint.pushStatusMessage(` -- Help for Insert Elements. --
The JSON string must contain the name of the stream and an array of events. Each event must have a start and end timestamp, and properties according to the stream.
Below is an example string for a stream named 'test1' that has a string (prop1) and float (prop2) property.\n
{
  "name": "test1",
  "events": [
    {
      "Prop1": "some string",
      "Prop2" : 2.0,
      "tstart": 10,
      "tend": 11
    }
  ]
}`);
  }
}
