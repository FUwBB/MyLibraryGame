import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PioresPageRoutingModule } from './piores-routing.module';

import { PioresPage } from './piores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PioresPageRoutingModule
  ],
  declarations: [PioresPage]
})
export class PioresPageModule {}
