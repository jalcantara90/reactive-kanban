import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidebarService {
  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public isOpen$ = this.isOpen.asObservable();

  constructor() { }

  public toogleSidebar(): void {
    this.isOpen.next(!this.isOpen.value);
  }
}
