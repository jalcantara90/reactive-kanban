import { ModalComponent } from './modal.component';
import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { ModalConfig } from './modal-config';

let incrementalId = 0;

export type ModalEventType = 'dismiss' | 'close';

export interface IModalEvent<T = any> {
  type: ModalEventType;
  data: T;
}

abstract class ModalEvent<T = any> {
  type: ModalEventType;
  data: T;
}

class DismissEvent<T = any> extends ModalEvent {
  constructor() {
    super();

    this.type = 'dismiss';
    this.data = null;
  }
}

class CloseEvent<T = any> extends ModalEvent {
  constructor(data?: T) {
    super();

    this.type = 'close';
    this.data = data;
  }
}

export class ModalRef<T, R = any> {
  componentInstance: T;
  private afterClosed = new Subject<IModalEvent>();
  public onClose$ = this.afterClosed.asObservable();
  private result: IModalEvent<R>;

  constructor(
    private containerInstance: ModalComponent,
    private overlayRef: OverlayRef,
    private customConfig: ModalConfig,
    private readonly modalId = `modal-${incrementalId++}`
  ) {
    containerInstance.modalId = modalId;

    overlayRef.backdropClick().pipe(
      filter(() => this.customConfig.hasBackdrop),
    ).subscribe(() => this.dismiss());

    this.containerInstance.animationStateChanged.pipe(
      filter(({state}) => state === 'closed'),
      tap(console.log),
      first()
    ).subscribe(() => this._close());
  }

  backdropClick(): Observable<MouseEvent> {
    return this.overlayRef.backdropClick();
  }

  close(data?: any): void {
    this.result = new CloseEvent(data);
    this.containerInstance.exitAnimationStart();
  }

  dismiss(): void {
    this.result = new DismissEvent();
    this.containerInstance.exitAnimationStart();
  }

  private _close(): void {
    this.overlayRef.dispose();
    this.afterClosed.next(this.result);
    this.afterClosed.complete();
    document.querySelectorAll('.cdk-overlay-container div').forEach(el => el.remove());
  }
}
