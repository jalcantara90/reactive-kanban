import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { User } from './user.model';
import { TaskStateToDo, TaskStateBlocked, TaskStateInProgress, TaskStateToReview, TaskStateCompleted } from './task-states.model';
import { BehaviorSubject } from 'rxjs';

export const user1 = new User({
  name: 'Jonathan Alcántara',
  image: 'https://pbs.twimg.com/profile_images/1305523485750579200/iTA80rdo_400x400.jpg'
});
export const user2 = new User({
  name: 'Reactive Extensions JS',
  image: 'https://rxjs-dev.firebaseapp.com/assets/images/logos/Rx_Logo_S.png'
});
export const user3 = new User({
  name: 'Angular',
  image: 'https://angular.io/assets/images/logos/angular/angular.svg'
});

const task: Task[] = [
  new Task({ title: 'Can coffee make you a better developer?', state: new TaskStateToDo() }),
  new Task({ title: 'Create example of drag and drop', assigned: user1, state: new TaskStateToDo() }),
  new Task({ title: 'Create a portal example', state: new TaskStateToDo() }),
  new Task({ title: 'Create Overlay example', state: new TaskStateToDo() }),
  new Task({ title: 'Can coffee make you a better developer?', assigned: user2, state: new TaskStateToDo() }),
  new Task({ title: 'Can coffee make you a better developer?', assigned: user3, state: new TaskStateToDo() }),
  new Task({ title: 'Can coffee make you a better developer?', state: new TaskStateToDo() }),
  new Task({ title: 'Can coffee make you a better developer?', state: new TaskStateToDo() }),
  new Task({ title: 'Continue', state: new TaskStateBlocked() }),
  new Task({ title: 'Create fake data', assigned: user1, state: new TaskStateInProgress() }),
  new Task({ title: 'Make it Reactive', assigned: user2, state: new TaskStateInProgress() }),
  new Task({ title: 'Scalable architecture', assigned: user3 , state: new TaskStateInProgress() }),
  new Task({ title: 'Create a portal example', state: new TaskStateToDo() }),
  new Task({ title: 'Create Overlay example', state: new TaskStateToDo() }),
  new Task({ title: 'Can coffee make you a better developer?', assigned: user2, state: new TaskStateToDo() }),
  new Task({ title: 'Can coffee make you a better developer?', assigned: user3, state: new TaskStateToDo() }),
  new Task({ title: 'Can coffee make you a better developer?', state: new TaskStateToDo() }),
  new Task({ title: 'Can coffee make you a better developer?', state: new TaskStateToDo() }),
  new Task({ title: 'Continue', state: new TaskStateBlocked() }),
  new Task({ title: 'Create fake data', assigned: user1, state: new TaskStateInProgress() }),
  new Task({ title: 'Make it Reactive', assigned: user2, state: new TaskStateInProgress() }),
  new Task({ title: 'Scalable architecture', assigned: user3 , state: new TaskStateInProgress() }),
  new Task({ title: 'Create a portal example', state: new TaskStateToDo() }),
  new Task({ title: 'Create Overlay example', state: new TaskStateToDo() }),
  new Task({ title: 'Can coffee make you a better developer?', assigned: user2, state: new TaskStateToDo() }),
  new Task({ title: 'Can coffee make you a better developer?', assigned: user3, state: new TaskStateToDo() }),
  new Task({ title: 'Can coffee make you a better developer?', state: new TaskStateToDo() }),
  new Task({ title: 'Can coffee make you a better developer?', state: new TaskStateToDo() }),
  new Task({ title: 'Continue', state: new TaskStateBlocked() }),
  new Task({ title: 'Create fake data', assigned: user1, state: new TaskStateInProgress() }),
  new Task({ title: 'Make it Reactive', assigned: user2, state: new TaskStateInProgress() }),
  new Task({ title: 'Scalable architecture', assigned: user3 , state: new TaskStateInProgress() }),
  new Task({ title: 'Build basic UI Kanban', assigned: user1, state: new TaskStateToReview() }),
  new Task({ title: 'Create Core Module', assigned: user1, state: new TaskStateCompleted() }),
];

@Injectable({ providedIn: 'root' })
export class TaskService {
  private taskSource = new BehaviorSubject<Task[]>(task);
  public taskList$ = this.taskSource.asObservable();

  constructor() {}
}
