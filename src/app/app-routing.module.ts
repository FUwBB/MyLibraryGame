import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'lacamento',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule)
  }, 
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'equipe',
    loadChildren: () => import('./pages/equipe/equipe.module').then( m => m.EquipePageModule)
  },
  {
    path: 'configuracao',
    loadChildren: () => import('./pages/configuracao/configuracao.module').then( m => m.ConfiguracaoPageModule)
  },
  {
    path: 'meuperfil',
    loadChildren: () => import('./pages/meuperfil/meuperfil.module').then( m => m.MeuperfilPageModule)
  },
  {
    path: 'game-detail/:id',
    loadChildren: () => import('./pages/game-detail/game-detail.module').then(m => m.GameDetailPageModule)
  },
  {
    path: 'popular',
    loadChildren: () => import('./pages/popular/popular.module').then(m => m.PopularPageModule)
  },
  {
    path: 'piores',
    loadChildren: () => import('./pages/piores/piores.module').then(m => m.PioresPageModule)
  },
  {
    path: 'lancamento',
    loadChildren: () => import('./pages/lancamento/lancamento.module').then(m => m.LancamentoPageModule)
  },
  {
    path: 'apresentacao',
    loadChildren: () => import('./pages/apresentacao/apresentacao.module').then(m => m.ApresentacaoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
