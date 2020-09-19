import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task.model';
import { TaskState } from '../task-state.enum';

@Component({
  selector: 'app-task-state',
  templateUrl: './task-state.component.html',
})
export class TaskStateComponent implements OnInit {
  @Input() task: Task;
  public taskStateCSSClass: {[key: string]: boolean};

  constructor() { }

  ngOnInit(): void {
    this.taskStateCSSClass = {
      'bg-blue-500': this.task.state.type === TaskState.TODO,
      'bg-red-700': this.task.state.type === TaskState.BLOCKED,
      'bg-indigo-500': this.task.state.type === TaskState.INPROGRESS,
      'bg-purple-500': this.task.state.type === TaskState.TOREVIEW,
      'bg-green-500': this.task.state.type === TaskState.COMPLETE,
      'bg-pink-500': this.task.state.type === TaskState.CLOSED,
    };
  }

}
