import { HttpClient, HttpParams } from '@angular/common/http';
import { ITask } from './task.interface';
import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { User } from '../user/user.model';
import { BehaviorSubject, combineLatest, merge, Subject, Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map, startWith, tap, withLatestFrom, shareReplay, filter, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { ITaskState } from './task-states.model';
import { environment } from '../../../environments/environment';

export interface ITaskFilters {
  search?: string;
  states?: ITaskState[];
  assignedto?: User[];
}

type PaginateQuery = [number, number];

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly entityUrl = environment.apiUrl + 'issues';
  private taskSource = new BehaviorSubject<Task[]>([]);
  private reorder = new Subject<CdkDragDrop<string[]>>();
  private filterTask = new Subject<ITaskFilters>();
  private totalIssues: BehaviorSubject<number> = new BehaviorSubject(null);
  private paginationQuery: BehaviorSubject<PaginateQuery> = new BehaviorSubject([0, 100]);
  private selectedProjectId: BehaviorSubject<number> = new BehaviorSubject(null);

  private reorder$ = this.reorder.asObservable().pipe(
    withLatestFrom(this.taskSource.asObservable()),
    map(([dragAndDropEvt, taskList]) => {
      moveItemInArray(taskList, dragAndDropEvt.previousIndex, dragAndDropEvt.currentIndex);
      return taskList;
    }),
    tap(taskList => this.taskSource.next(taskList))
  );

  private filteredTaskList$ = combineLatest(
    this.taskSource.asObservable(),
    this.filterTask.asObservable().pipe(startWith({ search: '', states: [], assignedto: [] }))
  ).pipe(
    map(([taskList, filters]) => this.taskListFilter(taskList, filters)),
  );

  public totalIssues$ = this.totalIssues.asObservable();
  public taskList$ = merge(
    this.filteredTaskList$,
    this.reorder$
  );

  constructor(private http: HttpClient) {}

  getTaskListByProjectId(projectId: number): void {
    const selectedProjectId = this.selectedProjectId.getValue();
    if (projectId === selectedProjectId) {
      return;
    }
    debugger;
    this.selectedProjectId.next(projectId);
    this.paginationQuery.pipe(
      distinctUntilChanged(),
      switchMap((paginationQuery: PaginateQuery) => this.getTaskListByProjectIdAndQuery(projectId, paginationQuery)),
      shareReplay(),
      tap(console.log),
      map(taskList => taskList.map(task => new Task(task)))
    ).subscribe(taskList => this.taskSource.next(taskList));
  }

  getTaskListByProjectIdAndQuery(projectId: number, [page, limit]: PaginateQuery): Observable<ITask[]> {
    const params = new HttpParams()
      .set('project.id', `${projectId}`)
      .set('_start', `${page * limit}`)
      .set('_limit', `${limit}`);

    return this.http.get<ITask[]>(this.entityUrl, { params }).pipe(
      shareReplay(),
      tap(() => this.getIssuesCount(projectId))
    );
  }

  private getIssuesCount(projectId: number): void {
    const selectedProjectId = this.selectedProjectId.getValue();
    const totalIssues = this.totalIssues.getValue();
    if (projectId === selectedProjectId && totalIssues) {
      return;
    }

    const params = new HttpParams().set('project.id', `${projectId}`);
    this.http.get<number>(this.entityUrl + '/count', { params })
      .pipe(shareReplay())
      .subscribe(count => this.totalIssues.next(count));
  }

  changeOrder(event: CdkDragDrop<string[]>): void {
    this.reorder.next(event);
  }

  filter(filters: ITaskFilters): void {
    this.filterTask.next(filters);
  }

  changePaginationQuery(paginationQuery: PaginateQuery): void {
    this.paginationQuery.next(paginationQuery);
  }

  taskListFilter(taskList: Task[], filters: ITaskFilters): Task[] {

    if (!filters.search && !filters.assignedto.length && !filters.states.length) {
      return taskList;
    }

    return taskList.filter(task => {
      const filterSearch = filters.search && (
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.assignedto?.name.toLowerCase().includes(filters.search.toLowerCase())
        // task.state.label.toLowerCase().includes(filters.search.toLowerCase())
      );
      const assignedFilter = filters.assignedto.length && filters.assignedto.some(assignedto => assignedto.id === task.assignedto?.id);
      // const stateFilter = filters.states.length && filters.states.some(state => state.type === task.state.type);

      if (filterSearch || assignedFilter) {
        return task;
      }
    });
  }
}
