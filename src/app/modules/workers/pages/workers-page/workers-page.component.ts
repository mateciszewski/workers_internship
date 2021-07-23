import { Component, OnInit } from '@angular/core';
import { EmployeeFiltersState } from '../../../../core/models/employee-filters-state';
import { WorkersFacadeService } from './workers-facade.service';

@Component({
  selector: 'app-workers-page',
  templateUrl: './workers-page.component.html',
  styleUrls: ['./workers-page.component.scss']
})
export class WorkersPageComponent implements OnInit {
  public list$ = this.workersFacade.list$;
  public filters$ = this.workersFacade.filters$;

  constructor(private workersFacade: WorkersFacadeService) {
  }

  ngOnInit(): void {
    this.workersFacade.loadWorkers();
  }

  public onFiltersChanged(filtersState: EmployeeFiltersState) {
    this.workersFacade.setFilters(filtersState);
  }
}
