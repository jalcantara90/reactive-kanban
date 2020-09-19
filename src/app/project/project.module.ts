import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project-card/project-card.component';
import { ProjectShellComponent } from './project-shell/project-shell.component';
import { ProjectListComponent } from './project-list/project-list.component';


@NgModule({
  declarations: [ProjectComponent, ProjectShellComponent, ProjectListComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
