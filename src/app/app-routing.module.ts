import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TitleListComponent } from './title-list/title-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: 'portfolio', component: PortfolioComponent },
  // { path: 'titles', component: TitleFormComponent, loadChildren: () => import('./title-form/title-form.module').then(m => m.TitleFormModule) }
  { path: 'titles', component: TitleListComponent, loadChildren: () => import('./title-list/title-list.module').then(m => m.TitleListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
