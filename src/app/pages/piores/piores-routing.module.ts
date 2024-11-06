import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PioresPage } from './piores.page';

const routes: Routes = [
  {
    path: '',
    component: PioresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PioresPageRoutingModule {}
