import { Task } from '../shared/task.model';
import { User } from '../shared/user.model';
import { ITaskState, TaskStateToDo } from '../shared/task-states.model';

let taskBuilderIdentifier = 0;

export class TaskBuilder {
  private task: Task;

  constructor() {
    this.task = new Task({ title: `Task - ${taskBuilderIdentifier++}`, state: new TaskStateToDo() });
  }

  public build(): Task {
    return this.task;
  }

  public withTitle(title: string): TaskBuilder {
    this.task.title = title;
    return this;
  }

  public withState(state: ITaskState): TaskBuilder {
    this.task.state = state;
    return this;
  }

  public withAssignedUser(user: User): TaskBuilder {
    this.task.assigned = user;
    return this;
  }
}
