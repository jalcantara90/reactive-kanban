import { ITask } from './../../shared/task/task.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ModalRef } from '../../shared/modal/modal-ref';
import { ProjectModalComponent } from '../../project/project-modal/project-modal.component';
import { MODAL_DATA } from '../../shared/modal/modal.injection-tokens';
import { Container } from '../../shared/animations/intro.animations';

@Component({
  selector: 'app-backlog-modal',
  templateUrl: './backlog-modal.component.html',
  styleUrls: ['./backlog-modal.component.scss'],
  animations: [Container]
})
export class BacklogModalComponent implements OnInit {
  form: FormGroup = new FormGroup({
    project: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    tags: new FormControl()
  });

  visible;
  introRight;

  constructor(
    private modalref: ModalRef<ProjectModalComponent>,
    @Inject(MODAL_DATA) public modalData: ITask
  ) { }

  ngOnInit(): void {
    requestAnimationFrame(() => this.visible = true);
  }

  dismiss(): void {
    this.modalref.dismiss();
  }

  save(): void {
    this.visible = !this.visible;
  }
}
