import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanShellComponent } from './kanban-shell/kanban-shell.component';
import { KanbanColumnListComponent } from './kanban-column-list/kanban-column-list.component';
import { IssueCardComponent } from './issue-card/issue-card.component';
import { KanbanColumnComponent } from './kanban-column/kanban-column.component';
import { KanbanFiltersComponent } from './kanban-filters/kanban-filters.component';


@NgModule({
  declarations: [KanbanShellComponent, KanbanColumnListComponent, IssueCardComponent, KanbanColumnComponent, KanbanFiltersComponent],
  imports: [
    CommonModule,
    KanbanRoutingModule
  ],
  exports: [KanbanShellComponent]
})
export class KanbanModule { }
