import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { inOutAnimation } from '../../shared/animations/in-out.animation';
import { ITaskFilters, TaskService } from '../../shared/task/task.service';

@Component({
  selector: 'app-backlog-shell',
  templateUrl: './backlog-shell.component.html',
  styleUrls: ['./backlog-shell.component.scss'],
  animations: [inOutAnimation]
})
export class BacklogShellComponent implements OnInit {
  public control = new FormControl(false);
  public showFilters$: Observable<boolean> = this.control.valueChanges;
  public taskList$ = this.taskService.taskList$;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  filtersChanges(filters: ITaskFilters): void {
    this.taskService.filter(filters);
  }

  issueDropped(event: CdkDragDrop<string[]>): void {
    this.taskService.changeOrder(event);
  }
}
