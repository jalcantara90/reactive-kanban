import { Task } from '../shared/task/task.model';
import { User } from '../shared/user/user.model';
import { ITaskState, TaskStateToDo } from '../shared/task/task-states.model';
import { TaskState } from '../shared/task/task-state.enum';

let taskBuilderIdentifier = 0;

export class TaskBuilder {
  private task: Task;

  constructor() {
    this.task = new Task({ title: `Task - ${taskBuilderIdentifier++}`, state: TaskState.TODO });
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
    this.task.assignedto = user;
    return this;
  }
}
