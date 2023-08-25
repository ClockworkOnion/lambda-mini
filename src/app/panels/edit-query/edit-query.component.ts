import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { queryInterface } from '../../interfaces/query';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/dialogs/confirm-delete/confirm-delete.component';
import { DuplicateQueryComponent } from 'src/app/dialogs/duplicate-query/duplicate-query.component';
import { EditQueryTextComponent } from 'src/app/dialogs/edit-query-text/edit-query-text.component';
import { StatusTextService } from 'src/app/status-text.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
@Component({
  selector: 'app-edit-query',
  templateUrl: './edit-query.component.html',
  styleUrls: ['./edit-query.component.scss'],
})
export class EditQueryComponent {
  panelOpenState = false;
  statusText = '';
  queries: queryInterface[] = [];
  errorMessage = 'No queries found. Check connection with ChronicleDB.';
  filterFavorites: boolean = false;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private statusWindow: StatusTextService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.getQueries();
  }

  checkValue(): void {}

  getQueries(): void {
    this.apiService.getQueries().then((queries) => {
      this.errorMessage =
        queries === '{}'
          ? 'No queries present. Go to "Register Query" to register a new query.'
          : 'Failed to get queries. Unexpected response from ChronicleDB.';
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
      this.statusText = 'Response from ChronicleDB:\n' + status; // TODO remove if central status window is used
      this.statusWindow.pushStatusMessage('Get Schema result:\n' + status);
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

      // Check for validity of the query first, by trying to get the schema
      this.apiService.getSchema(newQuery).then((status) => {
        if (status.startsWith('Failed')) {
          this.statusWindow.pushStatusMessage("Query is not valid, can't edit");
          return;
        }

        this.apiService.deleteQuery(queryId).then((deleteStatus) => {
          this.apiService.registerQuery(body).then((registerStatus) => {
            this.statusWindow.pushStatusMessage(
              'Status (delete): ' +
                deleteStatus +
                '\nStatus (register): ' +
                registerStatus
            );
            this.getQueries();
          });
        });
      });
    });
  }

  addFavorite(queryId: string): void {
    this.favoriteService.addFavorite(queryId);
  }

  removeFavorite(queryId: string): void {
    this.favoriteService.removeFavorite(queryId);
  }

  isFavorite(queryId: string): boolean {
    return this.favoriteService.isFavorite(queryId);
  }

  toggleFavorite(event: MatCheckboxChange, id: string): void {
    this.favoriteService.toggleFavorite(id);
  }
}
