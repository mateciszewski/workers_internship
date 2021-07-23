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
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WorkersPageComponent, WorkerTileComponent, WorkersListComponent, WorkersFiltersComponent],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule,
    MatTableModule,
    MatButtonModule,
  ]
})
export class WorkersModule { }
