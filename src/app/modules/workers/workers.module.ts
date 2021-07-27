import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';
import { WorkersRoutingModule } from './workers-routing.module';
import { WorkerTileComponent } from './components/worker-tile/worker-tile.component';
import { WorkersListComponent } from './components/workers-list/workers-list.component';
import { WorkersFiltersComponent } from './components/workers-filters/workers-filters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { AddWorkerComponent } from './components/add-worker/add-worker.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EditWorkerComponent } from './components/edit-worker/edit-worker.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WorkerFormComponent } from './components/worker-form/worker-form.component';
import { DeleteWorkerComponent } from './components/delete-worker/delete-worker.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    WorkersPageComponent,
    WorkerTileComponent,
    WorkersListComponent,
    WorkersFiltersComponent,
    AddWorkerComponent,
    EditWorkerComponent,
    WorkerFormComponent,
    DeleteWorkerComponent,
  ],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class WorkersModule {}
