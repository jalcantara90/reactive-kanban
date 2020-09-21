import { Component } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { trigger, style, state, transition, animate, AnimationEvent } from '@angular/animations';
import { tap } from 'rxjs/operators';
import { sidebarAnimation } from './sidebar.animation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [sidebarAnimation.toogleOpenClose]
})
export class SidebarComponent {
  sidebarState = 'open';
  isOpen$ = this.sidebarService.isOpen$.pipe(tap(isOpen => this.sidebarState = isOpen ? 'open' : 'close'));

  constructor(private sidebarService: SidebarService) { }

  public burgerClick(): void {
    this.sidebarState = this.sidebarState === 'close' ? 'open' : 'close';
  }

  onAnimationEvent({fromState, phaseName}: AnimationEvent): void {
    if (
      (fromState === 'close' || fromState === 'open')
      && phaseName === 'start'
    ) {
      this.sidebarService.toogleSidebar();
    }
  }
}
