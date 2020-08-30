import { IUser } from './user.interface';
import { ITaskState } from './task-states.model';

export interface ITask {
  title: string;
  assigned?: IUser;
  state: ITaskState;
}
