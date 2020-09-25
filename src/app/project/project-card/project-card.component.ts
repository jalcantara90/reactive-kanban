import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fadeGrow } from 'src/app/shared/animations/fade-grow-stager.animation';
import { Project } from 'src/app/shared/project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  animations: [fadeGrow]
})
export class ProjectComponent {
  @Input() project: Project;
  @Output() editProject = new EventEmitter<Project>();
  @Output() deleteProject = new EventEmitter<number>();

  constructor() { }
}
