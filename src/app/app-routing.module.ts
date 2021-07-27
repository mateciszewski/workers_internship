import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import type{ Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/workers/workers.module').then((m) => m.WorkersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
