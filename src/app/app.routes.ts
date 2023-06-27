import { Routes } from '@angular/router';

import { RegisterQueryComponent } from './panels/register-query/register-query.component';
import { GetSchemaComponent } from './panels/get-schema/get-schema.component';
import { EditQueryComponent } from './panels/edit-query/edit-query.component';

import { StreamlistComponent } from './panels/streamlist/streamlist.component';
import { CreateStreamComponent } from './panels/create-stream/create-stream.component';
import { DeleteStreamComponent } from './panels/delete-stream/delete-stream.component';
import { EvaluateComponent } from './panels/evaluate/evaluate.component';
import { InsertElementsComponent } from './panels/insert-elements/insert-elements.component';

export const routes: Routes = [
  { path: '', redirectTo: 'streamlist', pathMatch: 'full' },
  { path: 'streamlist', component: StreamlistComponent },
  { path: 'insertelements', component: InsertElementsComponent },
  { path: 'registerquery', component: RegisterQueryComponent },
  { path: 'getschema', component: GetSchemaComponent },
  { path: 'editquery', component: EditQueryComponent },
  { path: 'createstream', component: CreateStreamComponent },
  { path: 'deletestream', component: DeleteStreamComponent },
  { path: 'evaluate', component: EvaluateComponent },
  { path: '**', redirectTo: 'streamlist' },
];
