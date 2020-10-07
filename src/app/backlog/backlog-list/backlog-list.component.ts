import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fadeInGrow } from '../../shared/animations/fadein-grow.animation';
import { CdkDragDrop} from '@angular/cdk/drag-drop';
import { Task } from '../../shared/task/task.model';

@Component({
  selector: 'app-backlog-list',
  templateUrl: './backlog-list.component.html',
  styleUrls: ['./backlog-list.component.scss'],
  animations: [fadeInGrow]
})
export class BacklogListComponent {
  @Input() taskList: Task[];
  @Output() issueDroped = new EventEmitter<CdkDragDrop<string[]>>();
  constructor() { }

  drop(event: CdkDragDrop<string[]>) {
    this.issueDroped.emit(event);
  }
}
