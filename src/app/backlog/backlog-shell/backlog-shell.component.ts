import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { inOutAnimation } from 'src/app/shared/animations/in-out.animation';

@Component({
  selector: 'app-backlog-shell',
  templateUrl: './backlog-shell.component.html',
  styleUrls: ['./backlog-shell.component.scss'],
  animations: [inOutAnimation]
})
export class BacklogShellComponent implements OnInit {
  public control = new FormControl({ value: false, disabled: false });
  public showFilters$: Observable<boolean> = this.control.valueChanges;
  constructor() { }

  ngOnInit(): void {
  }

  filtersChanges(filters): void {

  }
}
