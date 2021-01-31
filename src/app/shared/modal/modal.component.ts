import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, ComponentRef, EmbeddedViewRef, EventEmitter, ViewChild, HostListener, HostBinding } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { modalAnimations } from './modal.animations';
import { ModalAnimationEvent, ModalAnimationState } from './modal-config';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  animations: [modalAnimations],
  host: {
    '(@modalAnimations.start)': 'onAnimationStart($event)',
    '(@modalAnimations.done)': 'onAnimationDone($event)'
  }
})
export class ModalComponent extends BasePortalOutlet {
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;
  public modalId: string;
  public state: ModalAnimationState = 'enter';
  public animationStateChanged = new EventEmitter<ModalAnimationEvent>();
  @HostBinding('style.width') hostWidth = '100%';
  @HostBinding('class.modal-container') modalContainer = true;
  @HostBinding('@modalAnimations')  get animationState(): string {
    return this.state;
  }

  constructor() {
    super();
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    throw new Error('Method not implemented.');
  }

  onAnimationDone({toState, totalTime}: AnimationEvent): void {
    if (toState === 'enter') {
      this.animationStateChanged.next({state: 'opened', totalTime});
    } else if (toState === 'exit') {
      this.animationStateChanged.next({state: 'closed', totalTime});
    }
  }

  onAnimationStart({toState, totalTime}: AnimationEvent): void {
    if (toState === 'enter') {
      this.animationStateChanged.next({state: 'opening', totalTime});
    } else if (toState === 'exit' || toState === 'void') {
      this.animationStateChanged.next({state: 'closing', totalTime});
    }
  }

  exitAnimationStart(): void {
    this.state = 'exit';
  }
}
