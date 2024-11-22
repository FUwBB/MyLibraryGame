import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GOTYPage } from './goty.page';

const routes: Routes = [
  {
    path: '',
    component: GOTYPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GOTYPageRoutingModule {}
