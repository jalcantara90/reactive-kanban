import { Component } from '@angular/core';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  isOpen$ = this.sidebarService.isOpen$;

  constructor(private sidebarService: SidebarService) { }
}
