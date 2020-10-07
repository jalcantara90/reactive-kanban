import { Entity } from '../entity.model';
import { ITask } from './task.interface';
import { IUser } from '../user/user.interface';
import { ITaskState } from './task-states.model';
import { User } from '../user/user.model';
import { TaskState } from './task-state.enum';

export class Task {
  public id: number;
  public title: string;
  public assigned: User;
  public state: ITaskState;

  constructor(task: ITask) {
    this.id = task?.id;
    this.title = task.title;
    this.assigned = task?.assigned;
    this.state = task.state;
  }
}
