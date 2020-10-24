import { tap, distinctUntilChanged, filter } from 'rxjs/operators';
import { ProjectService } from './../project/project.service';
import { FormControl } from '@angular/forms';
import { Component, Input, Output, OnInit } from '@angular/core';
import { Project } from '../project/project.model';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styles: [
  ]
})
export class ProjectSelectorComponent implements OnInit {
  public projectSelector = new FormControl()
  public projectList$ = this.projectService.state$.pipe(tap(projectList => {
    if (this.selectedProject) {
      const selectedProject = projectList.find(project => project.id === this.selectedProject.id);
      return this.projectSelector.setValue(selectedProject);
    }

    if (projectList && projectList[0]) {
      this.projectSelector.setValue(projectList[0]?.id);
    }
  }));

  @Input() public selectedProject: Project;
  @Output() public select = this.projectSelector.valueChanges.pipe(
    filter(project => !!project),
    distinctUntilChanged()
  );

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjectList();
  }
}
