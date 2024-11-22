import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GOTYPageRoutingModule } from './goty-routing.module';

import { GOTYPage } from './goty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GOTYPageRoutingModule
  ],
  declarations: [GOTYPage]
})
export class GOTYPageModule {}
