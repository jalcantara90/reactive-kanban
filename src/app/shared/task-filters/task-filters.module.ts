import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFiltersComponent } from './task-filters.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [TaskFiltersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [TaskFiltersComponent]
})
export class TaskFiltersModule { }
