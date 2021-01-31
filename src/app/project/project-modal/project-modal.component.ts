import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ModalRef } from '../../shared/modal/modal-ref';
import { MODAL_DATA } from '../../shared/modal/modal.injection-tokens';
import { Project } from '../../shared/project/project.model';
import { User } from '../../shared/user/user.model';
import { UserService } from './../../shared/user/user.service';

@Component({
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public userList$: Observable<User[]> = this.userService.getUsers();
  public saveProject = new Subject<FormGroup>();
  private saveProjectSubscription = new Subscription();
  private saveProject$ = this.saveProject.asObservable().pipe(
    filter(form => form.valid),
    map(form => form.value),
    tap((project) => {
      if (this.modalData?.id) {
        project.id = this.modalData.id;
      }

      this.modalref.close(project);
    })
  );

  constructor(
    private modalref: ModalRef<ProjectModalComponent>,
    @Inject(MODAL_DATA) public modalData: Project,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.modalData?.name, Validators.required),
      description: new FormControl(this.modalData?.description, Validators.required),
      members: new FormControl(this.modalData?.members)
    });

    this.saveProjectSubscription = this.saveProject$.subscribe();
  }

  ngOnDestroy(): void {
    this.saveProjectSubscription.unsubscribe();
  }

  dismiss(): void {
    this.modalref.dismiss();
  }

}
