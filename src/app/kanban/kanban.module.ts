import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanShellComponent } from './kanban-shell/kanban-shell.component';
import { KanbanColumnListComponent } from './kanban-column-list/kanban-column-list.component';
import { IssueCardComponent } from './issue-card/issue-card.component';
import { TaskStateModule } from '../shared/task-state/task-state.module';
import { ProjectSelectorModule } from '../shared/project-selector/project-selector.module';
import { TaskFiltersModule } from '../shared/task-filters/task-filters.module';
import { IconCheckboxModule } from '../shared/icon-checkbox/icon-checkbox.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [KanbanShellComponent, KanbanColumnListComponent, IssueCardComponent],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    TaskStateModule,
    ProjectSelectorModule,
    TaskFiltersModule,
    IconCheckboxModule,
    ReactiveFormsModule
  ],
  exports: [KanbanShellComponent]
})
export class KanbanModule { }