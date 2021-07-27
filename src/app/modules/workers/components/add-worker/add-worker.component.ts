import { Employee } from './../../../../core/models/employee';
import { Component, OnInit } from '@angular/core';
import { WorkersClientService } from '../../clients/workers-client.service';
import { WorkersFacadeService } from '../../pages/workers-page/workers-facade.service';


@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.scss']
})
export class AddWorkerComponent implements OnInit {

  name: string;
  age: number;
  city: string;
  isWorking: boolean;

  constructor(private workersClient: WorkersClientService, private workersFacade: WorkersFacadeService) { }

  ngOnInit(): void {
  }

  show(){
    this.workersClient.add(this.name,this.age,this.isWorking,this.city).subscribe();
    this.workersFacade.loadWorkers();
  }
}
