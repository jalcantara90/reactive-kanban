import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { FlexibleConnectedPositionStrategy, HorizontalConnectionPos, Overlay, OverlayRef, VerticalConnectionPos } from '@angular/cdk/overlay';
import { fromEvent, Subscription } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';

type HorizontalPosition = 'left' | 'center' | 'right';
const OFFSET: number = 15;

@Directive({
  selector: '[contextualMenu]'
})
export class ContextualMenuDirective implements AfterViewInit, OnDestroy {
  @Input() contextualMenu: TemplateRef<any>;
  @Input() horizontalPosition: HorizontalPosition = 'right';
  @Input() verticalPosition: VerticalConnectionPos = 'bottom';
  @Input() outElement = false;

  private overlayRef: OverlayRef | null;
  private eventSubscription: Subscription = new Subscription();

  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.eventSubscription.add(
      fromEvent(this.elementRef.nativeElement, 'click')
        .subscribe(() => this.openContextualMenu())
    );
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  private openContextualMenu(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }

    const positionStrategy = this.getPosition(this.elementRef);
    this.overlayRef = this.createOverlayRef(positionStrategy);

    this.overlayRef.attach(new TemplatePortal(this.contextualMenu, this.viewContainerRef));

    this.eventSubscription.add(
      this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach())
    );
  }

  private getPosition(el: ElementRef<any>): FlexibleConnectedPositionStrategy {
    const boundingClientRects = el.nativeElement.getBoundingClientRect();
    let x = boundingClientRects[this.horizontalPosition];
    const y = boundingClientRects[this.verticalPosition];

    if (this.outElement) {
      x = x + (boundingClientRects.right - boundingClientRects.left) + OFFSET;
    }

    return this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: this.getHorizontalPosition(this.horizontalPosition),
          originY: this.verticalPosition,
          overlayX: this.getHorizontalPosition(this.horizontalPosition),
          overlayY: 'top',
        }
      ]);
  }

  private getHorizontalPosition(horizontalPosition: HorizontalPosition): HorizontalConnectionPos {
    switch(horizontalPosition) {
      case 'left':
        return 'start';
      case 'right':
        return 'end';
      default:
        return 'center';
    }
  }

  private createOverlayRef(positionStrategy: FlexibleConnectedPositionStrategy): OverlayRef {
    return this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'no-overlay'
    });
  }
}
