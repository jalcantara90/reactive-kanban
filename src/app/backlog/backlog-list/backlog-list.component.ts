import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { fadeInGrow } from '../../shared/animations/fadein-grow.animation';

@Component({
  selector: 'app-backlog-list',
  templateUrl: './backlog-list.component.html',
  styleUrls: ['./backlog-list.component.scss'],
  animations: [fadeInGrow]
})
export class BacklogListComponent implements OnInit {
  taskList$ = this.taskService.taskList$;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

}
