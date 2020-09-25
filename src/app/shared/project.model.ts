import { IProject } from './project.interface';
import { IUser } from './user.interface';
import { ITask } from './task.interface';
import { Entity } from './entity.model';
import { TaskState } from './task-state.enum';
import { User } from './user.model';

export class Project extends Entity {
  public name: string = '';
  public description: string = '';
  public members: User[];
  public issues: ITask[];

  constructor(project?: IProject) {
    super();

    this.name = project?.name;
    this.description = project?.description;
    this.members = project && project.members ? project.members : [];
    this.issues = project && project.issues ? project.issues : [];
  }

  get inProgressIssues(): ITask[] {
    return this.issues.filter(issue => issue.state.type === TaskState.INPROGRESS);
  }

  get completedIssues(): ITask[] {
    return this.issues.filter(issue => issue.state.type === TaskState.COMPLETE);
  }

  get blockedIssues(): ITask[] {
    return this.issues.filter(issue => issue.state.type === TaskState.BLOCKED);
  }
}
