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
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { StatusComponent } from './panels/status/status.component';
import { StreamlistComponent } from './panels/streamlist/streamlist.component';
import { CreateStreamComponent } from './panels/create-stream/create-stream.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    StreamlistComponent,
    CreateStreamComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
