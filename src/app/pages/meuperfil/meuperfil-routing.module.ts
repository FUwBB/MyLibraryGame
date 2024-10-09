import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeuperfilPage } from './meuperfil.page';

const routes: Routes = [
  {
    path: '',
    component: MeuperfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeuperfilPageRoutingModule {}
