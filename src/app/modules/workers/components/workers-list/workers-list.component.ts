import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Employee} from '../../../../core/models/employee';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersListComponent {
  @Input() workers: Employee[];
}
