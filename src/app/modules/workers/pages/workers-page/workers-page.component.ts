import { Component, OnInit } from '@angular/core';
import { EmployeeFiltersState } from '../../../../core/models/employee-filters-state';
import { WorkersFacadeService } from './workers-facade.service';
import { MatDialog } from "@angular/material/dialog";
import { WorkerAddEditDialogComponent } from "../../components/worker-add-edit-dialog/worker-add-edit-dialog.component";

@Component({
  selector: 'app-workers-page',
  templateUrl: './workers-page.component.html',
  styleUrls: ['./workers-page.component.scss']
})
export class WorkersPageComponent implements OnInit {
  public list$ = this.workersFacade.list$;
  public filters$ = this.workersFacade.filters$;

  constructor(private workersFacade: WorkersFacadeService,private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.workersFacade.loadWorkers();
  }

  public onFiltersChanged(filtersState: EmployeeFiltersState) {
    this.workersFacade.setFilters(filtersState);
  }

  public openDialog(){
    this.matDialog.open(WorkerAddEditDialogComponent);
  }
}
