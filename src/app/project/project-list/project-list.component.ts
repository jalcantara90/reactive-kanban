import { Component, OnInit } from '@angular/core';
import { fadeGrowStagger } from '../../shared/animations/fade-grow-stager.animation';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [fadeGrowStagger]
})
export class ProjectListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
