import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kanban-shell',
  templateUrl: './kanban-shell.component.html',
  styleUrls: ['./kanban-shell.component.scss']
})
export class KanbanShellComponent {
  public control = new FormControl({ value: false, disabled: false });
  public showFilters$: Observable<boolean> = this.control.valueChanges;

  constructor() { }

  test(data) {
    console.log(data);
  }
}
