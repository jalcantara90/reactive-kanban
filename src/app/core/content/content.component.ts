import { Component } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { tap } from 'rxjs/operators';
import { contentAnimation } from './content.animations';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [contentAnimation.toogleContentWidth]
})
export class ContentComponent {
  public contentState = 'open';
  public isOpen$ = this.sidebarService.isOpen$.pipe(tap(isOpen => this.contentState = isOpen ? 'open' : 'close'));

  constructor(private sidebarService: SidebarService) { }
}
