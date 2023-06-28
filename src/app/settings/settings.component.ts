import { Component } from '@angular/core';
import { StatusTextService } from '../status-text.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(apiService: ApiService, statusText: StatusTextService) {}
}
