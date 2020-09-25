import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { IProject } from 'src/app/shared/project.interface';
import { Project } from 'src/app/shared/project.model';
import { projectList } from '../../data/data-mock';
import { fadeGrowStagger } from '../../shared/animations/fade-grow-stager.animation';
import { ProjectService } from '../../shared/project.service';

@Component({
  selector: 'app-project-shell',
  templateUrl: './project-shell.component.html',
  styleUrls: ['./project-shell.component.scss'],
  animations: [fadeGrowStagger]
})
export class ProjectShellComponent implements OnInit {
  projectList$ = this.projectService.state$;

  constructor(
    private modalService: ModalService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.getProjectList();
  }

  async openModal(project?: Project): void {
    const { ProjectModalComponent } = await import('../project-modal/project-modal.component');

    const modalRef = this.modalService.present(ProjectModalComponent, { data: project, width: '40vw' });
    modalRef.onClose$.pipe(
      filter(res => res.type === 'close')
    ).subscribe(res => this.createOrUpdateProject(res.data));
  }

  createOrUpdateProject(project: Partial<Project>): void {
    if (project.id) {
      return this.projectService.editProject(project as Project);
    }

    return this.projectService.createProject(project);
  }

  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId);
  }
}
