import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'equipe',
    loadChildren: () => import('./equipe/equipe.module').then( m => m.EquipePageModule)
  },
  {
    path: 'meuperfil',
    loadChildren: () => import('./meuperfil/meuperfil.module').then( m => m.MeuperfilPageModule)
  },
  {
    path: 'configuracao',
    loadChildren: () => import('./configuracao/configuracao.module').then( m => m.ConfiguracaoPageModule)
  },
  {
    path: 'game-detail',
    loadChildren: () => import('./game-detail/game-detail.module').then( m => m.GameDetailPageModule)
  },  {
    path: 'popular',
    loadChildren: () => import('./popular/popular.module').then( m => m.PopularPageModule)
  },
  {
    path: 'piores',
    loadChildren: () => import('./piores/piores.module').then( m => m.PioresPageModule)
  },
  {
    path: 'lancamento',
    loadChildren: () => import('./lancamento/lancamento.module').then( m => m.LancamentoPageModule)
  },
  {
    path: 'apresentacao',
    loadChildren: () => import('./apresentacao/apresentacao.module').then( m => m.ApresentacaoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
