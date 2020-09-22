import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextualMenuDirective } from './contextual-menu.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { ContextualMenuComponent } from './contextual-menu.component';

@NgModule({
  declarations: [ContextualMenuDirective, ContextualMenuComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [ContextualMenuDirective, ContextualMenuComponent]
})
export class ContextualMenuModule { }
