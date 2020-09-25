import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { OverlayContainer, FullscreenOverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule
  ],
  providers: [
    ModalService,
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer }
  ],
  entryComponents: [ModalComponent]
})
export class ModalModule { }
