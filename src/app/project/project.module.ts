import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project-card/project-card.component';
import { ProjectShellComponent } from './project-shell/project-shell.component';
import { ContextualMenuModule } from '../shared/contextual-menu/contextual-menu.module';
import { ModalModule } from '../shared/modal/modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ProjectComponent, ProjectShellComponent, ProjectModalComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ContextualMenuModule,
    ModalModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class ProjectModule { }
