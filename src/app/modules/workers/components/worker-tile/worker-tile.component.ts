import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Employee} from '../../../../core/models/employee';

@Component({
  selector: 'app-worker-tile',
  templateUrl: './worker-tile.component.html',
  styleUrls: ['./worker-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerTileComponent {
  @Input() worker: Employee;
}
