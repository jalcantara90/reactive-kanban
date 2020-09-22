import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project-card/project-card.component';
import { ProjectShellComponent } from './project-shell/project-shell.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ContextualMenuModule } from '../shared/contextual-menu/contextual-menu.module';

@NgModule({
  declarations: [ProjectComponent, ProjectShellComponent, ProjectListComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ContextualMenuModule
  ]
})
export class ProjectModule { }
