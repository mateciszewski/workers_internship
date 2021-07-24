import { FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import type { OnInit } from '@angular/core';
import type { Employee } from 'src/app/core/models/employee';
import type { WorkersFacadeService } from '../../pages/workers-page/workers-facade.service';

@Component({
  selector: 'app-worker-add',
  templateUrl: './worker-add.component.html',
  styleUrls: ['./worker-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkerAddComponent implements OnInit {
  @Output() newWorker = new EventEmitter<Employee>();

  public addform = new FormGroup({
    name: new FormControl(''),
    isWorking: new FormControl(null),
    age: new FormControl(null),
    city: new FormControl(''),
  });

  constructor(private workersFacade: WorkersFacadeService) {}
  ngOnInit() {}

  public onSubmit() {
    this.workersFacade.addWorker(this.addform.value);
  }
}
