import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkersPageComponent } from './pages/workers-page/workers-page.component';
import type { Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: WorkersPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkersRoutingModule {}
