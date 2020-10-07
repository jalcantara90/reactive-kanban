import { TaskStateToDo, TaskStateBlocked, TaskStateInProgress, TaskStateToReview, TaskStateCompleted } from '../shared/task/task-states.model';
import { Task } from '../shared/task/task.model';
import { ProjectBuilder } from './project.builder';
import { UserBuilder } from './user.builder';

export const user1 = new UserBuilder()
  .withName('Jonathan Alcántara')
  .withImage('https://pbs.twimg.com/profile_images/1305523485750579200/iTA80rdo_400x400.jpg')
  .build();
export const user2 = new UserBuilder()
  .withName('Reactive Extensions JS')
  .withImage('https://rxjs-dev.firebaseapp.com/assets/images/logos/Rx_Logo_S.png')
  .build();
export const user3 = new UserBuilder()
  .withName('Angular')
  .withImage('https://angular.io/assets/images/logos/angular/angular.svg')
  .build();

export const userList = [user1, user2, user3];

export const taskList: Task[] = [
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

export const project = new ProjectBuilder()
  .withName('Reactive Kanban')
  .withDescription('kanban description')
  .withMember(user1)
  .withMember(user2)
  .withMember(user3)
  .withIssueList(taskList)
  .build();
export const project2 = new ProjectBuilder()
  .withName('State manager with RxJS')
  .withDescription('State manager with RxJS description')
  .withMember(user1)
  .withMember(user2)
  .withIssueList(taskList)
  .build();
export const project1 = new ProjectBuilder()
  .withName('Angular CDK implementation')
  .withDescription('Angular CDK implementation description 3')
  .withMember(user3)
  .withMember(user1)
  .withMember(user2)
  .withIssueList(taskList)
  .build();
export const project3 = new ProjectBuilder()
  .withName('Angular Material')
  .withDescription('Angular Material description')
  .withMember(user3)
  .withIssueList(taskList)
  .build();
export const project4 = new ProjectBuilder()
  .withName('Reactive Forms')
  .withDescription('kanban description')
  .withMember(user2)
  .withMember(user1)
  .withMember(user3)
  .withIssueList(taskList)
  .build();
export const project5 = new ProjectBuilder()
  .withName('NgRx')
  .withDescription('NgRx description')
  .withMember(user2)
  .withMember(user3)
  .withIssueList(taskList)
  .build();

export const projectList = [
  project,
  project1,
  project2,
  project3,
  project4,
  project5
];
