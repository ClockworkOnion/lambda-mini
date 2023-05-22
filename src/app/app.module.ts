import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { StatusComponent } from './panels/status/status.component';
import { StreamlistComponent } from './panels/streamlist/streamlist.component';
import { CreateStreamComponent } from './panels/create-stream/create-stream.component';
import { DeleteStreamComponent } from './panels/delete-stream/delete-stream.component';
import { ViewQueriesComponent } from './panels/view-queries/view-queries.component';
import { RegisterQueryComponent } from './panels/register-query/register-query.component';
import { GetSchemaComponent } from './panels/get-schema/get-schema.component';
import { EvaluateComponent } from './panels/evaluate/evaluate.component';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
