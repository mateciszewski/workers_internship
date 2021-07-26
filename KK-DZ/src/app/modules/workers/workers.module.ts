import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';
import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersTableComponent } from './components/workers-table/workers-table.component';
import { WorkersFiltersComponent } from './components/workers-filters/workers-filters.component';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { IsWorkingText } from './shared/pipes/is-working-text.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { WorkerAddEditDialogComponent } from './components/worker-add-edit-dialog/worker-add-edit-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    WorkersPageComponent,
    WorkersTableComponent,
    WorkersFiltersComponent,
    DeleteConfirmationDialogComponent,
    WorkerAddEditDialogComponent,
    IsWorkingText
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    WorkersRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
  ]
})
export class WorkersModule { }
