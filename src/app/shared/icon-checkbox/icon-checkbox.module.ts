import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconCheckboxComponent } from './icon-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [IconCheckboxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [IconCheckboxComponent]
})
export class IconCheckboxModule { }
