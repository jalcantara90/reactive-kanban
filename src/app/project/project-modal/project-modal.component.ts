import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalRef } from 'src/app/shared/modal/modal-ref';
import { MODAL_DATA } from 'src/app/shared/modal/modal.injection-tokens';
import { Project } from 'src/app/shared/project.model';
import { user1, user2, user3 } from 'src/app/shared/task.service';
import { User } from 'src/app/shared/user.model';

@Component({
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  public userList: User[] = [
    user1,
    user2,
    user3
  ];

  public form: FormGroup;

  constructor(
    private modalref: ModalRef<ProjectModalComponent>,
    @Inject(MODAL_DATA) public modalData: Project
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.modalData?.name, Validators.required),
      description: new FormControl(this.modalData?.description, Validators.required),
      members: new FormControl(this.modalData?.members)
    });
  }

  saveProject(): void {
    if (this.form.invalid) {
      return;
    }

    const project = this.form.value;
    if (this.modalData?.id) {
      project.id = this.modalData.id;
    }

    this.modalref.close(project);
  }

  dismiss(): void {
    this.modalref.dismiss();
  }

}
