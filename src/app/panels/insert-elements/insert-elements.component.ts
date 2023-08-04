import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { StatusTextService } from '../../status-text.service';
import { MatDialog } from '@angular/material/dialog';
import { InsertElementsDialogComponent } from '../../dialogs/insert-elements-dialog/insert-elements-dialog.component';

@Component({
  selector: 'app-insert-elements',
  templateUrl: './insert-elements.component.html',
  styleUrls: ['./insert-elements.component.scss'],
})
export class InsertElementsComponent {
  jsonData: string = '';
  streamList: string[] = [];

  constructor(
    private apiService: ApiService,
    private textPrint: StatusTextService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getStreams();
  }

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

  insertByUI(stream: string): void {
    let dialogRef = this.dialog.open(InsertElementsDialogComponent, {
      data: { streamName: stream },
    });

    dialogRef.afterClosed().subscribe((insertElementJSON: string) => {
      if (!insertElementJSON) {
        return;
      }
      console.log(insertElementJSON);
      this.insertElements(insertElementJSON);
    });
  }

  getStreams(): void {
    this.apiService.getStreamNames().then((response) => {
      this.streamList = this.parseStreamsList(response);
    });
  }

  parseStreamsList(streamString: string): string[] {
    return streamString.split(',');
  }

  getHelp(): void {
    this.textPrint.pushStatusMessage(` -- Help for Insert Elements. --
The JSON string must contain the name of the stream
and an array of events.  Each event must have a start
and end timestamp, and properties according to the stream.
Below is an example string for a stream named 'test1'
that has a string (prop1) and float (prop2) property.\n
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
