import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSelectorComponent } from './project-selector.component';

@NgModule({
  declarations: [ProjectSelectorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ProjectSelectorComponent]
})
export class ProjectSelectorModule { }
