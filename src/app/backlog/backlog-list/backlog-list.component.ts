import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';

@Component({
  selector: 'app-backlog-list',
  templateUrl: './backlog-list.component.html',
  styleUrls: ['./backlog-list.component.scss']
})
export class BacklogListComponent implements OnInit {
  taskList$ = this.taskService.taskList$;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

}
