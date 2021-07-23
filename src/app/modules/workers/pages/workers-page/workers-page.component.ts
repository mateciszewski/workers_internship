import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";

import { map, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { EmployeeFiltersState } from '../../../../core/models/employee-filters-state';
import { WorkersFacadeService } from './workers-facade.service';
import { EmployeeEntityOrigin } from 'src/app/core/models/employee-entity-origin';
import { WorkerAddEditDialogComponent } from "../../components/worker-add-edit-dialog/worker-add-edit-dialog.component";

@Component({
  selector: 'app-workers-page',
  templateUrl: './workers-page.component.html',
  styleUrls: ['./workers-page.component.scss']
})
export class WorkersPageComponent implements OnInit, OnDestroy {
  public list$ = this.workersFacade.list$;
  public filters$ = this.workersFacade.filters$;

  private queryParamsFilter$ = this.route.queryParams.pipe(
    map((params) => Object.keys(params).reduce((acc, key) => {
      return {...acc, ...(this.checkKeyInEmployeeEntity(key) ? {[key]: params[key]} : {})}
    }, {}),
    distinctUntilChanged()
  ));

  private subscriptionQueryParamsFilter: Subscription;

  constructor(private workersFacade: WorkersFacadeService, private router: Router, private route: ActivatedRoute, private matDialog: MatDialog) { }

  public ngOnInit(): void {
    this.subscriptionQueryParamsFilter = this.queryParamsFilter$.subscribe((filters) => {
      this.workersFacade.setFilters(filters);
    });
    
    this.workersFacade.loadWorkers();
  }

  public ngOnDestroy(): void {
    this.subscriptionQueryParamsFilter.unsubscribe();
  }

  public onFiltersChanged(filtersState: EmployeeFiltersState): void {
    this.router.navigate([], {
      queryParams: filtersState,
      queryParamsHandling: 'merge'
    });
  }

  public openDialog(){
    this.matDialog.open(WorkerAddEditDialogComponent);
  }

  private checkKeyInEmployeeEntity(key: string): boolean {
    return Object.keys(EmployeeEntityOrigin).includes(key);
  }
}
