import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, switchMap, tap, withLatestFrom, shareReplay } from 'rxjs/operators';
import { Project } from './project.model';
import { IProject } from './project.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly entityUrl = environment.apiUrl + 'projects';
  private projectSource = new BehaviorSubject<Project[]>(null);
  private projects$ = this.projectSource.asObservable();

  private createProjectSubject = new Subject<IProject>();
  private createProject$ = this.createProjectSubject.asObservable().pipe(
    switchMap(project => this.saveEntity(project)),
    withLatestFrom(this.projects$),
    tap(([project, state]) => {
      state.push(new Project(project));
      this.projectSource.next(state);
    })
  );

  private deleteProjectSubject = new Subject<number>();
  private deleteProject$ = this.deleteProjectSubject.asObservable().pipe(
    switchMap(projectId => this.deleteEntity(projectId)),
    withLatestFrom(this.projects$),
    tap(([projectId, state]) => {
      const data = state.filter(project => project.id !== projectId);
      this.projectSource.next(data);
    })
  );

  private editProjectSubject = new Subject<IProject>();
  private editProject$ = this.editProjectSubject.asObservable().pipe(
    switchMap(project => this.updateEntity(project)),
    withLatestFrom(this.projects$),
    tap(([project, state]) => {
      state = state.map(p => {
        if (p.id === project.id) {
          p = new Project({...p, ...project});
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

  constructor(private http: HttpClient) {}

  public getProjectList(): void {
    const projectList = this.projectSource.getValue();

    if (projectList && projectList.length) {
      return;
    }

    this.http.get<IProject[]>(this.entityUrl).pipe(
      shareReplay(),
      map(res => res.map(project => new Project(project)))
    ).subscribe(res => this.projectSource.next(res));
  }

  private saveEntity(project: IProject): Observable<Project> {
    return this.http.post<Project>(this.entityUrl, project);
  }
  private deleteEntity(projectId: number): Observable<number> {
    return this.http.delete(this.entityUrl + '/' + projectId).pipe(map((project: Project) => project.id));
  }
  private updateEntity(project: IProject): Observable<Project> {
    return this.http.put<Project>(this.entityUrl + '/' + project.id, project);
  }

  public createProject(project: IProject): void {
    this.createProjectSubject.next(project);
  }

  public deleteProject(projectId: number): void {
    this.deleteProjectSubject.next(projectId);
  }

  public editProject(project: IProject): void {
    this.editProjectSubject.next(project);
  }
}
