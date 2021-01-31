import { HttpClient, HttpParams } from '@angular/common/http';
import { ITask } from './task.interface';
import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { User } from '../user/user.model';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map, tap, withLatestFrom, shareReplay, filter, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
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
  private filterTask = new BehaviorSubject<ITaskFilters>({ search: '', states: [], assignedto: [] });
  private totalIssues: BehaviorSubject<number> = new BehaviorSubject(null);
  private paginationQuery: BehaviorSubject<PaginateQuery> = new BehaviorSubject([0, 5]);
  private selectedProjectId: BehaviorSubject<number> = new BehaviorSubject(null);
  selectedProjectId$ = this.selectedProjectId.asObservable().pipe(
    distinctUntilChanged(),
    filter(project => !!project)
  );

  private filters$ = this.filterTask.asObservable().pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  public reorder$ = this.reorder.asObservable().pipe(
    withLatestFrom(this.taskSource.asObservable()),
    map(([dragAndDropEvt, taskList]) => {
      moveItemInArray(taskList, dragAndDropEvt.previousIndex, dragAndDropEvt.currentIndex);
      return taskList;
    }),
    tap(taskList => this.taskSource.next(taskList))
  );

  public query$ = combineLatest([
    this.paginationQuery,
    this.selectedProjectId$,
    this.filters$
  ]).pipe(
    map(([paginationQuery, projectId, filters]) => ({paginationQuery, projectId, filters})),
    tap(({paginationQuery, projectId, filters}) => this.getTaskListByProjectIdAndQuery(projectId, paginationQuery, filters))
  );

  public totalIssues$ = this.totalIssues.asObservable();
  public taskList$ = this.query$.pipe(
    switchMap(() => this.taskSource.asObservable())
  );

  constructor(private http: HttpClient) {}

  getTaskListByProjectId(projectId: number): void {
    const selectedProjectId = this.selectedProjectId.getValue();
    if (projectId === selectedProjectId) {
      return;
    }

    this.selectedProjectId.next(projectId);
  }

  getTaskListByProjectIdAndQuery(projectId: number, [page, limit]: PaginateQuery, filters: ITaskFilters): void {
    const params = this.buildFilterParams(projectId, page, limit, filters);

    this.http.get<ITask[]>(this.entityUrl, { params }).pipe(
      tap(() => this.getIssuesCount(projectId)),
      map(taskList => taskList.map(task => new Task(task)))
    ).subscribe(taskList => this.taskSource.next(taskList));
  }

  buildFilterParams(projectId: number, page: number, limit: number, filters: ITaskFilters): HttpParams {
    const params = new HttpParams()
    .set('project.id', `${projectId}`)
    .set('_start', `${page * limit}`)
    .set('_limit', `${limit}`);
    return params;
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
    const [page, limit] = this.paginationQuery.getValue();
    if (page === paginationQuery[0] && limit === paginationQuery[1]) {
      return;
    }
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
