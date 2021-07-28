import { NgModule } from '@angular/core';
import { EmptyTableText } from './pipes/empty-table-text.pipe';
import { IsWorkingText } from './pipes/is-working-text.pipe';

@NgModule({
  imports: [],
  declarations: [EmptyTableText, IsWorkingText],
  exports: [EmptyTableText, IsWorkingText],
})
export class WorkersPipesModules {}
