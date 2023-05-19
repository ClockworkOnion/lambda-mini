import { Component } from '@angular/core';
import { streamProperty } from '../../interfaces/streamProperty';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-create-stream',
  templateUrl: './create-stream.component.html',
  styleUrls: ['./create-stream.component.scss'],
})
export class CreateStreamComponent {
  panelOpenState = false;
  streamName: string = '';
  statusText: string = 'wip';
  properties: streamProperty[] = [];

  constructor(private apiService: ApiService) {
    this.properties.push({ name: '', type: '' });
  }

  createStream(): void {
    // TODO: Check for valid inputs in the form, then create stream or display error
    const JSONproperties = JSON.stringify(this.properties);
    const JSONname = '"name": "' + this.streamName + '"';
    const JSONstring = '{' + JSONname + ', "schema":' + JSONproperties + '}';
    this.apiService.createStream(JSONstring).then((status) => {
      this.statusText = 'Status: ' + status;
    });
  }

  addProperty(): void {
    this.properties.push({ name: '', type: '' });
  }
}
