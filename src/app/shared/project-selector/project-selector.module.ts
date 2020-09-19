import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSelectorComponent } from './project-selector.component';



@NgModule({
  declarations: [ProjectSelectorComponent],
  imports: [
    CommonModule
  ],
  exports: [ProjectSelectorComponent]
})
export class ProjectSelectorModule { }
