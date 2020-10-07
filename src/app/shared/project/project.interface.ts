import { ITask } from '../task/task.interface';
import { User } from '../user/user.model';

export interface IProject {
  id?: number;
  name: string;
  description: string;
  members?: User[];
  issues?: ITask[];
}
