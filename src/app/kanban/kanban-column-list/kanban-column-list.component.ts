import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../shared/user.model';
import { Task } from '../../shared/task.model';
import { TaskStateToDo, TaskStateInProgress, TaskStateToReview, TaskStateClosed, TaskStateCompleted, TaskStateBlocked } from '../../shared/task-states.model';
import { user1, user2, user3 } from 'src/app/shared/task.service';

import { fallOutAnimation } from '../../shared/animations/fall-out.animation';

interface IKanbanColumn {
  name: string;
  taskList: Task[];
}

const columnsData: IKanbanColumn[] = [
  {
    name: 'To do',
    taskList: [
      new Task({ title: 'Can coffee make you a better developer?', state: new TaskStateToDo() }),
      new Task({ title: 'Create example of drag and drop', assigned: user1, state: new TaskStateToDo() }),
      new Task({ title: 'Create a portal example', state: new TaskStateToDo() }),
      new Task({ title: 'Create Overlay example', state: new TaskStateToDo() }),
      new Task({ title: 'Can coffee make you a better developer?', assigned: user2, state: new TaskStateToDo() }),
      new Task({ title: 'Can coffee make you a better developer?', assigned: user3, state: new TaskStateToDo() }),
      new Task({ title: 'Can coffee make you a better developer?', state: new TaskStateToDo() }),
      new Task({ title: 'Can coffee make you a better developer?', state: new TaskStateToDo() })
    ]
  },
  {
    name: 'Blocked',
    taskList: [
      new Task({ title: 'Continue', state: new TaskStateBlocked() }),
    ]
  },
  {
    name: 'In progress',
    taskList: [
      new Task({ title: 'Create fake data', assigned: user1, state: new TaskStateInProgress() }),
      new Task({ title: 'Make it Reactive', assigned: user2, state: new TaskStateInProgress() }),
      new Task({ title: 'Scalable architecture', assigned: user3 , state: new TaskStateInProgress() }),
    ]
  },
  {
    name: 'To review',
    taskList: [
      new Task({ title: 'Build basic UI Kanban', assigned: user1, state: new TaskStateToReview() }),
    ]
  },
  {
    name: 'Completed',
    taskList: [
      new Task({ title: 'Create Core Module', assigned: user1, state: new TaskStateCompleted() }),
    ]
  },
  {
    name: 'Closed',
    taskList: [
      new Task({ title: 'Create App', assigned: user1, state: new TaskStateClosed()}),
    ]
  }
];

@Component({
  selector: 'app-kanban-column-list',
  templateUrl: './kanban-column-list.component.html',
  styleUrls: ['./kanban-column-list.component.scss'],
  animations: [fallOutAnimation]
})
export class KanbanColumnListComponent implements OnInit {
  public columns = columnsData;
  @Input() isFiltersShown: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
