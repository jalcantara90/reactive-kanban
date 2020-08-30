import { TaskState } from './task-state.enum';

export interface ITaskState {
  label: string;
  type: TaskState;
}

export class TaskStateToDo implements ITaskState {
  label: string;
  type: TaskState;

  constructor() {
    this.label = 'To do';
    this.type = TaskState.TODO;
  }
}

export class TaskStateInProgress implements ITaskState {
  label: string;
  type: TaskState;

  constructor() {
    this.label = 'In Progress';
    this.type = TaskState.INPROGRESS;
  }
}

export class TaskStateBlocked implements ITaskState {
  label: string;
  type: TaskState;

  constructor() {
    this.label = 'Blocked';
    this.type = TaskState.BLOCKED;
  }
}

export class TaskStateToReview implements ITaskState {
  label: string;
  type: TaskState;

  constructor() {
    this.label = 'To review';
    this.type = TaskState.TOREVIEW;
  }
}

export class TaskStateCompleted implements ITaskState {
  label: string;
  type: TaskState;

  constructor() {
    this.label = 'Completed';
    this.type = TaskState.COMPLETE;
  }
}

export class TaskStateClosed implements ITaskState {
  label: string;
  type: TaskState;

  constructor() {
    this.label = 'Closed';
    this.type = TaskState.CLOSED;
  }
}
