import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";

import { map, distinctUntilChanged } from 'rxjs/operators';

import { EmployeeFiltersState } from '../../../../core/models/employee-filters-state';
import { WorkersFacadeService } from './workers-facade.service';
import { EMPLOYEE_ORIGIN } from 'src/app/core/models/employee-origin';
import { WorkerAddEditDialogComponent } from "../../components/worker-add-edit-dialog/worker-add-edit-dialog.component";
import { EmployeeEntity } from 'src/app/core/models/employee-entity';
import { DeleteConfirmationDialogComponent } from '../../components/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-workers-page',
  templateUrl: './workers-page.component.html',
  styleUrls: ['./workers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersPageComponent implements OnInit {
  public list$ = this.workersFacade.list$;
  public filters$ = this.workersFacade.filters$;
  public autoCompleteNames$ = this.workersFacade.autoCompleteNames$;
  public autoCompleteCities$ = this.workersFacade.autoCompleteCities$;

  constructor(private workersFacade: WorkersFacadeService, private router: Router, private route: ActivatedRoute, private matDialog: MatDialog) { }

  public ngOnInit(): void {
    this.route.queryParams.pipe(
      map((params) => this.mapToFiltersValue(params)),
      distinctUntilChanged()
    ).subscribe((filters) => {
      this.workersFacade.setFilters(filters);
    });

    this.workersFacade.loadWorkers();
  }

  public onFiltersChanged(filtersState: EmployeeFiltersState): void {
    this.router.navigate([], {
      queryParams: filtersState,
      queryParamsHandling: 'merge'
    });
  }

  public onEditEmployee(worker: EmployeeEntity): void {
    const dialogRef = this.matDialog.open(WorkerAddEditDialogComponent, {
      width: '350px',
      data: worker
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.workersFacade.edit(worker.id, result);
    });
  }

  public onRemovedEmployee(worker: EmployeeEntity): void {
    const dialogRef = this.matDialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: worker
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.workersFacade.delete(worker);
    });
  }

  public openAddDialog(): void {
    const dialogRef = this.matDialog.open(WorkerAddEditDialogComponent, {
      width: '350px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.workersFacade.add(result);
    });
  }

  private mapToFiltersValue(params: Params): EmployeeFiltersState {
    return Object.keys(params).reduce((acc, key) => {
      return {...acc, ...(this.checkKeyInEmployeeEntity(key) ? {[key]: params[key]} : {})}
    }, {})
  }

  private checkKeyInEmployeeEntity(key: string): boolean {
    return Object.keys(EMPLOYEE_ORIGIN).includes(key);
  }
}
