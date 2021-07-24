import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import type { ActivatedRoute, Router } from '@angular/router';
import type { EmployeeFiltersState } from 'src/app/core/models/employee-filters-state';
import type { WorkersFacadeService } from './workers-facade.service';
import type { Observable } from 'rxjs/internal/Observable';
import type { Employee } from 'src/app/core/models/employee';

@Component({
  selector: 'app-workers-page',
  templateUrl: './workers-page.component.html',
  styleUrls: ['./workers-page.component.scss'],
})
export class WorkersPageComponent implements OnInit {
  public list$: Observable<Employee[]>;
  public filters$: Observable<EmployeeFiltersState>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workersFacade: WorkersFacadeService,
  ) {
    this.list$ = this.workersFacade.list$;
    this.filters$ = this.workersFacade.filters$;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: EmployeeFiltersState) => {
      this.workersFacade.setFilters(queryParams);
    });
    this.workersFacade.loadWorkers();
  }

  public onFiltersChanged(filtersState: EmployeeFiltersState) {
    const filters = this.workersFacade.parseFilterState(filtersState);
    this.router.navigate(['/'], { queryParams: filters });
    this.workersFacade.setFilters(filters);
  }
}
