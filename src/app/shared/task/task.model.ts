import { ITask } from './task.interface';
import { ITaskState, taskFactory } from './task-states.model';
import { User } from '../user/user.model';

export class Task {
  public id: number;
  public title: string;
  public assignedto: User;
  public state: ITaskState;

  constructor(task: ITask) {
    this.id = task?.id;
    this.title = task.title;
    this.assignedto = task?.assignedto;
    this.state = taskFactory(task.state);
  }
}
