import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../shared/task/task.model';
import { TaskState } from '../../shared/task/task-state.enum';
import { User } from 'src/app/shared/user/user.model';
import { FormControl } from '@angular/forms';
import { userList } from 'src/app/data/data-mock';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent implements OnInit {
  @Input() public task: Task;
  public userList: User[] = userList;
  public control: FormControl;
  public taskStateCSSClass: {[key: string]: boolean};

  constructor() { }

  ngOnInit(): void {
    this.taskStateCSSClass = {
      'bg-blue-500': this.task.state.type === TaskState.TODO,
      'bg-red-700': this.task.state.type === TaskState.BLOCKED,
      'bg-green-500': this.task.state.type === TaskState.INPROGRESS,
      'bg-purple-500': this.task.state.type === TaskState.TOREVIEW,
      'bg-indigo-500': this.task.state.type === TaskState.COMPLETE,
      'bg-pink-500': this.task.state.type === TaskState.CLOSED,
    };

    this.control = new FormControl(this.task.assigned);
  }

}
