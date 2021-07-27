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
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [WorkersPageComponent, WorkerTileComponent, WorkersListComponent, WorkersFiltersComponent, AddWorkerComponent],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule,
    MatSelectModule,
    MatDialogModule,
  ],
})
export class WorkersModule { }
