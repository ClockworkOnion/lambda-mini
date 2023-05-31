import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-duplicate-query',
  templateUrl: './duplicate-query.component.html',
  styleUrls: ['./duplicate-query.component.scss'],
})
export class DuplicateQueryComponent {
  queryId = '';

  constructor(private dialogRef: MatDialogRef<DuplicateQueryComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(this.queryId);
  }
}
