import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {PageComponent} from './page/page.component';
import {CONFIG} from './helpers/helpers';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    data: {
      id: CONFIG.contentTypeIds.overviewPage
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
