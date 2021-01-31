import { introY } from './../animations/intro.animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contextual-menu',
  templateUrl: './contextual-menu.component.html',
  animations: [introY]
})
export class ContextualMenuComponent {
  constructor() { }
}
