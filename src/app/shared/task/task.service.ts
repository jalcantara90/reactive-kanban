import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { User } from '../user/user.model';
import { BehaviorSubject, combineLatest, merge, Subject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { taskList } from '../../data/data-mock';
import { map, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { ITaskState } from './task-states.model';

export interface ITaskFilters {
  search?: string;
  states?: ITaskState[];
  assigned?: User[];
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private taskSource = new BehaviorSubject<Task[]>(taskList);
  private reorder = new Subject<CdkDragDrop<string[]>>();
  private filterTask = new Subject<ITaskFilters>();

  reorder$ = this.reorder.asObservable().pipe(
    withLatestFrom(this.taskSource.asObservable()),
    map(([dragAndDropEvt, taskList]) => {
      moveItemInArray(taskList, dragAndDropEvt.previousIndex, dragAndDropEvt.currentIndex);
      return taskList;
    }),
    tap(taskList => this.taskSource.next(taskList))
  );

  filteredTaskList$ = combineLatest(
    this.taskSource.asObservable(),
    this.filterTask.asObservable().pipe(startWith({ search: '', states: [], assigned: [] }))
  ).pipe(
    map(([taskList, filters]) => this.taskListFilter(taskList, filters)),
    tap(console.log)
  );

  public taskList$ = merge(
    this.filteredTaskList$,
    this.reorder$
  );

  constructor() {}

  changeOrder(event: CdkDragDrop<string[]>): void {
    this.reorder.next(event);
  }

  filter(filters: ITaskFilters): void {
    this.filterTask.next(filters);
  }

  taskListFilter(taskList: Task[], filters: ITaskFilters): Task[] {

    if (!filters.search && !filters.assigned.length && !filters.states.length) {
      return taskList;
    }

    return taskList.filter(task => {
      const filterSearch = filters.search && (
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.assigned?.name.toLowerCase().includes(filters.search.toLowerCase())
        // task.state.label.toLowerCase().includes(filters.search.toLowerCase())
      );
      const assignedFilter = filters.assigned.length && filters.assigned.some(assigned => assigned.id === task.assigned?.id);
      // const stateFilter = filters.states.length && filters.states.some(state => state.type === task.state.type);

      if (filterSearch || assignedFilter) {
        return task;
      }
    });
  }
}
