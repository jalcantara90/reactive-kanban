import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KanbanShellComponent } from './kanban-shell/kanban-shell.component';

const routes: Routes = [{
  path: '', component: KanbanShellComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
