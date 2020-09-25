import { Project } from '../shared/project.model';
import { Task } from '../shared/task.model';
import { User } from '../shared/user.model';

export class ProjectBuilder {
  private project: Project;

  constructor() {
    this.project = new Project();
  }

  public build(): Project {
    return this.project;
  }

  public withName(name: string): ProjectBuilder {
    this.project.name = name;
    return this;
  }

  public withDescription(description: string): ProjectBuilder {
    this.project.description = description;
    return this;
  }

  public withMember(member: User): ProjectBuilder {
    this.project.members.push(member);
    return this;
  }

  public withIssue(issue: Task): ProjectBuilder {
    this.project.issues.push(issue);
    return this;
  }

  public withIssueList(issueList: Task[]): ProjectBuilder {
    this.project.issues = [...this.project.issues, ...issueList];
    return this;
  }
}
