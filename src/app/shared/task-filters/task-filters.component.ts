import { Component, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskStateToDo, TaskStateBlocked, TaskStateInProgress, TaskStateToReview, TaskStateCompleted, TaskStateClosed } from '../task-states.model';
import { user1, user2, user3 } from '../task.service';

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.scss'],
})
export class TaskFiltersComponent {
  filtersForm = new FormGroup({
    search: new FormControl(),
    states: new FormControl(),
    users: new FormControl()
  });

  @Output() filtersChanges = this.filtersForm.valueChanges;

  statesList = [
    new TaskStateToDo(),
    new TaskStateBlocked(),
    new TaskStateInProgress(),
    new TaskStateToReview(),
    new TaskStateCompleted(),
    new TaskStateClosed()
  ];

  userList = [
    user1,
    user2,
    user3
  ];

  constructor() { }
}
