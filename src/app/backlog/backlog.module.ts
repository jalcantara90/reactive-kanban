import { ModalModule } from '../shared/modal/modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacklogRoutingModule } from './backlog-routing.module';
import { BacklogShellComponent } from './backlog-shell/backlog-shell.component';
import { BacklogListComponent } from './backlog-list/backlog-list.component';
import { TaskStateModule } from '../shared/task-state/task-state.module';
import { ProjectSelectorModule } from '../shared/project-selector/project-selector.module';
import { TaskFiltersModule } from '../shared/task-filters/task-filters.module';
import { PaginatorModule } from '../shared/paginator/paginator.module';
import { IconCheckboxModule } from '../shared/icon-checkbox/icon-checkbox.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BacklogModalComponent } from './backlog-modal/backlog-modal.component';

@NgModule({
  declarations: [BacklogShellComponent, BacklogListComponent, BacklogModalComponent],
  imports: [
    CommonModule,
    BacklogRoutingModule,
    TaskStateModule,
    ProjectSelectorModule,
    TaskFiltersModule,
    PaginatorModule,
    IconCheckboxModule,
    ReactiveFormsModule,
    DragDropModule,
    ModalModule
  ]
})
export class BacklogModule { }
