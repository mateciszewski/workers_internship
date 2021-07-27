import { Employee } from './../../../../core/models/employee';
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {EmployeeFiltersState} from '../../../../core/models/employee-filters-state';
import {WorkersFacadeService} from './workers-facade.service';

@Component({
  selector: 'app-workers-page',
  templateUrl: './workers-page.component.html',
  styleUrls: ['./workers-page.component.scss']
})
export class WorkersPageComponent implements OnInit {
  public list$ = this.workersFacade.list$;
  public filters$ = this.workersFacade.filters$;

  constructor(
    private workersFacade: WorkersFacadeService,
    private route: ActivatedRoute,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    this.workersFacade.loadWorkers();
    this.route.queryParams.subscribe((queryParams: Employee)=> {
      this.workersFacade.setFilters(queryParams);
    })
  }

  public onFiltersChanged(filtersState: EmployeeFiltersState) {
    this.router.navigate(['/'], {queryParams: filtersState})
  }

}
