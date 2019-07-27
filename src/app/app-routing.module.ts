import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {PageComponent} from './page/page.component';
import {CONFIG} from './helpers/helpers';

const routes: Routes = [
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
