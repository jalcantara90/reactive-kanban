import { IProject } from './project.interface';
import { ITask } from '../task/task.interface';
import { TaskState } from '../task/task-state.enum';
import { User } from '../user/user.model';
import { Task } from '../task/task.model';

interface ProjectDTO {
  id?: number;
  name: string;
  description: string;
  members: number[];
}

export class Project {
  public id: number;
  public name: string;
  public description: string;
  public members: User[];
  public issues: any[];

  constructor(project?: IProject) {
    this.id = project?.id;
    this.name = project?.name;
    this.description = project?.description;

    this.members = project && project.members ? project.members.map(user => new User(user)) : [];
    this.issues = project && project?.issues.length ?  project.issues.map(issue => new Task(issue)) : [];
  }

  get inProgressIssues(): ITask[] {
    return this.issues.filter(issue => issue.state === TaskState.INPROGRESS);
  }

  get completedIssues(): ITask[] {
    return this.issues.filter(issue => issue.state === TaskState.COMPLETE);
  }

  get blockedIssues(): ITask[] {
    return this.issues.filter(issue => issue.state === TaskState.BLOCKED);
  }

  static toDto(project: IProject): ProjectDTO {
    return {
      ...project,
      members: project.members.map(member => +member.id)
    }
  }
}
