import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStateComponent } from './task-state.component';



@NgModule({
  declarations: [TaskStateComponent],
  imports: [
    CommonModule
  ],
  exports: [TaskStateComponent]
})
export class TaskStateModule { }
