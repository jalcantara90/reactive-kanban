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
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  private openContextualMenu(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }

    const positionStrategy = this.getPosition(this.elementRef);
    this.overlayRef = this.createOverlayRef(positionStrategy, this.overlay);

    this.overlayRef.attach(this.createPortal(this.contextualMenu, this.viewContainerRef));

    this.eventSubscription.add(
      this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach())
    );
  }

  private getPosition(el: ElementRef<any>): FlexibleConnectedPositionStrategy {
    const boundingClientRects = el.nativeElement.getBoundingClientRect();
    const y = boundingClientRects[this.verticalPosition];
    let x = boundingClientRects[this.horizontalPosition];

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

  private createOverlayRef(positionStrategy: FlexibleConnectedPositionStrategy, overlay: Overlay): OverlayRef {
    return overlay.create({
      positionStrategy,
      scrollStrategy: overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'no-overlay'
    });
  }


  private createPortal(contextualMenu: TemplateRef<any>, containerRef: ViewContainerRef): TemplatePortal {
    return new TemplatePortal(contextualMenu, containerRef);
  }
}
