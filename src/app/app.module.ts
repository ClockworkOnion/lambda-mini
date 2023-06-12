import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { StatusComponent } from './panels/status/status.component';
import { StreamlistComponent } from './panels/streamlist/streamlist.component';
import { CreateStreamComponent } from './panels/create-stream/create-stream.component';
import { DeleteStreamComponent } from './panels/delete-stream/delete-stream.component';
import { ViewQueriesComponent } from './panels/view-queries/view-queries.component';
import { RegisterQueryComponent } from './panels/register-query/register-query.component';
import { GetSchemaComponent } from './panels/get-schema/get-schema.component';
import { EvaluateComponent } from './panels/evaluate/evaluate.component';
import { EditQueryComponent } from './panels/edit-query/edit-query.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { DuplicateQueryComponent } from './dialogs/duplicate-query/duplicate-query.component';
import { EditQueryTextComponent } from './dialogs/edit-query-text/edit-query-text.component';

import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    StreamlistComponent,
    CreateStreamComponent,
    DeleteStreamComponent,
    ViewQueriesComponent,
    RegisterQueryComponent,
    GetSchemaComponent,
    EvaluateComponent,
    EditQueryComponent,
    ConfirmDeleteComponent,
    DuplicateQueryComponent,
    EditQueryTextComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatDividerModule,
    MatRadioModule,
    MatFormFieldModule,
    MatStepperModule,
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
