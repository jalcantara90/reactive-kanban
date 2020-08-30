import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BacklogRoutingModule } from './backlog-routing.module';
import { BacklogShellComponent } from './backlog-shell/backlog-shell.component';


@NgModule({
  declarations: [BacklogShellComponent],
  imports: [
    CommonModule,
    BacklogRoutingModule
  ]
})
export class BacklogModule { }
