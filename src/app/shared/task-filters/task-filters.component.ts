import { Component, Output, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskStateToDo, TaskStateBlocked, TaskStateInProgress, TaskStateToReview, TaskStateCompleted, TaskStateClosed } from '../task/task-states.model';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { userList } from 'src/app/data/data-mock';

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.scss'],

})
export class TaskFiltersComponent {
  filtersForm = new FormGroup({
    search: new FormControl(''),
    states: new FormControl([]),
    assignedto: new FormControl([])
  });

  @Output() filtersChanges = this.filtersForm.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  statesList = [
    new TaskStateToDo(),
    new TaskStateBlocked(),
    new TaskStateInProgress(),
    new TaskStateToReview(),
    new TaskStateCompleted(),
    new TaskStateClosed()
  ];

  userList = userList;

  constructor() { }
}
