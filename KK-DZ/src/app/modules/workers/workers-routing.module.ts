import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';


const routes: Routes = [
  {path: '', component: WorkersPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule {
}
