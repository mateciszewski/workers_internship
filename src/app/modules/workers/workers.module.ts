import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';
import { WorkersRoutingModule } from './workers-routing.module';
import { WorkerTileComponent } from './components/worker-tile/worker-tile.component';
import { WorkerAddComponent } from './components/worker-add/worker-add.component';
import { WorkersListComponent } from './components/workers-list/workers-list.component';
import { WorkersFiltersComponent } from './components/workers-filters/workers-filters.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MaterialModule } from '../material-module';
import { WorkerAddButtonComponent } from './components/worker-add/worker-add-button/worker-add-button.component';
import { WorkerUpdateComponent } from './components/worker-update/worker-update.component';

@NgModule({
  declarations: [
    WorkersPageComponent,
    WorkerTileComponent,
    WorkersListComponent,
    WorkersFiltersComponent,
    WorkerAddComponent,
    WorkerAddButtonComponent,
    WorkerUpdateComponent,
  ],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule,
    MaterialModule,
  ],
  exports: [MatButtonModule],
})
export class WorkersModule {}
