import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../shared/task/task.model';

import { fallOutAnimation } from '../../shared/animations/fall-out.animation';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskState } from '../../shared/task/task-state.enum';

interface IKanbanColumn {
  name: string;
  taskList: Task[];
  columnState: TaskState;
}

interface IKanbanColumnConfig {
  name: string;
  columnState: TaskState;
}

const columnsConfig: IKanbanColumnConfig[] = [
  {
    name: 'To do',
    columnState: TaskState.TODO
  },
  {
    name: 'Blocked',
    columnState: TaskState.BLOCKED
  },
  {
    name: 'In progress',
    columnState: TaskState.INPROGRESS
  },
  {
    name: 'To review',
    columnState: TaskState.TOREVIEW
  },
  {
    name: 'Completed',
    columnState: TaskState.COMPLETE
  },
  {
    name: 'Closed',
    columnState: TaskState.COMPLETE
  }
];


@Component({
  selector: 'app-kanban-column-list',
  templateUrl: './kanban-column-list.component.html',
  styleUrls: ['./kanban-column-list.component.scss'],
  animations: [fallOutAnimation]
})
export class KanbanColumnListComponent implements OnInit {
  public columns: IKanbanColumn[];
  @Input() isFiltersShown: boolean;
  public connectedTo: string[];
  @Input() set taskList(taskList: Task[]) {
    this.columns = columnsConfig.map(columnConfig => {
      return {
        name: columnConfig.name,
        columnState: columnConfig.columnState,
        taskList: taskList.filter(task => task.state.type === columnConfig.columnState)
      };
    });
    this.connectedTo = this.columns.map(column => column.name);
  }

  constructor() { }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
