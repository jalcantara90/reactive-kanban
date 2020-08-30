import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BacklogShellComponent } from './backlog-shell/backlog-shell.component';

const routes: Routes = [
  { path: '', component: BacklogShellComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BacklogRoutingModule { }
