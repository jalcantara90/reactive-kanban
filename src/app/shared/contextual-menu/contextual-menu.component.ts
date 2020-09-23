import { Component } from '@angular/core';
import { attachContextMenu } from './attach-contextual-menu.animation';

@Component({
  selector: 'app-contextual-menu',
  templateUrl: './contextual-menu.component.html',
  animations: [attachContextMenu]
})
export class ContextualMenuComponent {
  constructor() { }
}
