import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";

import { map, distinctUntilChanged } from 'rxjs/operators';

import { EmployeeFiltersState } from '../../../../core/models/employee-filters-state';
import { WorkersFacadeService } from './workers-facade.service';
import { EmployeeOrigin } from 'src/app/core/models/employee-origin';
import { WorkerAddEditDialogComponent } from "../../components/worker-add-edit-dialog/worker-add-edit-dialog.component";
import { EmployeeEntity } from 'src/app/core/models/employee-entity';
import { DeleteConfirmationDialog } from '../../components/delete-confirmation-dialog/delete-confirmation-dialog';

@Component({
  selector: 'app-workers-page',
  templateUrl: './workers-page.component.html',
  styleUrls: ['./workers-page.component.scss']
})
export class WorkersPageComponent implements OnInit {
  public list$ = this.workersFacade.list$;
  public filters$ = this.workersFacade.filters$;

  constructor(private workersFacade: WorkersFacadeService, private router: Router, private route: ActivatedRoute, private matDialog: MatDialog) { }

  public ngOnInit(): void {
    this.route.queryParams.pipe(
      map((params) => Object.keys(params).reduce((acc, key) => {
        return {...acc, ...(this.checkKeyInEmployeeEntity(key) ? {[key]: params[key]} : {})}
      }, {}),
      distinctUntilChanged()
    )).subscribe((filters) => {
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

  public onRemovedEmployee(worker: EmployeeEntity): void {
    const dialogRef = this.matDialog.open(DeleteConfirmationDialog, {
      width: '400px',
      data: worker
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.workersFacade.delete(worker);
    });
  }

  public openDialog(): void {
    this.matDialog.open(WorkerAddEditDialogComponent);
  }

  private checkKeyInEmployeeEntity(key: string): boolean {
    return Object.keys(EmployeeOrigin).includes(key);
  }
}
