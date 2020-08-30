import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./kanban/kanban.module').then(m => m.KanbanModule)},
  { path: 'backlog', loadChildren: () => import('./backlog/backlog.module').then(m => m.BacklogModule)},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
