import { Component, OnInit, HostBinding } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isOpen$ = this.sidebarService.isOpen$;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
  }

}
