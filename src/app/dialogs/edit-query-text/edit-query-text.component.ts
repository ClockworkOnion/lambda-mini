import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-query-text',
  templateUrl: './edit-query-text.component.html',
  styleUrls: ['./edit-query-text.component.scss'],
})
export class EditQueryTextComponent {
  constructor(
    public dialogRef: MatDialogRef<EditQueryTextComponent>,
    @Inject(MAT_DIALOG_DATA)
    public queryData: { queryId: string; query: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(this.queryData.query);
  }
}
