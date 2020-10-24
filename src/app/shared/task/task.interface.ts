import { TaskState } from './task-state.enum';
import { ITaskState } from './task-states.model';
import { User } from '../user/user.model';

export interface ITask {
  id?: number;
  title: string;
  assignedto?: User;
  state: TaskState;
}
