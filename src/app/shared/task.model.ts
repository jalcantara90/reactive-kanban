import { Entity } from './entity.model';
import { ITask } from './task.interface';
import { IUser } from './user.interface';
import { ITaskState } from './task-states.model';

export class Task extends Entity {
  public title: string;
  public assigned: IUser;
  public state: ITaskState;

  constructor(task: ITask) {
    super();

    this.title = task.title;
    this.assigned = task?.assigned;
    this.state = task.state;
  }
}
