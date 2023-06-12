import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { queryInterface } from '../../interfaces/query';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/dialogs/confirm-delete/confirm-delete.component';
import { DuplicateQueryComponent } from 'src/app/dialogs/duplicate-query/duplicate-query.component';
import { EditQueryTextComponent } from 'src/app/dialogs/edit-query-text/edit-query-text.component';
@Component({
  selector: 'app-edit-query',
  templateUrl: './edit-query.component.html',
  styleUrls: ['./edit-query.component.scss'],
})
export class EditQueryComponent {
  panelOpenState = false;
  statusText = '';
  queries: queryInterface[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getQueries();
  }

  checkValue(): void {}

  getQueries(): void {
    this.apiService.getQueries().then((queries) => {
      this.queries = ApiService.JSONtoQueryInterface(queries);
    });
  }

  deleteQuery(queryName: string): void {
    let dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.apiService.deleteQuery(queryName).then((status) => {
        this.statusText = 'Status: ' + status;
        this.getQueries();
      });
    });
  }

  getSchema(query: string): void {
    this.apiService.getSchema(query).then((status) => {
      this.statusText = 'Response from ChronicleDB:\n' + status;
    });
  }

  /**
   * Creates a new query with the same text as the query passed in, but a new id/name
   * @param querytext the query to duplicate
   */
  onDuplicate(querytext: string): void {
    let dialogRef = this.dialog.open(DuplicateQueryComponent);

    dialogRef.afterClosed().subscribe((newId) => {
      if (!newId) {
        return;
      }
      const body = `{"queryId": "${newId}","query": "${querytext}"}`;
      this.apiService.registerQuery(body).then((status) => {
        this.statusText = 'Status: ' + status;
        this.getQueries();
      });
    });
  }

  /**
   * Edits a query by first deleting it, then registering a new query with the same id but a new query text
   * @param queryId
   * @param query
   */
  onEdit(queryId: string, query: string): void {
    let dialogRef = this.dialog.open(EditQueryTextComponent, {
      data: { queryId: queryId, query: query },
    });

    dialogRef.afterClosed().subscribe((newQuery) => {
      if (!newQuery) {
        return;
      }
      const body = `{"queryId": "${queryId}","query": "${newQuery}"}`;
      this.apiService.deleteQuery(queryId).then((deleteStatus) => {
        this.apiService.registerQuery(body).then((registerStatus) => {
          this.statusText =
            'Status (delete): ' +
            deleteStatus +
            '\nStatus (register): ' +
            registerStatus;
          this.getQueries();
        });
      });
    });
  }

  // registerQuery(id: string, querytext: string): void {
  //   const body = `{"queryId": "${id}","query": "${querytext}"}`;
  //   console.log(body);
  //   this.apiService.registerQuery(body).then((status) => {
  //     this.statusText = 'Status: ' + status;
  //   });
  // }
}
