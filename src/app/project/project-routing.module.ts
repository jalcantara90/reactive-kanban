import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectShellComponent } from './project-shell/project-shell.component';

const routes: Routes = [{ path: '', component: ProjectShellComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
