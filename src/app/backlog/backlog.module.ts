import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacklogRoutingModule } from './backlog-routing.module';
import { BacklogShellComponent } from './backlog-shell/backlog-shell.component';
import { BacklogListComponent } from './backlog-list/backlog-list.component';
import { TaskStateModule } from '../shared/task-state/task-state.module';
import { ProjectSelectorModule } from '../shared/project-selector/project-selector.module';
import { TaskFiltersModule } from '../shared/task-filters/task-filters.module';
import { PaginatorModule } from '../shared/paginator/paginator.module';

@NgModule({
  declarations: [BacklogShellComponent, BacklogListComponent],
  imports: [
    CommonModule,
    BacklogRoutingModule,
    TaskStateModule,
    ProjectSelectorModule,
    TaskFiltersModule,
    PaginatorModule
  ]
})
export class BacklogModule { }
