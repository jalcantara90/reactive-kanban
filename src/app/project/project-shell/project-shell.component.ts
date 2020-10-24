import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ModalService } from '../../shared/modal/modal.service';
import { IProject } from '../../shared/project/project.interface';
import { fadeGrowStagger } from '../../shared/animations/fade-grow-stager.animation';
import { ProjectService } from '../../shared/project/project.service';

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

  async openModal(project?: IProject): Promise<void> {
    const { ProjectModalComponent } = await import('../project-modal/project-modal.component');

    const modalRef = this.modalService.present(ProjectModalComponent, { data: project, width: '40vw' });
    modalRef.onClose$.pipe(
      filter(res => res.type === 'close')
    ).subscribe(res => this.createOrUpdateProject(res.data));
  }

  private createOrUpdateProject(project: IProject): void {
    if (project.id) {
      return this.projectService.editProject(project as IProject);
    }

    return this.projectService.createProject(project);
  }

  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId);
  }

  trackByProjectId(project: IProject): number {
    return project.id;
  }
}
