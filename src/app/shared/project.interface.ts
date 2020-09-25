import { ITask } from './task.interface';
import { IUser } from './user.interface';
import { User } from './user.model';

export interface IProject {
  name: string;
  description: string;
  members?: User[];
  issues?: ITask[];
}
