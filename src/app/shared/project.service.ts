import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Project } from './project.model';
import { projectList } from '../data/data-mock';
import { IProject } from './project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectSource = new BehaviorSubject<Project[]>([]);
  private projects$ = this.projectSource.asObservable();

  private createProjectSubject = new Subject<Partial<Project>>();
  private createProject$ = this.createProjectSubject.asObservable().pipe(
    withLatestFrom(this.projects$),
    tap(([project, state]) => {
      state.push(new Project({ name: project.name, description: project.description, members: project.members }));
      this.projectSource.next(state);
    })
  );

  private deleteProjectSubject = new Subject<number>();
  private deleteProject$ = this.deleteProjectSubject.asObservable().pipe(
    withLatestFrom(this.projects$),
    tap(([projectId, state]) => {
      const data = state.filter(project => project.id !== projectId);
      this.projectSource.next(data);
    })
  );

  private editProjectSubject = new Subject<Project>();
  private editProject$ = this.editProjectSubject.asObservable().pipe(
    withLatestFrom(this.projects$),
    tap(([project, state]) => {
      state = state.map(p => {
        if (p.id === project.id) {
          p = {...p, ...project} as Project;
        }

        return p;
      });

      this.projectSource.next(state);
    })
  );

  private actions$ = merge(
    this.createProject$,
    this.deleteProject$,
    this.editProject$
  ).pipe(
    switchMap(() => this.projects$)
  );

  public state$ = merge(
    this.projects$,
    this.actions$
  );

  constructor() {}

  public getProjectList(): void {
    this.projectSource.next(projectList);
  }

  public createProject(project: Partial<Project>): void {
    this.createProjectSubject.next(project);
  }

  public deleteProject(projectId: number): void {
    this.deleteProjectSubject.next(projectId);
  }

  public editProject(project: Project): void {
    this.editProjectSubject.next(project);
  }
}
