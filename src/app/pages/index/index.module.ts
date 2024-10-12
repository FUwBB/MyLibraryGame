import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';
import { IndexPage } from './index.page';
import { GameListComponent } from '../game-list/game-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule
  ],
  declarations: [IndexPage, GameListComponent]
})
export class IndexPageModule {}
