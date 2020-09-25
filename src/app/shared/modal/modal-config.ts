
import {ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {Direction} from '@angular/cdk/bidi';
import {ScrollStrategy} from '@angular/cdk/overlay';

export type ModalRole = 'dialog' | 'alertdialog';

export interface ModalPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export type ModalAnimationState = 'void' | 'enter' | 'exit';

export interface ModalAnimationEvent {
  state: 'opened' | 'opening' | 'closing' | 'closed';
  totalTime: number;
}

export class ModalConfig<D = any> {
  viewContainerRef?: ViewContainerRef;
  role?: ModalRole = 'dialog';
  panelClass?: string | string[] = '';
  hasBackdrop? = true;
  backdropClass? = '';
  disableClose? = false;
  width? = '100%';
  height? = '';
  minWidth?: number | string = '';
  minHeight?: number | string;
  maxWidth?: number | string = '';
  maxHeight?: number | string;
  position?: ModalPosition;
  data?: D | null = null;
  direction?: Direction;
  ariaDescribedBy?: string | null = null;
  ariaLabelledBy?: string | null = null;
  ariaLabel?: string | null = null;
  autoFocus? = true;
  restoreFocus? = true;
  scrollStrategy?: ScrollStrategy;
  closeOnNavigation? = true;
  componentFactoryResolver?: ComponentFactoryResolver;
}
