import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../shared/project/project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectComponent {
  @Input() project: Project;
  @Output() editProject = new EventEmitter<Project>();
  @Output() deleteProject = new EventEmitter<number>();

  constructor() { }
}
