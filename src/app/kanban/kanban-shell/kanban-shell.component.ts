import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { inOutAnimation } from '../../shared/animations/in-out.animation';

@Component({
  selector: 'app-kanban-shell',
  templateUrl: './kanban-shell.component.html',
  styleUrls: ['./kanban-shell.component.scss'],
  animations: [inOutAnimation]
})
export class KanbanShellComponent implements OnInit {
  public control = new FormControl({ value: false, disabled: false });
  public showFilters$: Observable<boolean> = this.control.valueChanges;

  constructor() { }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => console.log('Custom Form value -->', value));
  }

  filtersChanges(data): void {
    console.log(data);
  }
}
