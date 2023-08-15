import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../api.service';
import { streamSchema } from '../../interfaces/streamSchema';

@Component({
  selector: 'app-insert-elements-dialog',
  templateUrl: './insert-elements-dialog.component.html',
  styleUrls: ['./insert-elements-dialog.component.scss'],
})
export class InsertElementsDialogComponent {
  // insertQueryJSON: string = '';
  streamProperties: streamSchema[] = [];
  startTimestamp: number = 0;
  endTimestamp: number = 0;

  constructor(
    private dialogRef: MatDialogRef<InsertElementsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { streamName: string },
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getStreamSchema(this.data.streamName).then((schema) => {
      JSON.parse(schema).forEach((element: any) => {
        this.streamProperties.push(element);
        if (element.type === 'GEOMETRY') {
          element.coordinates = [0, 0];
        }
      });
      console.log(this.streamProperties);
    });
  }

  onConfirm(): void {
    // Construct a JSON formatted string that can be passed into the insert method.
    let stringArray: string[] = [];
    stringArray.push(`{"name": "${this.data.streamName}", "events": [{`);
    this.streamProperties.forEach((element) => {
      switch (element.type) {
        case 'STRING':
          stringArray.push(`"${element.name}": "${element.value}",`);
          break;
        case 'GEOMETRY':
          stringArray.push(
            `"${element.name}" : {"type" : "Point", "coordinates" : [ ${element.coordinates[0]}, ${element.coordinates[1]} ] },`
          );
          break;
        default:
          stringArray.push(`"${element.name}": ${element.value},`);
          break;
      }
    });

    stringArray.push(
      `"tstart": ${this.startTimestamp}, "tend": ${this.endTimestamp}}]}`
    );
    this.dialogRef.close(stringArray.join(''));
  }
}

/*
The JSON string must contain the name of the stream
and an array of events.  Each event must have a start
and end timestamp, and properties according to the stream.
Below is an example string for a stream named 'test1'
that has a string (prop1) and float (prop2) property.

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
}
*/
