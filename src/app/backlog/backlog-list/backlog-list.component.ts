import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop} from '@angular/cdk/drag-drop';
import { Task } from '../../shared/task/task.model';
import { introStaggedX } from '../../shared/animations/intro.animations';

@Component({
  selector: 'app-backlog-list',
  templateUrl: './backlog-list.component.html',
  styleUrls: ['./backlog-list.component.scss'],
  animations: [introStaggedX]
})
export class BacklogListComponent {
  @Input() taskList: Task[];
  @Output() issueDroped = new EventEmitter<CdkDragDrop<string[]>>();
  constructor() { }

  drop(event: CdkDragDrop<string[]>): void {
    this.issueDroped.emit(event);
  }

  trackByIssueId(issue: Task): number {
    return issue.id;
  }
}
