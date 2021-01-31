import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, Optional, StaticProvider, TemplateRef } from '@angular/core';
import { ModalRef } from './modal-ref';
import { ModalComponent } from './modal.component';
import { MODAL_DATA, MODAL_DEFAULT_OPTIONS } from './modal.injection-tokens';
import { ModalConfig } from './modal-config';

@Injectable()
export class ModalService {

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    @Optional() @Inject(MODAL_DEFAULT_OPTIONS) private defaultOptions: any
  ) { }

  present<T>(component: ComponentType<T>, modalConfig?: ModalConfig): ModalRef<T> {
    const config = this.applyConfigDefaults(modalConfig, this.defaultOptions || new ModalConfig());
    const overlayConfig = this.createOverlayConfig(config);
    const overlayRef = this.createOverlay(overlayConfig);
    const containerRef = this.attachModalContainerRef(overlayRef);

    return this.attachModalContent(
      component,
      containerRef,
      overlayRef,
      config
    );
  }

  private createOverlayConfig(modalConfig: ModalConfig): OverlayConfig {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: modalConfig.scrollStrategy,
      panelClass: modalConfig.panelClass,
      hasBackdrop: modalConfig.hasBackdrop,
      direction: modalConfig.direction,
      minWidth: modalConfig.minWidth,
      minHeight: modalConfig.minHeight,
      maxWidth: modalConfig.maxWidth,
      maxHeight: modalConfig.maxHeight,
      disposeOnNavigation: modalConfig.closeOnNavigation,
      width: modalConfig.width
    });

    if (modalConfig.backdropClass) {
      config.backdropClass = modalConfig.backdropClass;
    }

    return config;
  }

  private createOverlay(config: OverlayConfig): OverlayRef {
    return this.overlay.create(config);
  }

  private attachModalContainerRef(overlayRef: OverlayRef): ModalComponent {
    const injector = Injector.create({
      parent: this.injector,
      providers: []
    });

    const popoverPortal = new ComponentPortal(ModalComponent, null, injector);
    const containerRef = overlayRef.attach(popoverPortal);

    return containerRef.instance;
  }

  private attachModalContent<T>(
    contentComponent: ComponentType<T>,
    modalContainer: ModalComponent,
    overlayRef: OverlayRef,
    config: ModalConfig
  ): ModalRef<T> {

    const containerRef = new ModalRef<T>(modalContainer, overlayRef, config);
    const injector = this.createInjector(modalContainer, containerRef, config);
    const contentPortalComponent = new ComponentPortal(contentComponent, null, injector);
    const contentRef = modalContainer.attachComponentPortal(contentPortalComponent);

    containerRef.componentInstance = contentRef.instance;

    return containerRef;
  }

  private createInjector<T>(
    modalContainer: ModalComponent,
    containerRef: ModalRef<T>,
    config: ModalConfig
  ) {
    const providers: StaticProvider[] = [
      {provide: ModalComponent, useValue: modalContainer},
      {provide: MODAL_DATA, useValue: config.data},
      {provide: ModalRef, useValue: containerRef}
    ];

    return Injector.create({parent: this.injector, providers});
  }

  applyConfigDefaults(
    config?: ModalConfig,
    defaultOptions?: ModalConfig
  ): ModalConfig {
    return {...defaultOptions, ...config};
  }

}
